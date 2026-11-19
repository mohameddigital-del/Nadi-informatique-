/**
 * @file Navbar.tsx
 * شريط التنقل العلوي المثبت باللون الرمادي الداكن (#141416)
 * يشمل روابط الصفحات الخمس، القائمة المتجاوبة للهواتف، وهوية النادي والمؤسسة
 */

import React, { useState } from 'react';
import { Menu, X, Shield, Globe, Code, Brain, Home, UserPlus } from 'lucide-react';
import { SCHOOL_INFO } from '../data/clubData';
import { RegistrationStatusInfo } from '../utils/registrationSchedule';

export type PageId = 'home' | 'cybersecurity' | 'safe-internet' | 'web-development' | 'artificial-intelligence';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
  registration: RegistrationStatusInfo;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenRegister,
  registration,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'الرئيسية', icon: <Home className="w-4 h-4" /> },
    { id: 'cybersecurity', label: 'الأمن السيبراني', icon: <Shield className="w-4 h-4" /> },
    { id: 'safe-internet', label: 'الاستخدام الآمن للإنترنت', icon: <Globe className="w-4 h-4" /> },
    { id: 'web-development', label: 'تطوير المواقع', icon: <Code className="w-4 h-4" /> },
    { id: 'artificial-intelligence', label: 'الذكاء الاصطناعي', icon: <Brain className="w-4 h-4" /> },
  ];

  const handleItemClick = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#141416] border-b border-[#2A2A2D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* شعار المؤسسة واسم النادي */}
          <button
            type="button"
            onClick={() => handleItemClick('home')}
            className="flex items-center gap-3 text-right cursor-pointer focus:outline-none"
          >
            <div className="w-11 h-11 rounded-[8px] bg-[#2A2A2D] border border-[#444448] flex items-center justify-center">
              <Code className="w-5 h-5 text-[#D4A24C]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-[#FFFFFF]">
                {SCHOOL_INFO.clubName}
              </span>
              <span className="text-xs text-[#E5E5E7] font-normal">
                {SCHOOL_INFO.schoolName}
              </span>
            </div>
          </button>

          {/* روابط التصفح لشاشات الحواسيب */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-3.5 py-2 rounded-[8px] text-sm font-semibold transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-[#D4A24C] bg-[#2A2A2D] border border-[#444448]'
                      : 'text-[#E5E5E7] hover:text-[#FFFFFF] hover:bg-[#2A2A2D]'
                  }`}
                >
                  <span className={isActive ? 'text-[#D4A24C]' : 'text-[#E5E5E7]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 right-3 left-3 h-0.5 bg-[#D4A24C]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* زر التسجيل وحجز المقعد في الحفل */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenRegister}
              disabled={!registration.isOpen}
              className="px-4 py-2.5 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4A24C] text-[#141416] font-bold text-sm transition-colors duration-200 flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>{registration.buttonLabel}</span>
            </button>
          </div>

          {/* زر القائمة للهواتف المحمولة */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#E5E5E7] hover:text-[#FFFFFF] focus:outline-none transition-colors cursor-pointer"
              aria-label="فتح القائمة"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#D4A24C]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* القائمة المنسدلة للهواتف */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141416] border-b border-[#444448] px-4 pt-3 pb-6">
          <div className="space-y-1.5 mb-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-[8px] text-base font-medium transition-colors text-right cursor-pointer ${
                    isActive
                      ? 'bg-[#2A2A2D] text-[#D4A24C] border border-[#444448]'
                      : 'text-[#E5E5E7] hover:bg-[#2A2A2D] hover:text-[#FFFFFF]'
                  }`}
                >
                  <span className={isActive ? 'text-[#D4A24C]' : 'text-[#E5E5E7]'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#2A2A2D]">
            <button
              type="button"
              disabled={!registration.isOpen}
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="w-full py-3 rounded-[8px] bg-[#D4A24C] hover:bg-[#E0B25F] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#D4A24C] text-[#141416] font-bold text-center transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-5 h-5" />
              <span>{registration.buttonLabel}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
