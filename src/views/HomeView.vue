<script setup lang="ts">
import { fetchAPI } from '@/utils/apiInstance'
import { computed, ref, watch } from 'vue'
import RecursiveSectionVue from '@/components/RecursiveSection.vue'
import { useFormStore } from '@/stores/formStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useLocaleStore, type LangPath } from '@/stores/localeStore'
import { SUPPORT_LOCALES } from '@/i18n'
import { tempRes } from '@/assets/tempRespose'

// const { data } = fetchAPI('online_reservation_init_setting', {
//   outletId: 2,
//   resvId: '893e0ced-0726-4e63-9447-286929c0c370',
//   langPath: 'eng',
//   langKey: 1,
//   resetCount: 0,
//   url: '', // useless but need
//   action: ''
// })

const data = tempRes
console.log(data)
const { t } = useI18n()

const setting = ref<Record<string, any>>(JSON.parse((data as any).data))
const formSection = computed(() => setting.value?.tempFormSection?.sections)

// watch(
//   () => data.value,
//   (next, _prev) => {
//     setting.value = JSON.parse(JSON.parse(next as any).data)
//     console.log(setting.value)
//   },
//   {
//     immediate: true
//   }
// )

const { onSubmit } = useFormStore()
const { errors, fieldBind, values } = storeToRefs(useFormStore())

// watch(
//   () => reactiveErrors.value,
//   (next, _prev) => {
//     console.log(next)
//   },
//   {
//     deep: true
//   }
// )

const { pushLocale } = useLocaleStore()
const { locale } = storeToRefs(useLocaleStore())

const switchLocale = (e: Event) => {
  const loc = (e.target as HTMLSelectElement).value as LangPath
  pushLocale(loc)
}
</script>

<template>
  <main class="tms-w-full">
    <form @submit="onSubmit" class="tms-bg-slate-200 tms-p-4 tms-relative">
      <!-- display form json -->
      <div class="tms-sticky tms-top-0 tms-opacity-70 tms-bg-cyan-900">
        <pre class="tms-p-2 tms-text-white">
          {{ JSON.stringify(values, undefined, 2) }}
        </pre>
        <pre class="tms-text-red-100"> {{ errors }} </pre>
      </div>
      <div>test locale: {{ t('hello') }}</div>
      <div>test locale: {{ t('greeting') }}</div>
      <div>locale store: {{ JSON.stringify(locale) }}</div>
      <div>
        <select @change="switchLocale">
          <option
            v-for="lo in SUPPORT_LOCALES"
            v-bind:value="lo"
            :key="lo"
            :selected="locale.LangPath === lo"
          >
            {{ lo }}
          </option>
        </select>
      </div>
      <RecursiveSectionVue :sub-layout="formSection" />
    </form>
  </main>
</template>
