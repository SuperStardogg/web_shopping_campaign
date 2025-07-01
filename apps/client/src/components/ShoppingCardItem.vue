<script setup lang="ts">
import { PropType } from 'vue'
import Card from './ui/card/Card.vue'
import type { CartItem as CartItemType } from '../types/shoppingCard'

defineProps({
  shoppingCard: Object as PropType<CartItemType>,
})
</script>

<template>
  <Card>
    <template #content>
      <div class="flex gap-2 items-center">
        <div
          class="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center"
        >
          <span class="text-blue-600 font-semibold text-lg">
            {{ shoppingCard?.name.charAt(0) }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <div class="font-bold">name: {{ shoppingCard?.name }}</div>
          <div>category: {{ shoppingCard?.category }}</div>
          <div>price: {{ shoppingCard?.price }}</div>
        </div>
      </div>
    </template>
    <template #action>
      <button class="bg-white">🗑</button>
    </template>
  </Card>
</template>
