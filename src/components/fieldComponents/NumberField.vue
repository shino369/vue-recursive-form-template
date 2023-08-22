<script setup lang="ts">
import { useFormStore } from '@/stores/formStore'
import { useLocaleStore } from '@/stores/localeStore';
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { fieldBind } = useFormStore()
const { errors } = storeToRefs(useFormStore())
// const reactiveBind = computed(() => fieldBind[props.element.id as any])

interface Props {
  element: {
    id: keyof typeof errors
  } & { [key: string]: any }
}

const props = defineProps<Props>()

// watch(
//   () => values,
//   (next, _prev) => {
//     console.log(next)
//   },
//   {
//     deep: true
//   }
// )
const { locale } = storeToRefs(useLocaleStore())
</script>
<template>
  <div class="wrapper tms-m-2 tms-border-blue-50 tms-border-2"></div>
  <input type="number" v-bind="fieldBind[element.id as keyof typeof fieldBind]" :placeholder="element[`name_l${locale.LangKey}`]" />
  <div class="tms-text-red-500">{{ errors[element.id as keyof typeof errors] }}</div>
</template>
