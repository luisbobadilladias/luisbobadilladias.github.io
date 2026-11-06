export type Lang = 'es' | 'en';
export const langs: Lang[] = ['es', 'en'];
export const defaultLang: Lang = 'es';

/** Every page exists in both languages. The ES/EN toggle and hreflang tags use this map. */
export const routes = {
  home: { es: '/', en: '/en/' },
  career: { es: '/carrera/', en: '/en/career/' },
  consulting: { es: '/consultoria/', en: '/en/consulting/' },
  teaching: { es: '/ensenanza/', en: '/en/teaching/' },
  projects: { es: '/proyectos/', en: '/en/projects/' },
} as const;

export type RouteKey = keyof typeof routes;
export const navKeys: RouteKey[] = ['career', 'consulting', 'teaching', 'projects'];

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');

export const locales: Record<Lang, string> = { es: 'es-PY', en: 'en-US' };

/** "es/projects/my-project" -> { lang: "es", slug: "my-post" } */
export function splitId(id: string) {
  const parts = id.split('/');
  return { lang: parts[0] as Lang, slug: parts[parts.length - 1] };
}
