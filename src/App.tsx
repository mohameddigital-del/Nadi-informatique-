/**
 * @file App.tsx
 * المكون الرئيسي لموقع نادي المعلوميات - ثانوية الرازي الاعدادية
 * يدير الصفحات الخمس، وحالة التصفح، ونافذة تسجيل الحضور بالنمط الرمادي الداكن الموحد
 */

import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { AxisView } from './components/AxisView';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { CLUB_AXES } from './data/clubData';
import { ArrowUp } from 'lucide-react';
import { useRegistrationStatus, getRegistrationSnapshot } from './utils/registrationSchedule';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const registration = useRegistrationStatus();

  // مزامنة حالة التصفح مع الـ URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home',
        'cybersecurity',
        'safe-internet',
        'web-development',
        'artificial-intelligence',
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // مراقبة التمرير لإظهار زر الصعود لأعلى
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // دالة التنقل بين الصفحات
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenRegister = () => {
    if (getRegistrationSnapshot(Date.now()).isOpen) {
      setIsRegisterOpen(true);
    }
  };

  const currentAxis = CLUB_AXES.find((axis) => axis.id === currentPage);

  return (
    <div className="min-h-screen bg-[#1C1C1E] text-[#E5E5E7] flex flex-col justify-between selection:bg-[#D4A24C] selection:text-[#141416] font-sans antialiased">
      {/* شريط التنقل العلوي المثبت */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenRegister={handleOpenRegister}
        registration={registration}
      />

      {/* المحتوى الرئيسي للصفحة */}
      <main className="flex-1 w-full">
        {currentPage === 'home' || !currentAxis ? (
          <HomeView
            onNavigate={handleNavigate}
            onOpenRegister={handleOpenRegister}
            registration={registration}
          />
        ) : (
          <AxisView
            axis={currentAxis}
            onNavigate={handleNavigate}
            onOpenRegister={handleOpenRegister}
            registration={registration}
          />
        )}
      </main>

      {/* تذييل الموقع */}
      <Footer onNavigate={handleNavigate} />

      {/* نافذة تسجيل الحضور وتوليد بطاقة الدعوة */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        registration={registration}
      />

      {/* زر الصعود لأعلى الصفحة */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3 rounded-[8px] bg-[#333337] border border-[#444448] text-[#D4A24C] hover:bg-[#D4A24C] hover:text-[#141416] shadow-sm transition-colors duration-200 cursor-pointer"
          aria-label="الرجوع إلى أعلى الصفحة"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
