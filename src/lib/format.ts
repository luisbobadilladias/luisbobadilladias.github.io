import type { Lang } from './i18n';
import { locales } from './i18n';
import { teaching } from './content';

const tz = teaching.timeZone;

/** "miércoles, 11 de noviembre de 2026" / "Wednesday, November 11, 2026" */
export const longDate = (lang: Lang, d: Date | string) =>
  new Intl.DateTimeFormat(locales[lang], { dateStyle: 'full', timeZone: tz }).format(new Date(d));

/** "11 de noviembre" / "November 11" */
export const dayMonth = (lang: Lang, d: Date | string) =>
  new Intl.DateTimeFormat(locales[lang], { day: 'numeric', month: 'long', timeZone: tz }).format(new Date(d));

/** "11 de noviembre de 2026" / "November 11, 2026" */
export const mediumDate = (lang: Lang, d: Date | string) =>
  new Intl.DateTimeFormat(locales[lang], { dateStyle: 'long', timeZone: tz }).format(new Date(d));

/** Post dates are written as plain dates (2026-11-04), which parse as UTC midnight. */
export const postDate = (lang: Lang, d: Date) =>
  new Intl.DateTimeFormat(locales[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(d);

/** "19:00" / "7:00 PM" */
export const time = (lang: Lang, d: Date | string) =>
  new Intl.DateTimeFormat(locales[lang], {
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: lang === 'es' ? 'h23' : 'h12',
    timeZone: tz,
  }).format(new Date(d));

/** "19:00" stays as is in Spanish, becomes "7:00 PM" in English. */
export const clock = (lang: Lang, hhmm: string) => time(lang, `2026-01-01T${hhmm}:00-03:00`);

/** "Gs. 790.000" / "Gs. 790,000" */
export const guaranies = (lang: Lang, n: number) => `Gs. ${n.toLocaleString(locales[lang])}`;

/** Weekday names from ISO numbers (1 = Monday). */
export const weekdayName = (lang: Lang, n: number) =>
  new Intl.DateTimeFormat(locales[lang], { weekday: 'long', timeZone: 'UTC' }).format(
    new Date(Date.UTC(2024, 0, n)), // 2024-01-01 was a Monday
  );

/** Cohort dates are plain dates in Paraguay time. */
export const pyDate = (ymd: string) => `${ymd}T12:00:00-03:00`;

export const fill = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
