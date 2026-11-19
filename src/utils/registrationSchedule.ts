/**
 * @file registrationSchedule.ts
 * إدارة جدول ومواعيد فترة التسجيل في حفل الافتتاح بتوقيت الدار البيضاء (Africa/Casablanca)
 * يحسب المدة المتبقية انطلاقاً من الفرق الزمني الحقيقي لساعة النظام لضمان الدقة عند سكون التبويب أو إعادة التحميل
 */

import { useState, useEffect } from 'react';

export type RegistrationStatus = 'before' | 'open' | 'closed';

export interface RegistrationSnapshot {
  status: RegistrationStatus;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  statusMessage: string;
  buttonLabel: string;
  isOpen: boolean;
}

// المدة الإجمالية لفترة التسجيل: 96 ساعة (4 أيام)
export const REGISTRATION_DURATION_MS = 96 * 60 * 60 * 1000;

/**
 * تحويل تاريخ ووقت محلي بتوقيت Africa/Casablanca إلى طابع زمني (Epoch ms) بدقة
 */
function getCasablancaEpochMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
): number {
  try {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Africa/Casablanca',
      numberingSystem: 'latn',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const getOffsetMs = (utcMs: number): number => {
      const parts = formatter.formatToParts(new Date(utcMs));
      const map: Record<string, string> = {};
      for (const part of parts) {
        map[part.type] = part.value;
      }
      const h = map.hour === '24' ? 0 : Number(map.hour);
      const casablancaAsUtc = Date.UTC(
        Number(map.year),
        Number(map.month) - 1,
        Number(map.day),
        h,
        Number(map.minute),
        Number(map.second)
      );
      return casablancaAsUtc - utcMs;
    };

    const targetAsUtc = Date.UTC(year, month - 1, day, hour, minute, second);
    const firstGuess = targetAsUtc - getOffsetMs(targetAsUtc);
    return targetAsUtc - getOffsetMs(firstGuess);
  } catch {
    // توقيت المغرب الدائم في نونبر هو UTC+1
    return Date.UTC(year, month - 1, day, hour - 1, minute, second);
  }
}

// بداية التسجيل: 2026-11-21 الساعة 12:00 بتوقيت Africa/Casablanca
export const REGISTRATION_START_MS = getCasablancaEpochMs(2026, 11, 21, 12, 0, 0);

// نهاية التسجيل: بعد 96 ساعة تماماً (الأربعاء 2026-11-25 الساعة 12:00 بتوقيت Africa/Casablanca)
export const REGISTRATION_END_MS = REGISTRATION_START_MS + REGISTRATION_DURATION_MS;

/**
 * حساب حالة التسجيل والوقت المتبقي من الفرق الزمني الحقيقي للساعة
 */
export function getRegistrationSnapshot(nowMs: number = Date.now()): RegistrationSnapshot {
  if (nowMs < REGISTRATION_START_MS) {
    return {
      status: 'before',
      days: 4,
      hours: 0,
      minutes: 0,
      seconds: 0,
      statusMessage: 'سيبدأ العد التنازلي تلقائيا عند فتح التسجيل',
      buttonLabel: 'التسجيل لم يفتح بعد',
      isOpen: false,
    };
  }

  const remainingMs = REGISTRATION_END_MS - nowMs;

  if (remainingMs <= 0) {
    return {
      status: 'closed',
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      statusMessage: 'انتهت مدة التسجيل',
      buttonLabel: 'التسجيل مغلق',
      isOpen: false,
    };
  }

  const totalSeconds = Math.min(96 * 3600, Math.ceil(remainingMs / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    status: 'open',
    days,
    hours,
    minutes,
    seconds,
    statusMessage: 'التسجيل مفتوح',
    buttonLabel: 'سجل حضورك في الحفل',
    isOpen: true,
  };
}

export interface RegistrationStatusInfo {
  status: RegistrationStatus;
  buttonLabel: string;
  isOpen: boolean;
}

/**
 * استخراج حالة التسجيل المعزولة (قبل / مفتوح / مغلق) لأزرار التسجيل ونموذج التأكيد فقط
 */
export function getRegistrationStatusInfo(nowMs: number = Date.now()): RegistrationStatusInfo {
  const snapshot = getRegistrationSnapshot(nowMs);
  return {
    status: snapshot.status,
    buttonLabel: snapshot.buttonLabel,
    isOpen: snapshot.isOpen,
  };
}

/**
 * خطاف معزول يراقب انتقال مرحلة التسجيل (before / open / closed) فقط لأزرار التسجيل ونموذج التأكيد
 * دون إعادة تصيير المكونات عند كل ثانية
 */
export function useRegistrationStatus(): RegistrationStatusInfo {
  const [statusInfo, setStatusInfo] = useState<RegistrationStatusInfo>(() =>
    getRegistrationStatusInfo(Date.now())
  );

  useEffect(() => {
    const syncStatus = () => {
      const next = getRegistrationStatusInfo(Date.now());
      setStatusInfo((prev) => (prev.status === next.status ? prev : next));
    };

    syncStatus();
    const interval = setInterval(syncStatus, 1000);

    document.addEventListener('visibilitychange', syncStatus);
    window.addEventListener('focus', syncStatus);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', syncStatus);
      window.removeEventListener('focus', syncStatus);
    };
  }, []);

  return statusInfo;
}

/**
 * خطاف React مخصص لبطاقة العد التنازلي يراقب ساعة النظام الحقيقية ويحدث العداد تلقائياً دون إعادة تحميل الصفحة
 */
export function useRegistrationSchedule(): RegistrationSnapshot {
  const [snapshot, setSnapshot] = useState<RegistrationSnapshot>(() =>
    getRegistrationSnapshot(Date.now())
  );

  useEffect(() => {
    const syncSchedule = () => {
      const next = getRegistrationSnapshot(Date.now());
      setSnapshot((prev) => {
        if (
          prev.status === next.status &&
          prev.days === next.days &&
          prev.hours === next.hours &&
          prev.minutes === next.minutes &&
          prev.seconds === next.seconds
        ) {
          return prev;
        }
        return next;
      });
    };

    syncSchedule();
    const interval = setInterval(syncSchedule, 250);

    const handleVisibilityOrFocus = () => {
      syncSchedule();
    };

    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
    };
  }, []);

  return snapshot;
}
