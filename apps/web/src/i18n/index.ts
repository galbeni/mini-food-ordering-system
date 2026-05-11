import { en } from "./en";
import { hu } from "./hu";

export const dictionaries = {
  en,
  hu,
} as const;

export type Locale = keyof typeof dictionaries;

export const defaultLocale: Locale = "en";

export const getDictionary = (locale: Locale = defaultLocale) => {
  return dictionaries[locale];
};

export const t = getDictionary(defaultLocale);
