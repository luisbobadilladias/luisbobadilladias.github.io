import type { Lang } from './i18n';
import { routes } from './i18n';
import { site, contact, career } from './content';

const SITE = 'https://luisbobadilladias.github.io';

export function personSchema(lang: Lang) {
  const s = site[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE}/#person`,
    name: s.name,
    jobTitle: s.role,
    url: `${SITE}${routes.home[lang]}`,
    image: `${SITE}/og/luis.jpg`,
    email: `mailto:${contact.email}`,
    worksFor: { '@type': 'Organization', name: 'Plub' },
    address: { '@type': 'PostalAddress', addressLocality: 'Asunción', addressCountry: 'PY' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Kansas State University' },
    knowsLanguage: ['es', 'en', 'pt'],
    knowsAbout: career[lang].skills.flatMap((g) => g.items),
    sameAs: [contact.linkedin, contact.github, contact.instagram].filter(Boolean),
  };
}
