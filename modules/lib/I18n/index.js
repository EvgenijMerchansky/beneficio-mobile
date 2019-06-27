import I18n from 'react-native-i18n';

I18n.fallback = true;
I18n.translations = {
  'en': require('../translations/en.json'),
  'ru': require('../translations/ru.json'),
  'ua': require('../translations/ua.json')
};

export default I18n;
