import {ui, defaultLang} from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslation(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLangFromHeader(header: string | null) {
  if (!header) return defaultLang;

  for (const part of header.split(',')) {
    const lang = part.trim().split(';')[0]?.split('-')[0];
    if (lang && lang in ui) return lang as keyof typeof ui;
  }

  return defaultLang;
}
