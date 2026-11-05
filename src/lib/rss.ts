import rss from '@astrojs/rss';
import type { Lang } from './i18n';
import { postPath, splitId, locales } from './i18n';
import { site, projectsPage, getPosts } from './content';

export async function feed(lang: Lang, siteUrl: URL) {
  const posts = await getPosts(lang);
  return rss({
    title: `${site[lang].name} · ${projectsPage[lang].blogTitle}`,
    description: projectsPage[lang].blogDescription,
    site: siteUrl,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: postPath(lang, splitId(p.id).slug),
      categories: p.data.tags,
    })),
    customData: `<language>${locales[lang].toLowerCase()}</language>`,
  });
}
