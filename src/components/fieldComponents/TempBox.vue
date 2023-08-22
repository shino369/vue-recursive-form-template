<script setup lang="ts">
import { useFormStore } from '@/stores/formStore'
import { useLocaleStore } from '@/stores/localeStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue'

interface Props {
  element: {
    id: string
  } & { [key: string]: any }
}

const props = defineProps<Props>()


const { fieldBind, errors } = useFormStore()
const reactiveState = computed(() => ({
  fieldBind,
  errors
}))
const { locale } = storeToRefs(useLocaleStore())

</script>
<template>
  <div class="wrapper tms-m-2 tms-border-blue-50 tms-border-2 tms-flex tms-h-20 tms-bg-zinc-300 tms-justify-center tms-items-center">
    <div>{{ element[`name_l${locale.LangKey}`] }}</div>
  </div>
</template>
