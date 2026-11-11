import type { Lang } from './i18n';
import { locales } from './i18n';

/** Post dates are written as plain dates (2026-11-04), which parse as UTC midnight. */
export const postDate = (lang: Lang, d: Date) =>
  new Intl.DateTimeFormat(locales[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(d);
