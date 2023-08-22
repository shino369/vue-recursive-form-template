<script setup lang="ts">
import FieldMapper from './FieldMapper.vue'

interface Props {
  subLayout: any
}
defineProps<Props>()
</script>
<template>
  <div>
    <!-- {{ JSON.stringify(subLayout, null, 2) }} -->
    <div
      v-if="
        subLayout?.sections && Array.isArray(subLayout.sections) && subLayout.sections.length > 0
      "
    >
      <!-- still have child sections -->
      <div
        class="tms-flex tms-flex-wrap lg:tms-flex-nowrap tms-overflow-auto"
        :class="{
          'tms-flex-col':
            subLayout?.params?.flexDirection === 'column' || !subLayout?.params?.flexDirection
        }"
      >
        <div v-for="(section, index) in subLayout.sections" :key="index">
          <RecursiveSection :sub-layout="section" />
        </div>
      </div>
    </div>

    <div
      v-if="
        subLayout?.elements && Array.isArray(subLayout.elements) && subLayout.elements.length > 0
      "
      class="tms-p-2 tms-shadow-xl tms-m-2 tms-flex tms-rounded-xl tms-bg-white"
      :class="{
        'tms-flex-col':
          subLayout?.params?.flexDirection === 'column' || !subLayout?.params?.flexDirection,
        'tms-flex-wrap': !(
          subLayout?.params?.flexDirection === 'column' || !subLayout?.params?.flexDirection
        ),
        'lg:tms-flex-nowrap': true
      }"
    >
      <div
        v-for="(element, index) in subLayout.elements"
        :key="index"
        class="tms-bg-slate-200 tms-rounded-xl tms-max-w-lg tms-p-2 tms-m-4"
        :class="{
          'tms-self-start': element?.params?.alignment?.value === 'l',
          'tms-self-end': element?.params?.alignment?.value === 'r',
          'tms-self-center': !element?.params?.alignment?.value
        }"
      >
        {{ JSON.stringify(element, null, 2) }}
        <!-- test input-->
        <FieldMapper :element="element" />
      </div>
    </div>
  </div>
</template>
