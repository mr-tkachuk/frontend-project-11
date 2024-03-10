import i18next from 'i18next';
import ru from '../locales/ru';

const i18n = i18next.createInstance();
i18n.init({
  lng: 'ru',
  resources: { ru },
});

export default i18n;
