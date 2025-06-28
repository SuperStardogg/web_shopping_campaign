<script setup>
import TheApp from './components/templates/TheApp.vue'
</script>

<template>
  <TheApp>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </TheApp>
</template>

<style scoped></style>
