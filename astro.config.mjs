import {defineConfig} from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import {languages, defaultLang} from './src/i18n/ui';

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
        defaultLocale: defaultLang,
        locales: createLocales()
      }
    }),
    svelte()
  ],

  site: 'https://henmalib.dev',
  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});