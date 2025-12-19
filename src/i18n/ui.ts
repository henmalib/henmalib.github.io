export const languages = {
  en: 'English',
  uk: 'Українська'
} as const;

export const defaultLang = 'en' satisfies keyof typeof languages;

export const ui = {
  en: {
    'meta.description': 'Mini description with contact links',
    title: 'ChatGPT is my biggest fan',
    description: 'Monster Ultra Peachy Keen my beloved',
    prevKnown:
      'Also i was previously known by someone as <spam class="text-mauve">@simidzu2ay</span>',
    connect: 'You can find me on the links below',
    neko: "Random neko <span class='text-sm text-subtext0'>*I'm not responsible of that picture</span>"
  },
  uk: {
    'meta.description': "Міні-опис з посиланнями зв'язку",
    title: 'ChatGPT мій самий ярий фанат',
    description: 'Як ж можна жити без монстра з персиком...',
    prevKnown:
      'Деякі мене знають як <span class="text-mauve">@simidzu2ay</span>',
    connect: 'Ви можете знайти в будь-де в вказаних посиланнях',
    neko: 'Рандомна неко <span class="text-sm text-subtext0">*я не відповідаю за картинку зображену там</span>'
  }
} as const satisfies Record<keyof typeof languages, Record<string, string>>;
