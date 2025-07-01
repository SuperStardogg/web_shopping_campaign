<script setup>
import TheApp from './components/templates/TheApp.vue'
import Toaster from './components/ui/toast/Toaster.vue'
</script>

<template>
  <TheApp>
    <Toaster />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </TheApp>
</template>

<style scoped></style>
