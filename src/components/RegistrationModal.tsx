/**
 * @file RegistrationModal.tsx
 * نافذة منبثقة لتسجيل حضور التلميذ في حفل الافتتاح الرسمي يوم السبت
 * وإرسال بيانات كل تسجيل إلى البريد الإلكتروني عبر خدمة Web3Forms
 * مع حفظ نسخة احتياطية في localStorage ومنع التكرار في نفس الجلسة
 */

import React, { useState } from 'react';
import { X, CheckCircle, Ticket, User, Printer, ArrowRight, AlertCircle } from 'lucide-react';
import { SCHOOL_INFO, CLUB_AXES } from '../data/clubData';
import { getRegistrationSnapshot, RegistrationStatusInfo } from '../utils/registrationSchedule';

// مفتاح الوصول الخاص بخدمة Web3Forms المرتبط بالبريد rwejdigital@gmail.com
const WEB3FORMS_KEY = "4cf6647a-d515-4747-bf1d-eaca924095e3";

const LOCAL_STORAGE_KEY = "ar_razi_club_registrations";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  registration: RegistrationStatusInfo;
}

interface SavedRegistration {
  fullName: string;
  grade: string;
  favoriteAxis: string;
  registeredAtAndPlace: string;
  seatNumber: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  registration,
}) => {
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('الأولى إعدادي');
  const [selectedAxis, setSelectedAxis] = useState('cybersecurity');
  const [botcheck, setBotcheck] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [seatNumber, setSeatNumber] = useState('');
  const [submittedNamesInSession, setSubmittedNamesInSession] = useState<string[]>([]);

  if (!isOpen) return null;

  // تنسيق التاريخ والوقت الحالي بصيغة ASCII نظيفة YYYY-MM-DD HH:mm حسب توقيت الدار البيضاء (Africa/Casablanca)
  const getCasablancaTimestamp = (): string => {
    try {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Casablanca',
        numberingSystem: 'latn',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).formatToParts(new Date());

      const map: Record<string, string> = {};
      for (const part of parts) {
        map[part.type] = part.value;
      }

      const hour = map.hour === '24' ? '00' : map.hour;
      return `${map.year}-${map.month}-${map.day} ${hour}:${map.minute}`;
    } catch {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, '0');
      return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
    }
  };

  // حفظ نسخة احتياطية من التسجيل الناجح في localStorage بأمان
  const saveRegistrationBackup = (entry: SavedRegistration) => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existing: SavedRegistration[] = raw ? JSON.parse(raw) : [];
      existing.push(entry);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
    } catch {
      // تجاهل أخطاء التخزين المحلي في حال عدم توفره
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // فحص جدول التسجيل في اللحظة الفعلية عند الضغط على التأكيد ومنع أي إرسال خارج الموعد المفتوح
    const liveSchedule = getRegistrationSnapshot(Date.now());
    if (!liveSchedule.isOpen) {
      setErrorMessage(
        liveSchedule.status === 'before'
          ? 'التسجيل لم يفتح بعد'
          : 'انتهت مدة التسجيل'
      );
      return;
    }

    // فحص الحقل الخفي للحماية من الرسائل المزعجة (Honeypot)
    if (botcheck) {
      return;
    }

    const trimmedName = studentName.trim().replace(/\s+/g, ' ');

    // التحقق من الاسم (مطلوب، 3 أحرف على الأقل)
    if (trimmedName.length < 3) {
      setErrorMessage('يرجى إدخال الاسم الكامل (3 أحرف على الأقل).');
      return;
    }

    // التحقق من اختيار المستوى الدراسي
    if (!grade) {
      setErrorMessage('يرجى اختيار المستوى الدراسي.');
      return;
    }

    // منع إرسال نفس الاسم مرتين خلال نفس الجلسة
    const normalizedName = trimmedName.toLowerCase();
    if (submittedNamesInSession.includes(normalizedName)) {
      setErrorMessage('تم تسجيل هذا الاسم مسبقاً في هذه الجلسة.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const axisObj = CLUB_AXES.find((axis) => axis.id === selectedAxis);
    const axisTitle = axisObj ? axisObj.title : selectedAxis;
    const registeredAt = getCasablancaTimestamp();
    const place = `قاعة الأنشطة الكبرى - ${SCHOOL_INFO.schoolName}`;
    const ticketCode = `R-${Math.floor(100 + Math.random() * 900)}`;

    // إعادة التحقق من نافذة التسجيل قبيل الإرسال مباشرة لضمان عدم الإرسال خارج الوقت المفتوح
    const preSendSchedule = getRegistrationSnapshot(Date.now());
    if (!preSendSchedule.isOpen) {
      setErrorMessage(
        preSendSchedule.status === 'before'
          ? 'التسجيل لم يفتح بعد'
          : 'انتهت مدة التسجيل'
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: 'تسجيل جديد في حفل افتتاح نادي المعلوميات',
        from_name: 'موقع نادي المعلوميات',
        full_name: trimmedName,
        school_level: grade,
        favorite_axis: axisTitle,
        ticket_code: ticketCode,
        registered_at: registeredAt,
        place,
        botcheck,
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result || !result.success) {
        setErrorMessage('تعذر إرسال التسجيل، حاول مرة أخرى');
        setIsSubmitting(false);
        return;
      }

      // في حال نجاح الإرسال: اعتماد رقم البطاقة، حفظ النسخة الاحتياطية، وعرض البطاقة
      setSeatNumber(ticketCode);
      setStudentName(trimmedName);
      setSubmittedNamesInSession((prev) => [...prev, normalizedName]);

      saveRegistrationBackup({
        fullName: trimmedName,
        grade,
        favoriteAxis: axisTitle,
        registeredAtAndPlace: `${registeredAt} - ${place}`,
        seatNumber: ticketCode,
      });

      setIsSubmitted(true);
    } catch {
      setErrorMessage('تعذر إرسال التسجيل، حاول مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStudentName('');
    setErrorMessage(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto fade-in-view"
      style={{ backgroundColor: 'rgba(20, 20, 22, 0.85)' }}
    >
      <div className="relative w-full max-w-lg rounded-[12px] bg-[#2A2A2D] border border-[#444448] p-6 sm:p-8 shadow-sm my-8">
        {/* زر الإغلاق */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 left-4 p-2 text-[#E5E5E7] hover:text-[#FFFFFF] rounded-[8px] hover:bg-[#333337] transition-colors cursor-pointer"
          aria-label="إغلاق النافذة"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="text-right mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-[#333337] border border-[#444448] text-[#D4A24C] text-xs font-semibold mb-3">
                <Ticket className="w-4 h-4" />
                <span>بطاقة الحضور المجانية</span>
              </div>
              <h3 className="text-2xl font-bold text-[#FFFFFF]">
                سجل حضورك في حفل الافتتاح
              </h3>
              <p className="text-[17px] text-[#E5E5E7] leading-[1.9] mt-1 font-normal">
                احجز مقعدك في قاعة الأنشطة الكبرى بـ {SCHOOL_INFO.schoolName} يوم السبت القادم.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-right" noValidate>
              {/* حقل مخفي للحماية من البريد العشوائي (Honeypot) */}
              <input
                type="checkbox"
                name="botcheck"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label className="block text-sm font-semibold text-[#FFFFFF] mb-1.5">
                  الاسم الكامل للتلميذ(ة) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    minLength={3}
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="مثال: يوسف الإدريسي"
                    className="w-full px-4 py-2.5 rounded-[8px] bg-[#1C1C1E] border border-[#444448] focus:border-[#D4A24C] text-[#FFFFFF] placeholder-[#8E8E93] text-sm outline-none transition-colors"
                  />
                  <User className="absolute left-3 top-3 w-4 h-4 text-[#8E8E93]" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#FFFFFF] mb-1.5">
                  المستوى الدراسي *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['الأولى إعدادي', 'الثانية إعدادي', 'الثالثة إعدادي'].map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => {
                        setGrade(item);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className={`py-2 px-3 rounded-[8px] text-xs sm:text-sm font-semibold border text-center transition-colors cursor-pointer ${
                        grade === item
                          ? 'bg-[#D4A24C] border-[#D4A24C] text-[#141416]'
                          : 'bg-[#333337] border-[#444448] text-[#E5E5E7] hover:bg-[#3E3E42]'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#FFFFFF] mb-1.5">
                  أكثر محور يثير اهتمامك للتعلم
                </label>
                <select
                  value={selectedAxis}
                  onChange={(e) => setSelectedAxis(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-[8px] bg-[#1C1C1E] border border-[#444448] focus:border-[#D4A24C] text-[#FFFFFF] text-sm outline-none transition-colors cursor-pointer"
                >
                  {CLUB_AXES.map((axis) => (
                    <option key={axis.id} value={axis.id} className="bg-[#1C1C1E] text-[#FFFFFF]">
                      {axis.title} ({axis.badge})
                    </option>
                  ))}
                </select>
              </div>

              {/* رسالة الخطأ الواضحة باللغة العربية */}
              {errorMessage && (
                <div
                  role="alert"
                  className="p-3 rounded-[8px] bg-[#1C1C1E] border border-[#D4A24C] text-[#E5E5E7] text-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-[#D4A24C] shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !registration.isOpen}
                  className="w-full py-3 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] disabled:opacity-60 disabled:cursor-not-allowed text-[#141416] font-bold text-base transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {!registration.isOpen
                      ? registration.buttonLabel
                      : isSubmitting
                      ? 'جاري إرسال التسجيل...'
                      : 'تأكيد الحجز وتوليد بطاقة الدعوة'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-right">
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-[8px] bg-[#333337] border border-[#444448] text-[#D4A24C] mb-2">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#FFFFFF]">
                تم تسجيلك بنجاح
              </h3>
              <p className="text-sm text-[#E5E5E7] mt-1">
                مرحباً بك في نادي المعلوميات، هذه بطاقة دعوتك الرسمية لحضور حفل السبت
              </p>
            </div>

            {/* بطاقة الدعوة الرقمية */}
            <div className="rounded-[12px] bg-[#333337] border border-[#D4A24C] p-5 mb-6">
              <div className="flex items-center justify-between border-b border-[#444448] pb-3 mb-3">
                <div className="text-right">
                  <div className="text-xs text-[#D4A24C] font-bold">{SCHOOL_INFO.schoolName}</div>
                  <div className="text-base font-bold text-[#FFFFFF]">{SCHOOL_INFO.clubName}</div>
                </div>
                <div className="px-3 py-1 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] font-mono text-xs font-bold">
                  {seatNumber}
                </div>
              </div>

              <div className="space-y-2 text-sm text-[#E5E5E7]">
                <div className="flex justify-between py-1 border-b border-[#444448]">
                  <span>اسم التلميذ(ة):</span>
                  <span className="font-bold text-[#FFFFFF]">{studentName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#444448]">
                  <span>المستوى الدراسي:</span>
                  <span className="font-semibold text-[#FFFFFF]">{grade}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#444448]">
                  <span>موعد الحفل:</span>
                  <span className="font-semibold text-[#D4A24C]">{SCHOOL_INFO.ceremonyDate} - {SCHOOL_INFO.ceremonyTime}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>مكان الحفل:</span>
                  <span className="font-semibold text-[#FFFFFF]">قاعة الأنشطة الكبرى</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-[#444448] flex items-center justify-between text-xs text-[#E5E5E7]">
                <span>يرجى الحضور 10 دقائق قبل البداية</span>
                <span className="text-[#D4A24C] font-bold">معاً نصنع المستقبل</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 py-2.5 rounded-[8px] bg-[#333337] border border-[#444448] hover:bg-[#3E3E42] text-[#FFFFFF] text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#D4A24C]" />
                <span>طباعة أو حفظ البطاقة</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] text-[#141416] text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>إغلاق والمتابعة</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
            </div>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#D4A24C] hover:underline cursor-pointer"
              >
                تسجيل تلميذ آخر
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
