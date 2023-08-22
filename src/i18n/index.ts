import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import messages from '@intlify/unplugin-vue-i18n/messages'

export const SUPPORT_LOCALES = ['eng', 'chi', 'cn', 'jpn', 'kor']
type Locales = string // (typeof SUPPORT_LOCALES)[number]

export const setupI18n = () => {
  console.log(messages)
  const i18n_options = {
    locale: import.meta.env.VITE_DEFAULT_LOCALE, // default eng
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false, // false to use composition API
    globalInjection: true,
    availableLocales: SUPPORT_LOCALES,
    messages: messages
  }

  const i18n = createI18n(i18n_options)
  setI18nLanguage(i18n, i18n_options.locale)
  return i18n
}

export function setI18nLanguage(i18n: i18n_type, locale: Locales) {
  i18n.global.locale.value = locale
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  const html = document.querySelector('html')
  html && html.setAttribute('lang', locale)
}

// export async function loadLocaleMessages(i18n: i18n_type, locale: Locales) {
//   // load locale messages with dynamic import
//   const messages = await import(
//     /* webpackChunkName: "locale-[request]" */ `./locales/${locale}.json`
//   )

//   // set locale and locale message
//   i18n.global.setLocaleMessage(locale, messages.default)

//   return nextTick()
// }

const i18n = setupI18n()
type i18n_type = typeof i18n
export default i18n
