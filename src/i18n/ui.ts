export const languages = {
  en: 'English',
  uk: 'Українська'
};

export const defaultLang = 'en' satisfies keyof typeof languages;

export const ui = {
  en: {
    'meta.description': 'Mini description with contact links',
    title: "I don't know what to write here, but i want a gradient",
    description:
      "I am 19yo self-taught programmer from the Luhansk region of Ukraine. I like listening to <a class='text-mauve hover:animate-pulse' href='https://en.wikipedia.org/wiki/Breakcore'>breakcore</a>, playing story games, and developing small useful utilities for myself.",
    prevKnown:
      'Also i was previously known by someone as <spam class="text-mauve">@simidzu2ay</span>',
    connect: 'You can find me on the links below',
    neko: "Random neko <span class='text-sm text-subtext0'>*I'm not responsible of that picture</span>"
  },
  uk: {
    'meta.description': "Міні-опис з посиланнями зв'язку",
    title: 'Я не знаю що тут писати, але хочу градієнт',
    description:
      "Я - 19 річний самоучка-програміст з Луганської області в Україні. Я люблю слухати <a class='text-mauve hover:animate-pulse' href='https://uk.wikipedia.org/wiki/%D0%91%D1%80%D0%B5%D0%B9%D0%BA%D0%BA%D0%BE%D1%80'>breakcore</a>, грати в сюжетні ігри та розробляти маленькі корисні утіліти для себе",
    prevKnown:
      'Деякі мене знають як <span class="text-mauve">@simidzu2ay</span>',
    connect: 'Ви можете знайти в будь-де в вказаних посиланнях',
    neko: 'Рандомна неко <span class="text-sm text-subtext0">*я не відповідаю за картинку зображену там</span>'
  }
} as const;
