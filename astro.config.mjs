// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://luisbobadilladias.github.io',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // Tag listings and the 404 page are noindex, so keep them out of the sitemap.
      filter: (page) => !page.includes('/tags/') && !page.endsWith('/404/'),
    }),
  ],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
