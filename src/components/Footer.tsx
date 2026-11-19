/**
 * @file Footer.tsx
 * تذييل الموقع باللون الرمادي الداكن جداً (#141416) وبنصوص عربية 100%
 * يتكون من 3 أعمدة متوازنة ومتساوية المسافات
 */

import React from 'react';
import { Code, MapPin, Calendar, Clock } from 'lucide-react';
import { SCHOOL_INFO, CLUB_AXES } from '../data/clubData';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handlePageClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#141416] border-t border-[#2A2A2D] pt-16 pb-12 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 mb-12">
          {/* العمود 1: هوية النادي والمؤسسة */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[8px] bg-[#2A2A2D] border border-[#444448] flex items-center justify-center">
                <Code className="w-5 h-5 text-[#D4A24C]" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#FFFFFF]">{SCHOOL_INFO.clubName}</h4>
                <p className="text-xs text-[#E5E5E7]">{SCHOOL_INFO.schoolName}</p>
              </div>
            </div>

            <p className="text-[17px] text-[#E5E5E7] leading-[1.9] font-normal">
              {SCHOOL_INFO.slogan}. فضاء تربوي تفاعلي يسعى لبناء جيل من المبتكرين والمبرمجين الواعين في عالم التكنولوجيا الحديثة.
            </p>

            <div className="text-sm text-[#D4A24C] font-semibold pt-1">
              {SCHOOL_INFO.academicYear}
            </div>
          </div>

          {/* العمود 2: صفحات ومحاور النادي */}
          <div>
            <h5 className="text-base font-bold text-[#FFFFFF] mb-4 border-b border-[#2A2A2D] pb-2">
              محاور النادي الرسمية
            </h5>
            <ul className="space-y-3 text-[17px]">
              <li>
                <button
                  type="button"
                  onClick={() => handlePageClick('home')}
                  className="text-[#E5E5E7] hover:text-[#D4A24C] transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24C]" />
                  <span>الرئيسية</span>
                </button>
              </li>
              {CLUB_AXES.map((axis) => (
                <li key={axis.id}>
                  <button
                    type="button"
                    onClick={() => handlePageClick(axis.id as PageId)}
                    className="text-[#E5E5E7] hover:text-[#D4A24C] transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A24C]" />
                    <span>{axis.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود 3: حفل الافتتاح */}
          <div>
            <h5 className="text-base font-bold text-[#FFFFFF] mb-4 border-b border-[#2A2A2D] pb-2">
              موعد حفل الافتتاح
            </h5>
            <div className="space-y-3 text-[17px] text-[#E5E5E7] leading-[1.9]">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-[#D4A24C] shrink-0 mt-2" />
                <span>{SCHOOL_INFO.ceremonyDate}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4A24C] shrink-0 mt-2" />
                <span>{SCHOOL_INFO.ceremonyTime}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A24C] shrink-0 mt-2" />
                <span>{SCHOOL_INFO.ceremonyLocation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* سطر حقوق النشر والتأليف المدرسي */}
        <div className="pt-8 border-t border-[#2A2A2D] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#E5E5E7]">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {SCHOOL_INFO.clubName} - {SCHOOL_INFO.schoolName}
          </div>
          <div>
            صُنع لخدمة تلميذات وتلاميذ ثانوية الرازي الاعدادية
          </div>
        </div>
      </div>
    </footer>
  );
};
