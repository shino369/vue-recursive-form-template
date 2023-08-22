import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import i18n, { setI18nLanguage } from '@/i18n'

type LangKey = '1' | '2' | '3' | '4' | '5'
export type LangPath = 'eng' | 'chi' | 'cn' | 'jpn' | 'kor'
const KeyMap: {
  [key in LangPath]: LangKey
} = {
  eng: '1',
  chi: '2',
  cn: '3',
  jpn: '4',
  kor: '5'
}
export const useLocaleStore = defineStore('localeStore', () => {
  const router = useRouter()
  const locale = ref<{
    LangKey: LangKey
    LangPath: LangPath
  }>({
    LangKey: '1',
    LangPath: 'eng'
  })

  const setLocale = (path: LangPath) => {
    try {
      if (KeyMap[path]) {
        locale.value = {
          LangKey: KeyMap[path],
          LangPath: path
        }
      }
    } catch (error) {
      console.log(error)
      // maybe show a error toast
    }
  }

  const pushLocale = async (path: LangPath) => {
    try {
      await router.replace({ params: { locale: path } })
      setI18nLanguage(i18n, path)
    } catch (e) {
      console.log(e)
    }
  }

  return { locale, setLocale, pushLocale }
})
