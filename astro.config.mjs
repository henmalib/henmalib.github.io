import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		icon(),
		sitemap({
			i18n: {
				defaultLocale: "en",
				locales: {
					en: "en",
					uk: "uk",
				},
			},
		}),
	],
	site: "https://henmalib.dev",
});
