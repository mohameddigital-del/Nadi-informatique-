/**
 * @file CountdownTimer.tsx
 * عداد تنازلي تفاعلي حي لفترة التسجيل في حفل افتتاح نادي المعلوميات
 * بتصميم رمادي داكن أنيق ولمسات ذهبية دافئة (#D4A24C)
 */

import React from 'react';
import { useRegistrationSchedule } from '../utils/registrationSchedule';

export const CountdownTimer: React.FC = () => {
  const registration = useRegistrationSchedule();
  const units = [
    { label: 'أيام', value: registration.days },
    { label: 'ساعات', value: registration.hours },
    { label: 'دقائق', value: registration.minutes },
    { label: 'ثواني', value: registration.seconds },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-8">
      <div className="rounded-[12px] bg-[#333337] p-6 md:p-8 border border-[#444448] shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* عنوان بطاقة التسجيل دون عرض أي تاريخ أو وقت */}
          <div className="text-right flex-1">
            <span className="inline-block px-3 py-1 rounded-[8px] bg-[#2A2A2D] border border-[#444448] text-[#D4A24C] text-xs sm:text-sm font-semibold mb-3">
              التسجيل في حفل الافتتاح
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#FFFFFF] mb-2">
              العد التنازلي لفترة التسجيل
            </h3>
            <p className="text-sm md:text-base text-[#E5E5E7] leading-[1.8]">
              احجز مقعدك للحصول على بطاقة الدعوة الرسمية لحضور حفل افتتاح نادي المعلوميات.
            </p>
          </div>

          {/* خانات العداد التنازلي والنص التوضيحي أسفله */}
          <div className="w-full md:w-auto flex flex-col items-center">
            <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full md:w-auto">
              {units.map((unit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-[8px] bg-[#1C1C1E] border border-[#444448] min-w-[70px] sm:min-w-[88px]"
                >
                  <span className="text-2xl sm:text-4xl font-extrabold font-mono tracking-tight text-[#D4A24C]">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs sm:text-sm text-[#E5E5E7] font-normal mt-1">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
            <p
              className={`mt-3 text-xs sm:text-sm font-semibold text-center ${
                registration.status === 'open' ? 'text-[#D4A24C]' : 'text-[#E5E5E7]'
              }`}
            >
              {registration.statusMessage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
