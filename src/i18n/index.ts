import { createI18n } from "vue-i18n";

export const i18n = createI18n({
  locale: localStorage.getItem("locale") as "en" | "ru" || 'en',
  fallbackLocale: "en",
  messages: {
    en: {
      homeTitle: "Your current progress",
      continueLearningButton: "Continue learning",
      backButton: "Back",
      settingsTitle: "Settings",
      poolParamsTitle: "Parameters of learning pool and scoring",
      poolSize: "Letters to learn simultaneosly",
      scoreToLearn: "Scores to learn letter",
      progressTitle: "Progress data",
      progressResetDescription: "Reset all learning progress",
      resetProgressButton: "Reset progress",
      confirmDescription: "This action cannot be reverted",
      cancel: "Cancel",
      resetConfirm: "Reset",
      uppercase: "Uppercase",
      lowercase: "Lowercase",
      language: 'App language',
      correct: 'Correct!',
      wrong: 'Wrong(('
    },
    ru: {
      homeTitle: "Ваш текущий прогресс",
      continueLearningButton: "Продолжить изучение",
      backButton: "Назад",
      settingsTitle: "Настройки",
      poolParamsTitle: "Параметры обучения",
      poolSize: "Букв для одновременного изучения",
      scoreToLearn: 'Очков до "выучено"',
      progressTitle: "Данные",
      progressResetDescription: "Сбросить прогресс изучения",
      resetProgressButton: "Сбросить прогресс",
      confirmDescription: "Это действие нельзя будет отменить",
      cancel: "Отмена",
      resetConfirm: "Сброс",
      uppercase: "Заглавная",
      lowercase: "Строчная",
      language: 'Язык приложения',
      correct: 'Верно!',
      wrong: 'Неверно(('
    },
  },
});

export const changeLocale = (locale: 'en' | 'ru') => {
    i18n.global.locale = locale;
    localStorage.setItem('locale', locale)
}