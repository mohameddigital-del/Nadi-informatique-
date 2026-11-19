/**
 * @file AxisView.tsx
 * واجهة العرض الموحدة لمحاور النادي الأربعة (الصفحات من 2 إلى 5)
 * تستخدم نفس نظام الألوان الرمادي الداكن الموحد (#1C1C1E، #2A2A2D، #333337) مع اللون الذهبي الدافئ (#D4A24C)
 */

import React from 'react';
import {
  Check,
  Home,
  ChevronRight,
  ChevronLeft,
  Target,
  Award,
  BookOpen,
  ShieldCheck,
  Compass,
  Layout,
  Cpu,
  Lock,
  AlertTriangle,
  UserCheck,
  Fingerprint,
  Code2,
  Zap,
  Rocket,
  Sparkles,
} from 'lucide-react';
import { ClubAxis, CLUB_AXES } from '../data/clubData';
import { PageId } from './Navbar';
import { RegistrationStatusInfo } from '../utils/registrationSchedule';
import {
  PasswordTester,
  DigitalSafetyPledge,
  LiveCodePlayground,
  PromptLab,
} from './AxisInteractions';

interface AxisViewProps {
  axis: ClubAxis;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
  registration: RegistrationStatusInfo;
}

export const AxisView: React.FC<AxisViewProps> = ({
  axis,
  onNavigate,
  onOpenRegister,
  registration,
}) => {
  const currentIndex = CLUB_AXES.findIndex((a) => a.id === axis.id);
  const prevAxis = currentIndex > 0 ? CLUB_AXES[currentIndex - 1] : null;
  const nextAxis = currentIndex < CLUB_AXES.length - 1 ? CLUB_AXES[currentIndex + 1] : null;

  const navigateTo = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // مطابقة الأيقونات الخاصة بالمكاسب باللون الذهبي الدافئ الموحد
  const getGainIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lock':
        return <Lock className="w-5 h-5 text-[#D4A24C]" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-[#D4A24C]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#D4A24C]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#D4A24C]" />;
      case 'UserCheck':
        return <UserCheck className="w-5 h-5 text-[#D4A24C]" />;
      case 'Fingerprint':
        return <Fingerprint className="w-5 h-5 text-[#D4A24C]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#D4A24C]" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#D4A24C]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#D4A24C]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#D4A24C]" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-[#D4A24C]" />;
      case 'Rocket':
        return <Rocket className="w-5 h-5 text-[#D4A24C]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#D4A24C]" />;
    }
  };

  // تقديم الوحدة التفاعلية الخاصة بكل محور
  const renderInteractiveWidget = () => {
    switch (axis.id) {
      case 'cybersecurity':
        return <PasswordTester />;
      case 'safe-internet':
        return <DigitalSafetyPledge />;
      case 'web-development':
        return <LiveCodePlayground />;
      case 'artificial-intelligence':
        return <PromptLab />;
      default:
        return null;
    }
  };

  return (
    <div key={axis.id} className="w-full text-right fade-in-view">
      {/* 
        ========================================================================
        1. غلاف المحور (Hero Section) مع صورة حقيقية وتراكب داكن صلب rgba(20, 20, 22, 0.7)
        ========================================================================
      */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#1C1C1E]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${axis.heroImage}')` }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(20, 20, 22, 0.7)' }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* شارة رقم المحور وتصنيفه */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-sm font-semibold mb-6">
            <span>المحور رقم {axis.number}</span>
            <span className="text-[#E5E5E7]">•</span>
            <span>{axis.badge}</span>
          </div>

          {/* عنوان المحور باللون الأبيض الصافي */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#FFFFFF] mb-6 leading-tight">
            «{axis.title}»
          </h1>

          {/* الوصف القصير */}
          <p className="max-w-2xl mx-auto text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal mb-8">
            {axis.shortDescription}
          </p>

          {/* مسار التصفح */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[8px] bg-[#141416] border border-[#444448] text-sm text-[#E5E5E7]">
            <button type="button" onClick={() => navigateTo('home')} className="hover:text-[#D4A24C] cursor-pointer">
              الرئيسية
            </button>
            <span>/</span>
            <span>محاور النادي</span>
            <span>/</span>
            <span className="text-[#D4A24C] font-semibold">{axis.title}</span>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        2. قسم: ما هو هذا المحور؟ (خلفية متناوبة #2A2A2D)
        ========================================================================
      */}
      <section className="bg-[#2A2A2D] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#444448]">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[12px] bg-[#333337] border border-[#444448] p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-sm font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <span>المفهوم والأساس التربوي</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF]">
                  ما هو محور {axis.title}؟
                </h2>

                <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                  {axis.definition}
                </p>

                <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                  {axis.definitionDetails}
                </p>
              </div>

              {/* صورة داعمة داخل المحتوى */}
              <div className="lg:col-span-5">
                <div className="rounded-[12px] overflow-hidden border border-[#444448] bg-[#2A2A2D] shadow-sm">
                  <img
                    src={axis.secondaryImage}
                    alt={axis.title}
                    className="w-full h-64 sm:h-72 object-cover"
                    loading="lazy"
                  />
                  <div className="p-4 bg-[#2A2A2D] border-t border-[#444448] text-sm text-[#E5E5E7]">
                    تطبيقات عملية مستمرة لترسيخ المفاهيم المكتسبة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        3. قسم: أهداف المحور (خلفية رئيسية #1C1C1E)
        ========================================================================
      */}
      <section className="bg-[#1C1C1E] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-sm font-semibold mb-3">
              <Target className="w-4 h-4" />
              <span>الغايات التعليمية المنشودة</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mb-2">
              أهداف محور {axis.title}
            </h2>
            <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
              ما نسعى لتحقيقه مع كل تلميذة وتلميذ ينضم لهذا المحور.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {axis.goals.map((goal, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[12px] bg-[#333337] border border-[#444448] shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] flex items-center justify-center font-bold font-mono text-sm shrink-0">
                  0{idx + 1}
                </div>
                <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                  {goal}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        4. قسم: ماذا سنستفيد؟ (خلفية متناوبة #2A2A2D)
        ========================================================================
      */}
      <section className="bg-[#2A2A2D] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#444448]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-8">
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-[#333337] border border-[#444448] text-[#D4A24C] text-sm font-semibold mb-3">
                <Award className="w-4 h-4" />
                <span>المكاسب والفوائد الملموسة</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mb-2">
                ماذا سنستفيد من هذا المحور؟
              </h2>
              <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                القيمة المضافة التي ستحدث فرقاً حقيقياً في مستواك التقني والمعرفي.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {axis.gains.map((gain, idx) => (
                <div
                  key={idx}
                  className="p-7 rounded-[12px] bg-[#333337] border border-[#444448] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-[8px] bg-[#2A2A2D] border border-[#444448] flex items-center justify-center mb-5">
                      {getGainIcon(gain.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">
                      {gain.title}
                    </h3>
                    <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                      {gain.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* الوحدة التفاعلية الخاصة بالمحور */}
          <div>{renderInteractiveWidget()}</div>
        </div>
      </section>

      {/* 
        ========================================================================
        5. قسم: ماذا سنعرف في نهاية التكوين؟ + 6. أزرار التنقل (خلفية رئيسية #1C1C1E)
        ========================================================================
      */}
      <section className="bg-[#1C1C1E] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="rounded-[12px] bg-[#333337] border border-[#444448] p-8 sm:p-12 shadow-sm">
            <div className="text-right mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-sm font-semibold mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>مخرجات التعلم والكفايات</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mb-2">
                ماذا سنعرف ونُتقن في نهاية التكوين؟
              </h2>
              <p className="text-[17px] md:text-[18px] text-[#E5E5E7] leading-[1.9] font-normal">
                بنود واضحة وعملية ستكون قادراً على تنفيذها بمفردك بكل ثقة.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {axis.endKnowledge.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-[8px] bg-[#2A2A2D] border border-[#444448] flex items-start gap-3"
                >
                  <div className="mt-1.5 p-1 rounded-[6px] bg-[#333337] border border-[#444448] text-[#D4A24C] shrink-0">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-[17px] md:text-[18px] text-[#E5E5E7] font-normal leading-[1.9]">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#444448] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[17px] text-[#E5E5E7]">
                هل أنت مستعد لخوض هذه التجربة؟ انضم إلينا في حفل الافتتاح يوم السبت!
              </span>
              <button
                type="button"
                onClick={onOpenRegister}
                disabled={!registration.isOpen}
                className="px-6 py-3 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4A24C] text-[#141416] font-bold text-sm sm:text-base cursor-pointer transition-colors"
              >
                {registration.buttonLabel}
              </button>
            </div>
          </div>

          {/* 6. أزرار التنقل السلس: العودة للرئيسية، المحور السابق، المحور التالي */}
          <div className="pt-6 border-t border-[#444448]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* المحور السابق */}
              {prevAxis ? (
                <button
                  type="button"
                  onClick={() => navigateTo(prevAxis.id as PageId)}
                  className="w-full sm:w-auto px-5 py-3 rounded-[8px] bg-[#333337] border border-[#444448] hover:bg-[#3E3E42] text-[#FFFFFF] text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4 text-[#D4A24C]" />
                  <span>المحور السابق: {prevAxis.title}</span>
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}

              {/* العودة للرئيسية */}
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="w-full sm:w-auto px-6 py-3 rounded-[8px] bg-[#2A2A2D] border border-[#444448] hover:bg-[#333337] text-[#FFFFFF] text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4 text-[#D4A24C]" />
                <span>العودة للصفحة الرئيسية</span>
              </button>

              {/* المحور التالي */}
              {nextAxis ? (
                <button
                  type="button"
                  onClick={() => navigateTo(nextAxis.id as PageId)}
                  className="w-full sm:w-auto px-5 py-3 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] text-[#141416] text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>المحور التالي: {nextAxis.title}</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  className="w-full sm:w-auto px-5 py-3 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] text-[#141416] text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>اكتملت المحاور - العودة للرئيسية</span>
                  <Home className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
