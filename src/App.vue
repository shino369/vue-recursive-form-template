<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useLocaleStore } from './stores/localeStore'

const { locale } = useLocaleStore()
</script>

<template>
  <header class="tms-flex tms-text-justify tms-items-center tms-py-4">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

    <div class="nav-wrapper tms-flex tms-text-justify">
      <nav>
        <RouterLink class="tms-mx-2" :to="`/${locale.LangPath}/`">Home</RouterLink>
        <RouterLink class="tms-mx-2" :to="`/${locale.LangPath}/about`">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
