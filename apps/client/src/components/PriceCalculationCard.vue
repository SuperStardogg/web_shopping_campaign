<script setup lang="ts">
import { computed, PropType } from 'vue'
import Card from './ui/card/Card.vue'
import Separator from './ui/separator/Separator.vue'
import { CampaignsCalculationResponse } from '../infrastructure/api/campaign/type'

const props = defineProps({
  calculation: Object as PropType<CampaignsCalculationResponse>,
})

const priceBeforeDiscount = computed((): number => {
  if (!props.calculation?.categoryPrice) return 0
  return Object.values(props.calculation?.categoryPrice as {}).reduce(
    (sum: number, val: any) => sum + val,
    0
  )
})
const priceSaving = computed(
  (): number => priceBeforeDiscount.value - (props.calculation?.finalPrice || 0)
)
</script>

<template>
  <Card class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-w-[120px]">
    <template #title>
      <span class="font-bold text-lg"> Price Breakdown</span>
    </template>
    <template #content>
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Subtotal</span>
          <span class="font-medium">
            {{ priceBeforeDiscount?.toFixed(2) || 0 }}</span
          >
        </div>

        <div v-if="priceSaving > 0">
          <Separator />
          <div class="flex justify-between items-center text-green-600">
            <span class="font-medium">Total Savings</span>
            <span class="font-bold">-฿{{ priceSaving.toFixed(2) }}</span>
          </div>
        </div>

        <Separator />

        <div class="flex justify-between items-center text-lg font-bold">
          <span>Final Total</span>
          <span class="text-blue-600 ml-2">{{
            calculation?.finalPrice?.toFixed(2) || 0
          }}</span>
        </div>

        <div
          v-if="priceSaving > 0"
          class="text-center p-3 bg-green-100 rounded-lg"
        >
          <p class="text-sm text-green-800 font-medium">
            🎉 You saved {{ priceSaving?.toFixed(2) || 0 }} on this order!
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>
