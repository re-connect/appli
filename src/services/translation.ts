import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import al from '../translations/al';
import ar from '../translations/ar';
import de from '../translations/de';
import es from '../translations/es';
import fr from '../translations/fr';
import gb from '../translations/gb';
import it from '../translations/it';
import prs from '../translations/prs';
import ps from '../translations/ps';
import pt from '../translations/pt';
import ro from '../translations/ro';
import ru from '../translations/ru';
import ua from '../translations/ua';
import et from '../translations/et';

export interface Language {
  code: string;
  // BCP 47 tag for screen readers (app codes are not all valid language tags)
  bcp47: string;
  flag: string;
  name: string;
}

const resources = {
  fr: { translation: fr },
  gb: { translation: gb },
  es: { translation: es },
  ar: { translation: ar },
  it: { translation: it },
  de: { translation: de },
  ru: { translation: ru },
  ro: { translation: ro },
  ps: { translation: ps },
  al: { translation: al },
  pt: { translation: pt },
  ua: { translation: ua },
  prs: { translation: prs },
  et: { translation: et },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    initImmediate: true,
    resources,
    lng: 'gb',
    keySeparator: false,
    fallbackLng: 'gb',
    interpolation: {
      escapeValue: false,
    },
  });

export const allLanguages: Language[] = [
  { code: 'fr', bcp47: 'fr', flag: 'FR', name: 'Français' },
  { code: 'gb', bcp47: 'en', flag: 'GB', name: 'English' },
  { code: 'es', bcp47: 'es', flag: 'ES', name: 'Español' },
  { code: 'ar', bcp47: 'ar', flag: 'AR', name: 'عرب' },
  { code: 'ro', bcp47: 'ro', flag: 'RO', name: 'Română' },
  { code: 'ru', bcp47: 'ru', flag: 'RU', name: 'русский' },
  { code: 'de', bcp47: 'de', flag: 'DE', name: 'Deutsch' },
  { code: 'ua', bcp47: 'uk', flag: 'UA', name: 'український' },
  { code: 'pt', bcp47: 'pt', flag: 'PT', name: 'Português' },
  { code: 'al', bcp47: 'sq', flag: 'AL', name: 'shqiptare' },
  { code: 'it', bcp47: 'it', flag: 'IT', name: 'Italiano' },
  { code: 'ps', bcp47: 'ps', flag: 'AF', name: 'پښتو' },
  { code: 'prs', bcp47: 'prs', flag: 'AF', name: 'دری' },
  { code: 'et', bcp47: 'ti', flag: 'ET', name: 'ትግርኛ' },
];

export default i18n;
