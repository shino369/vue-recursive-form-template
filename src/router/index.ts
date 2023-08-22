import { RouterView, createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import i18n, { SUPPORT_LOCALES, setI18nLanguage } from '@/i18n'
import { useLocaleStore, type LangPath } from '@/stores/localeStore'

const defaultLocale = 'eng'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:locale?',
      component: RouterView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        }
      ]
    }, {
      path: '/',
      redirect: '/:locale'
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const paramsLocale = to.params.locale as string

  // use locale if paramsLocale is not in SUPPORT_LOCALES
  if (!SUPPORT_LOCALES.includes(paramsLocale)) {
    return next(`/${defaultLocale}`)
  }

  // not sure yet
  // load locale messages
  // if (!i18n.global.availableLocales.includes(paramsLocale)) {
  //   await loadLocaleMessages(i18n, paramsLocale)
  // }

  // set i18n language
  setI18nLanguage(i18n, paramsLocale)
  useLocaleStore().setLocale(paramsLocale as LangPath)

  return next()
})

export default router
