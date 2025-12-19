import {defineConfig} from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';
import {languages, defaultLocale} from './src/i18n/ui';

const createLocales = () => {
  const locales = {};

  for (const key of Object.keys(languages)) {
    locales[key] = key;
  }

  return locales;
};

export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    sitemap({
      i18n: {
        defaultLocale,
        locales: createLocales()
      }
    }),
    svelte()
  ],
  site: 'https://henmalib.dev',

  server: {
    host: true,
    allowedHosts: ['qa.example.com']
  }
});
