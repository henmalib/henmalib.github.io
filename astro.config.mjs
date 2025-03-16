import {defineConfig} from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';

export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          uk: 'uk'
        }
      }
    }),
    svelte()
  ],
  site: 'https://henmalib.dev'
});
