<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const componentMap = {
  language: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TempBox.vue'))
  },
  outlet_logo: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TempBox.vue'))
  },
  retrieve_booking_record: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TempBox.vue'))
  },
  adults: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/NumberField.vue'))
  },
  children: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/NumberField.vue'))
  },
  outlet_name: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },
  date_input: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },
  time: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },
  salutation: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },

  last_name: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },
  first_name: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },
  header: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },

  extra_preference: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },
  contact_type_contact_number: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/NumberField.vue'))
  },
  email: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },
  submit_button: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TempBox.vue'))
  },
  member_subscription: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  },
  special_request: {
    enable: true,
    comp: defineAsyncComponent(() => import('@/components/fieldComponents/TextField.vue'))
  }
}

export type ComponentKeys = keyof typeof componentMap

interface Props {
  element: {
    id: ComponentKeys
  } & { [key: string]: any }
}
const _props = defineProps<Props>()
</script>

<template>
  <component
    v-if="element.id && componentMap[element.id] && componentMap[element.id].enable"
    :is="componentMap[element.id].comp"
    :element="element"
  />
</template>
