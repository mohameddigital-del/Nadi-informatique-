/**
 * @file HomeView.tsx
 * الصفحة الرئيسية لموقع نادي المعلوميات - ثانوية الرازي الاعدادية
 * مصممة بالنمط الرمادي الداكن الهادئ (#1C1C1E و #2A2A2D و #333337)
 * مع لمسة ذهبية دافئة (#D4A24C) وخط القاهرة المريح للقراءة
 */

import React from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  Terminal,
  Users,
  Briefcase,
  Brain,
  UserPlus,
} from 'lucide-react';
import {
  SCHOOL_INFO,
  CLUB_IMAGES,
  CLUB_BENEFITS,
  CLUB_AXES,
  CEREMONY_PROGRAM,
} from '../data/clubData';
import { CountdownTimer } from './CountdownTimer';
import { PageId } from './Navbar';
import { RegistrationStatusInfo } from '../utils/registrationSchedule';

interface HomeViewProps {
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
  registration: RegistrationStatusInfo;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenRegister,
  registration,
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // اختيار أيقونة الاستفادة باللون الذهبي الدافئ الموحد
  const getBenefitIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-[#D4A24C]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#D4A24C]" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-[#D4A24C]" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-[#D4A24C]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#D4A24C]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#D4A24C]" />;
    }
  };

  return (
    <div className="w-full text-right fade-in-view">
      {/* 
        ========================================================================
        1. واجهة الغلاف (Hero Section) بصورة حقيقية وتراكب داكن صلب rgba(20, 20, 22, 0.7)
        ========================================================================
      */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#1C1C1E]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${CLUB_IMAGES.homeHero}')` }}
        >
          {/* تراكب داكن صلب بدون تدرجات لونية */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(20, 20, 22, 0.7)' }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* شارة حفل الافتتاح يوم السبت بدون نقاط متوهجة */}
          <div className="inline-block px-4 py-1.5 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-sm font-semibold mb-6">
            حفل الافتتاح: {SCHOOL_INFO.ceremonyDate}
          </div>

          {/* اسم المدرسة والنادي باللون الأبيض الصافي */}
          <div className="mb-6">
            <span className="text-lg sm:text-xl font-bold text-[#E5E5E7] block mb-3">
              {SCHOOL_INFO.schoolName}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#FFFFFF] leading-tight">
              «{SCHOOL_INFO.clubName}»
            </h1>
          </div>

          {/* الشعار الترحيبي */}
          <p className="max-w-3xl mx-auto text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal mb-10">
            {SCHOOL_INFO.slogan}
          </p>

          {/* أزرار الإجراء المسطحة بزوايا 8px */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('club-axes')}
              className="px-7 py-3.5 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] text-[#141416] font-bold text-base transition-colors duration-200 flex items-center gap-2.5 cursor-pointer"
            >
              <span>اكتشف محاور النادي</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenRegister}
              disabled={!registration.isOpen}
              className="px-7 py-3.5 rounded-[8px] bg-[#333337] hover:bg-[#3E3E42] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#333337] text-[#FFFFFF] font-bold text-base border border-[#444448] transition-colors duration-200 flex items-center gap-2.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#D4A24C]" />
              <span>{registration.buttonLabel}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. قسم العداد التنازلي لحفل الافتتاح (على الخلفية الرئيسية #1C1C1E)
        ========================================================================
      */}
      <section className="bg-[#1C1C1E] py-12 px-4 sm:px-6 lg:px-8 border-t border-[#2A2A2D]">
        <CountdownTimer />
      </section>

      {/* 
        ========================================================================
        3. قسم: ما هو نادي المعلوميات؟ (خلفية متناوبة #2A2A2D)
        ========================================================================
      */}
      <section className="bg-[#2A2A2D] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#444448]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* النص والتعريف */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block px-3 py-1 rounded-[8px] bg-[#333337] border border-[#444448] text-[#D4A24C] text-sm font-semibold">
              فضاء للإبداع والشغف الرقمي
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] leading-snug">
              ما هو نادي المعلوميات بثانوية الرازي؟
            </h2>

            <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
              هو مبادرة تربوية تقنية متقدمة أطلقتها ثانوية الرازي الاعدادية بهدف فتح أبواب العالم الرقمي أمام المتعلمات والمتعلمين، ودمجهم في أحدث المعارف التكنولوجية الحديثة بشكل مبسط وممتع وتطبيقي.
            </p>

            <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
              يسعى النادي إلى كسر الصورة النمطية لدروس الحواسيب التقليدية، عبر الانتقال إلى أسلوب الورشات التفاعلية والعمل الجماعي وحل التحديات الحقيقية، لتكوين أجيال قادرة على الاستخدام الآمن والذكي للتكنولوجيا وصناعة مشاريعها الخاصة.
            </p>

            {/* ميزات سريعة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                'ورشات أسبوعية تطبيقية',
                'مشاريع جماعية ملموسة',
                'تأطير ومرافقة مستمرة',
                'شهادات مشاركة ومسابقات',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-[8px] bg-[#333337] border border-[#444448] shadow-sm"
                >
                  <CheckCircle className="w-5 h-5 text-[#D4A24C] shrink-0" />
                  <span className="text-base text-[#FFFFFF] font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* صورة حقيقية توضيحية لنشاط النادي والتلاميذ */}
          <div className="lg:col-span-5">
            <div className="rounded-[12px] overflow-hidden border border-[#444448] bg-[#333337] shadow-sm">
              <img
                src={CLUB_IMAGES.homeAbout}
                alt="تلاميذ يتعلمون البرمجة والعمل الجماعي"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
              <div className="p-5 bg-[#333337] border-t border-[#444448]">
                <div className="text-sm text-[#D4A24C] font-bold mb-1">بيئة تعاونية محفزة</div>
                <p className="text-[17px] text-[#E5E5E7] leading-[1.9] font-normal">
                  تطوير المهارات القيادية وحل المشكلات داخل قاعات مجهزة بالوسائط المتعددة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        4. قسم: ماذا سنستفيد من النادي؟ (خلفية رئيسية #1C1C1E)
        ========================================================================
      */}
      <section className="bg-[#1C1C1E] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-sm font-semibold mb-4">
              عوائد معرفية ومستقبلية
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mb-4">
              ماذا سنستفيد من نادي المعلوميات؟
            </h2>
            <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
              انضمامك للنادي ليس مجرد نشاط إضافي، بل هو استثمار حقيقي في مستقبلك الأكاديمي والمهني والشخصي.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLUB_BENEFITS.map((benefit, index) => (
              <div
                key={benefit.id}
                className={`rounded-[12px] bg-[#333337] border border-[#444448] p-7 transition-colors duration-200 hover:bg-[#3A3A3F] shadow-sm ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-[8px] bg-[#2A2A2D] border border-[#444448] flex items-center justify-center mb-5">
                  {getBenefitIcon(benefit.icon)}
                </div>

                <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">
                  {benefit.title}
                </h3>

                <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        5. قسم: محاور النادي الأربعة (خلفية متناوبة #2A2A2D)
        ========================================================================
      */}
      <section id="club-axes" className="bg-[#2A2A2D] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#444448]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 rounded-[8px] bg-[#333337] border border-[#444448] text-[#D4A24C] text-sm font-semibold mb-4">
              المسارات التكوينية الأربعة
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mb-4">
              محاور النادي الرئيسية
            </h2>
            <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
              تم تصميم المحاور بعناية لتغطي أهم مجالات التكنولوجيا التي يحتاجها تلميذ السلك الإعدادي اليوم للتميز غداً.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLUB_AXES.map((axis) => (
              <div
                key={axis.id}
                className="rounded-[12px] overflow-hidden bg-[#333337] border border-[#444448] shadow-sm flex flex-col justify-between transition-colors duration-200 hover:bg-[#3A3A3F]"
              >
                {/* صورة المحور في الجزء العلوي */}
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img
                    src={axis.heroImage}
                    alt={axis.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(20, 20, 22, 0.45)' }}
                  />

                  {/* رقم المحور وشارة التمييز */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-[8px] bg-[#141416] border border-[#444448] text-[#FFFFFF] text-xs font-bold">
                      المحور {axis.number}
                    </span>
                    <span className="px-3 py-1 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-xs font-semibold">
                      {axis.badge}
                    </span>
                  </div>
                </div>

                {/* تفاصيل المحور */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-2xl font-bold text-[#FFFFFF] mb-3">
                      {axis.title}
                    </h3>
                    <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                      {axis.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#444448] flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        onNavigate(axis.id as PageId);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] text-[#141416] text-sm font-bold transition-colors cursor-pointer"
                    >
                      <span>عرض تفاصيل المحور</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-[#E5E5E7]">4 أهداف رئيسية</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        6. قسم: تفاصيل حفل الافتتاح (خلفية رئيسية #1C1C1E)
        ========================================================================
      */}
      <section className="bg-[#1C1C1E] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[12px] bg-[#2A2A2D] border border-[#444448] p-8 sm:p-12 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="inline-block px-3 py-1 rounded-[8px] bg-[#333337] border border-[#444448] text-[#D4A24C] text-sm font-semibold mb-3">
                موعدنا المنتظر
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mb-3">
                تفاصيل وبرنامج حفل الافتتاح
              </h2>
              <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                ندعو جميع تلميذات وتلاميذ ثانوية الرازي الاعدادية لحضور هذا الحفل التأسيسي الممتع.
              </p>
            </div>

            {/* بطاقات الموعد والمكان السريعة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="p-5 rounded-[8px] bg-[#333337] border border-[#444448] flex items-center gap-3.5">
                <div className="p-3 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#E5E5E7]">اليوم والتاريخ</div>
                  <div className="text-base font-bold text-[#FFFFFF]">{SCHOOL_INFO.ceremonyDate}</div>
                </div>
              </div>

              <div className="p-5 rounded-[8px] bg-[#333337] border border-[#444448] flex items-center gap-3.5">
                <div className="p-3 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#E5E5E7]">التوقيت</div>
                  <div className="text-base font-bold text-[#FFFFFF]">{SCHOOL_INFO.ceremonyTime}</div>
                </div>
              </div>

              <div className="p-5 rounded-[8px] bg-[#333337] border border-[#444448] flex items-center gap-3.5">
                <div className="p-3 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-[#E5E5E7]">المكان</div>
                  <div className="text-base font-bold text-[#FFFFFF]">قاعة الأنشطة الكبرى بالمؤسسة</div>
                </div>
              </div>
            </div>

            {/* فقرات البرنامج الأربع */}
            <div className="mb-10">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-6 border-r-4 border-[#D4A24C] pr-3">
                البرنامج الزمني المفصل للحفل:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CEREMONY_PROGRAM.map((item) => (
                  <div
                    key={item.step}
                    className="p-6 rounded-[8px] bg-[#333337] border border-[#444448] flex items-start gap-4 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] font-mono text-base font-bold flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-lg font-bold text-[#FFFFFF]">{item.title}</h4>
                      <span className="inline-block px-2.5 py-0.5 rounded-[6px] text-xs font-mono font-semibold bg-[#2A2A2D] border border-[#444448] text-[#D4A24C]">
                        {item.time}
                      </span>
                      <p className="text-[17px] text-[#E5E5E7] leading-[1.9] font-normal pt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* دعوة التسجيل المباشر للحفل */}
            <div className="text-center pt-6 border-t border-[#444448]">
              <button
                type="button"
                onClick={onOpenRegister}
                disabled={!registration.isOpen}
                className="px-8 py-3.5 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4A24C] text-[#141416] font-bold text-base transition-colors inline-flex items-center gap-2.5 cursor-pointer"
              >
                <UserPlus className="w-5 h-5" />
                <span>{registration.buttonLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
