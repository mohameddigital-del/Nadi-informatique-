/**
 * @file AxisInteractions.tsx
 * وحدات تفاعلية مصغرة مخصصة لكل محور من المحاور الأربعة
 * بالنمط الرمادي الداكن الموحد (#333337، #2A2A2D، #444448) مع اللون الذهبي الدافئ (#D4A24C)
 */

import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, Check, Eye, EyeOff, Terminal, Wand2 } from 'lucide-react';

/* =========================================================================
   1. المحور الأول: فاحص قوة كلمات المرور (الأمن السيبراني)
   ========================================================================= */
export const PasswordTester: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const hasLength = password.length >= 10;
  const hasNumbers = /\d/.test(password);
  const hasLetters = /[a-zA-Z\u0621-\u064A]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9\u0621-\u064A]/.test(password);

  const score = [hasLength, hasNumbers, hasLetters, hasSpecial].filter(Boolean).length;

  let strengthLabel = 'ضعيفة جداً';
  let strengthColor = 'bg-[#6E6E73]';
  let crackEstimate = 'تُخترق في أجزاء من الثانية!';

  if (password.length === 0) {
    strengthLabel = 'أدخل كلمة مرور للتجربة';
    strengthColor = 'bg-[#444448]';
    crackEstimate = 'غير محدد';
  } else if (score === 1) {
    strengthLabel = 'ضعيفة جداً وسهلة الكسر';
    strengthColor = 'bg-[#8E8E93]';
    crackEstimate = 'تُخترق فورياً بالهجوم الآلي';
  } else if (score === 2) {
    strengthLabel = 'متوسطة - تحتاج تحسين';
    strengthColor = 'bg-[#AEAEB2]';
    crackEstimate = 'يمكن كسرها في دقائق أو ساعات قليلة';
  } else if (score === 3) {
    strengthLabel = 'جيدة وقوية';
    strengthColor = 'bg-[#C49342]';
    crackEstimate = 'تتطلب عدة أشهر أو سنوات لكسرها';
  } else if (score === 4) {
    strengthLabel = 'فائقة القوة وحصينة جداً!';
    strengthColor = 'bg-[#D4A24C]';
    crackEstimate = 'تتطلب آلاف السنين لأقوى الحواسيب الخارقة!';
  }

  return (
    <div className="w-full rounded-[12px] bg-[#333337] border border-[#444448] p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-[8px] bg-[#2A2A2D] text-[#D4A24C] border border-[#444448]">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-[#FFFFFF]">تطبيق عملي: مختبر اختبار قوة كلمة المرور</h4>
          <p className="text-sm text-[#E5E5E7]">جرب كتابة كلمة مرور افتراضية وشاهد كيف يقيمها خبراء الأمن السيبراني</p>
        </div>
      </div>

      <div className="relative mb-5">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="اكتب كلمة مرور هنا لتجربتها..."
          className="w-full pr-4 pl-12 py-3 rounded-[8px] bg-[#1C1C1E] border border-[#444448] focus:border-[#D4A24C] text-[#FFFFFF] placeholder-[#8E8E93] text-base outline-none transition-colors"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-[6px] text-[#E5E5E7] hover:text-[#D4A24C] cursor-pointer transition-colors"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {/* شريط القوة */}
      <div className="space-y-2 mb-5">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#E5E5E7]">مستوى الأمان:</span>
          <span className="font-bold text-[#D4A24C]">{strengthLabel}</span>
        </div>
        <div className="w-full h-2.5 rounded-[4px] bg-[#1C1C1E] overflow-hidden flex gap-1 p-0.5">
          <div className={`h-full rounded-[2px] transition-colors duration-200 ${score >= 1 ? strengthColor : 'bg-transparent'} flex-1`} />
          <div className={`h-full rounded-[2px] transition-colors duration-200 ${score >= 2 ? strengthColor : 'bg-transparent'} flex-1`} />
          <div className={`h-full rounded-[2px] transition-colors duration-200 ${score >= 3 ? strengthColor : 'bg-transparent'} flex-1`} />
          <div className={`h-full rounded-[2px] transition-colors duration-200 ${score >= 4 ? strengthColor : 'bg-transparent'} flex-1`} />
        </div>
        {password.length > 0 && (
          <div className="text-sm text-[#E5E5E7] mt-1">
            <span>الوقت المقدر للكسر: </span>
            <span className="text-[#FFFFFF] font-semibold">{crackEstimate}</span>
          </div>
        )}
      </div>

      {/* معايير كلمة المرور */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-sm">
        <div className={`p-2.5 rounded-[8px] border flex items-center gap-2 ${hasLength ? 'bg-[#2A2A2D] border-[#D4A24C] text-[#FFFFFF]' : 'bg-[#1C1C1E] border-[#444448] text-[#8E8E93]'}`}>
          <Check className={`w-4 h-4 ${hasLength ? 'text-[#D4A24C]' : 'text-[#8E8E93]'}`} />
          <span>10 خانات فأكثر</span>
        </div>
        <div className={`p-2.5 rounded-[8px] border flex items-center gap-2 ${hasNumbers ? 'bg-[#2A2A2D] border-[#D4A24C] text-[#FFFFFF]' : 'bg-[#1C1C1E] border-[#444448] text-[#8E8E93]'}`}>
          <Check className={`w-4 h-4 ${hasNumbers ? 'text-[#D4A24C]' : 'text-[#8E8E93]'}`} />
          <span>أرقام (0-9)</span>
        </div>
        <div className={`p-2.5 rounded-[8px] border flex items-center gap-2 ${hasLetters ? 'bg-[#2A2A2D] border-[#D4A24C] text-[#FFFFFF]' : 'bg-[#1C1C1E] border-[#444448] text-[#8E8E93]'}`}>
          <Check className={`w-4 h-4 ${hasLetters ? 'text-[#D4A24C]' : 'text-[#8E8E93]'}`} />
          <span>حروف متنوعة</span>
        </div>
        <div className={`p-2.5 rounded-[8px] border flex items-center gap-2 ${hasSpecial ? 'bg-[#2A2A2D] border-[#D4A24C] text-[#FFFFFF]' : 'bg-[#1C1C1E] border-[#444448] text-[#8E8E93]'}`}>
          <Check className={`w-4 h-4 ${hasSpecial ? 'text-[#D4A24C]' : 'text-[#8E8E93]'}`} />
          <span>رموز خاصة (@#$)</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. المحور الثاني: ميثاق الأمان الرقمي (الاستخدام الآمن للإنترنت)
   ========================================================================= */
export const DigitalSafetyPledge: React.FC = () => {
  const [pledges, setPledges] = useState<boolean[]>([true, true, false, false]);

  const togglePledge = (index: number) => {
    setPledges((prev) => prev.map((value, idx) => (idx === index ? !value : value)));
  };

  const completedCount = pledges.filter(Boolean).length;
  const isAllDone = completedCount === 4;

  const rules = [
    { title: 'أحافظ على سرية بياناتي', desc: 'لا أشارك عنوان منزلي، رقم هاتفي، أو كلمة المرور مع أي شخص على الإنترنت.' },
    { title: 'التحقق قبل التصديق والنشر', desc: 'لا أعيد إرسال أي خبر أو صورة مشبوهة حتى أتأكد من مصدرها الرسمي.' },
    { title: 'السلوك المحترم ونبذ التنمر', desc: 'أعامل الجميع بلطف واحترام، وأبلغ فوراً الإدارة أو أستاذي عند مشاهدة أي تنمر.' },
    { title: 'إدارة متوازنة لوقت الشاشات', desc: 'أحدد أوقاتاً مخصصة للدراسة والرياضة ولا أترك الهاتف يسرق يومي ونومي.' },
  ];

  return (
    <div className="w-full rounded-[12px] bg-[#333337] border border-[#444448] p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-bold text-[#FFFFFF]">ميثاق التلميذ الرقمي المسؤول</h4>
          <p className="text-sm text-[#E5E5E7]">انقر على البنود لتأكيد التزامك بقواعد السلامة والخصوصية على الإنترنت</p>
        </div>
        <div className="px-3.5 py-1.5 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-sm font-bold self-start sm:self-auto">
          المكتمل: {completedCount} من 4
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {rules.map((rule, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => togglePledge(idx)}
            className={`p-5 rounded-[8px] border text-right transition-colors flex items-start gap-3 cursor-pointer ${
              pledges[idx]
                ? 'bg-[#2A2A2D] border-[#D4A24C] text-[#FFFFFF]'
                : 'bg-[#1C1C1E] border-[#444448] text-[#E5E5E7] hover:bg-[#2A2A2D]'
            }`}
          >
            <div className={`mt-1 p-1 rounded-[6px] shrink-0 ${pledges[idx] ? 'bg-[#D4A24C] text-[#141416]' : 'bg-[#333337] text-[#8E8E93]'}`}>
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-base font-bold text-[#FFFFFF] mb-1">{rule.title}</div>
              <div className="text-[17px] text-[#E5E5E7] leading-[1.9] font-normal">{rule.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {isAllDone && (
        <div className="p-4 rounded-[8px] bg-[#2A2A2D] border border-[#D4A24C] text-center text-base text-[#FFFFFF] font-semibold">
          أحسنت! أنت الآن حامل لدرع المواطنة الرقمية الصالحة بثانوية الرازي الاعدادية.
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   3. المحور الثالث: معمل الأكواد الحي (تطوير المواقع)
   ========================================================================= */
export const LiveCodePlayground: React.FC = () => {
  const [headline, setHeadline] = useState('مرحباً بكم في موقعي الأول!');
  const [buttonStyle, setButtonStyle] = useState<'gold' | 'charcoal' | 'white'>('gold');
  const [buttonText, setButtonText] = useState('استكشف المزيد');

  const stylesMap = {
    gold: 'bg-[#D4A24C] text-[#141416] hover:bg-[#E0B25F]',
    charcoal: 'bg-[#333337] text-[#FFFFFF] border border-[#444448] hover:bg-[#3E3E42]',
    white: 'bg-[#FFFFFF] text-[#141416] hover:bg-[#E5E5E7]',
  };

  return (
    <div className="w-full rounded-[12px] bg-[#333337] border border-[#444448] p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-[8px] bg-[#2A2A2D] text-[#D4A24C] border border-[#444448]">
          <Terminal className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-[#FFFFFF]">معمل الأكواد الحي: جرب التعديل بنفسك</h4>
          <p className="text-sm text-[#E5E5E7]">غير النص ونمط الزر وشاهد النتيجة الحية فوراً كما يراها مطور الويب</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* لوحة التحكم */}
        <div className="space-y-4 bg-[#2A2A2D] p-5 rounded-[8px] border border-[#444448]">
          <div>
            <label className="block text-sm font-semibold text-[#FFFFFF] mb-1.5">
              نص العنوان الرئيسي (HTML &lt;h1&gt;):
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[8px] bg-[#1C1C1E] border border-[#444448] text-[#FFFFFF] text-sm focus:border-[#D4A24C] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#FFFFFF] mb-1.5">
              نص الزر التفاعلي (HTML &lt;button&gt;):
            </label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-[8px] bg-[#1C1C1E] border border-[#444448] text-[#FFFFFF] text-sm focus:border-[#D4A24C] outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#FFFFFF] mb-1.5">
              تنسيق النمط (CSS Styling):
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setButtonStyle('gold')}
                className={`py-2 px-2 rounded-[8px] text-xs font-semibold border cursor-pointer transition-colors ${
                  buttonStyle === 'gold' ? 'bg-[#D4A24C] border-[#D4A24C] text-[#141416]' : 'bg-[#1C1C1E] border-[#444448] text-[#E5E5E7]'
                }`}
              >
                ذهبي دافئ
              </button>
              <button
                type="button"
                onClick={() => setButtonStyle('charcoal')}
                className={`py-2 px-2 rounded-[8px] text-xs font-semibold border cursor-pointer transition-colors ${
                  buttonStyle === 'charcoal' ? 'bg-[#D4A24C] border-[#D4A24C] text-[#141416]' : 'bg-[#1C1C1E] border-[#444448] text-[#E5E5E7]'
                }`}
              >
                رمادي داكن
              </button>
              <button
                type="button"
                onClick={() => setButtonStyle('white')}
                className={`py-2 px-2 rounded-[8px] text-xs font-semibold border cursor-pointer transition-colors ${
                  buttonStyle === 'white' ? 'bg-[#D4A24C] border-[#D4A24C] text-[#141416]' : 'bg-[#1C1C1E] border-[#444448] text-[#E5E5E7]'
                }`}
              >
                أبيض ناصع
              </button>
            </div>
          </div>
        </div>

        {/* المعاينة الحية */}
        <div className="bg-[#1C1C1E] rounded-[8px] border border-[#444448] p-6 flex flex-col justify-center items-center text-center relative">
          <div className="absolute top-3 left-3 text-xs font-mono text-[#E5E5E7]">
            معاينة المتصفح المباشرة
          </div>
          <div className="my-auto py-4">
            <span className="inline-block px-3 py-1 rounded-[8px] text-xs font-bold bg-[#333337] border border-[#444448] text-[#D4A24C] mb-3">
              ثانوية الرازي الاعدادية
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-5">
              {headline}
            </h3>
            <button
              type="button"
              className={`px-6 py-2.5 rounded-[8px] text-sm font-bold cursor-pointer transition-colors ${stylesMap[buttonStyle]}`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. المحور الرابع: مختبر أوامر الذكاء الاصطناعي (Prompt Lab)
   ========================================================================= */
export const PromptLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<0 | 1 | 2>(0);

  const promptCases = [
    {
      title: 'تلخيص درس العلوم الفيزيائية',
      weak: 'لخص لي درس الضغط والضغط الجوي.',
      strong: 'أنت أستاذ علوم خبير لتلاميذ الإعدادي. لخص درس الضغط والضغط الجوي في 4 نقاط رئيسية مبسطة مع ذكر مثال من حياتنا اليومية وقانون الحساب الرياضي، واختم بسؤال تدريبي وتفسير حله.',
      why: 'تحديد الدور والمستوى وشكل المخرجات المطلوبة يعطي تلخيصاً احترافياً ودقيقاً بدلاً من إجابة عامة مشتتة.',
    },
    {
      title: 'كتابة برنامج بسيط للرياضيات',
      weak: 'اكتب كود يحسب مساحة الدائرة.',
      strong: 'اكتب كوداً بلغة JavaScript لتلميذ في السنة الثانية إعدادي يحسب مساحة الدائرة مع إدخال نصف القطر. أضف تعليقات واضحة باللغة العربية تشرح كل سطر وتوضح قيمة Pi.',
      why: 'طلب لغة محددة والتعليقات التوضيحية بالعربية يجعل الكود قابلاً للفهم والتعلم الذاتي الفوري.',
    },
    {
      title: 'التحضير للمناظرة أو العرض المدرسي',
      weak: 'أعطني معلومات عن الطاقات المتجددة.',
      strong: 'أريد إعداد عرض تقديمي مدته 5 دقائق عن الطاقات المتجددة في المغرب. اقترح هيكلاً من 3 شرائح رئيسية (المقدمة، مشروع نور للطاقة الشمسية، والتوصيات) مع نقاط إلقاء مركزة.',
      why: 'السياق الزمني والجغرافي وهيكل الشرائح يجعل المحتوى ملائماً تماماً للواجب المدرسي.',
    },
  ];

  return (
    <div className="w-full rounded-[12px] bg-[#333337] border border-[#444448] p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-[8px] bg-[#2A2A2D] text-[#D4A24C] border border-[#444448]">
          <Wand2 className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-[#FFFFFF]">مختبر هندسة الأوامر (Prompt Engineering)</h4>
          <p className="text-sm text-[#E5E5E7]">قارن بين الأمر العادي والأمر الذكي الاحترافي لتحصل على أفضل نتائج من الذكاء الاصطناعي</p>
        </div>
      </div>

      {/* أزرار الحالات */}
      <div className="flex flex-wrap gap-2 mb-5">
        {promptCases.map((c, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiveTab(i as 0 | 1 | 2)}
            className={`px-4 py-2 rounded-[8px] text-sm font-semibold border transition-colors cursor-pointer ${
              activeTab === i
                ? 'bg-[#D4A24C] border-[#D4A24C] text-[#141416]'
                : 'bg-[#2A2A2D] border-[#444448] text-[#E5E5E7] hover:text-[#FFFFFF]'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* المقارنة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="p-5 rounded-[8px] bg-[#2A2A2D] border border-[#444448]">
          <div className="text-sm font-bold text-[#E5E5E7] mb-2 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#E5E5E7]" />
            <span>الأمر الضعيف (نتيجة عامة ومقتضبة):</span>
          </div>
          <p className="text-[17px] text-[#E5E5E7] leading-[1.9] bg-[#1C1C1E] p-3.5 rounded-[8px] border border-[#444448]">
            "{promptCases[activeTab].weak}"
          </p>
        </div>

        <div className="p-5 rounded-[8px] bg-[#2A2A2D] border border-[#D4A24C]">
          <div className="text-sm font-bold text-[#D4A24C] mb-2 flex items-center gap-2">
            <Check className="w-4 h-4 text-[#D4A24C]" />
            <span>الأمر الذكي المهندس (نتيجة فائقة الدقة):</span>
          </div>
          <p className="text-[17px] text-[#FFFFFF] leading-[1.9] bg-[#1C1C1E] p-3.5 rounded-[8px] border border-[#444448]">
            "{promptCases[activeTab].strong}"
          </p>
        </div>
      </div>

      <div className="p-4 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[17px] text-[#E5E5E7] leading-[1.9] flex items-start gap-2">
        <span className="font-bold text-[#D4A24C] shrink-0">سر التميز:</span>
        <span>{promptCases[activeTab].why}</span>
      </div>
    </div>
  );
};
