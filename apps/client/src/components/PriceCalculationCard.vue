<script setup lang="ts">
import { PropType } from 'vue'
import Card from './ui/card/Card.vue'
import type { PriceCalculation as PriceCalculationType } from '../types'
import Separator from './ui/separator/Separator.vue'

const props = defineProps({
  calculation: Object as PropType<PriceCalculationType>,
})

const groupedDiscounts = props.calculation?.appliedDiscounts.reduce(
  (acc, discount) => {
    if (!acc[discount.campaignName]) {
      acc[discount.campaignName] = 0
    }
    acc[discount.campaignName] += discount.discountAmount
    return acc
  },
  {} as Record<string, number>
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
            {{ calculation?.subtotal?.toFixed(2) || 0 }}</span
          >
        </div>

        <div
          v-for="(item, index) in groupedDiscounts"
          :key="index"
          class="flex justify-between items-center text-green-600"
        >
          <span class="text-sm">{{ item[0] }}</span>
          <span class="font-medium">-{{ item[1].toFixed(2) }}</span>
        </div>

        <div v-if="calculation && calculation?.totalDiscount > 0">
          <Separator />
          <div class="flex justify-between items-center text-green-600">
            <span class="font-medium">Total Savings</span>
            <span class="font-bold"
              >-฿{{ calculation.totalDiscount.toFixed(2) }}</span
            >
          </div>
        </div>

        <Separator />

        <div class="flex justify-between items-center text-lg font-bold">
          <span>Final Total</span>
          <span class="text-blue-600 ml-2">{{
            calculation?.finalTotal?.toFixed(2) || 0
          }}</span>
        </div>

        <div
          v-if="calculation && calculation?.totalDiscount > 0"
          class="text-center p-3 bg-green-100 rounded-lg"
        >
          <p class="text-sm text-green-800 font-medium">
            🎉 You saved {{ calculation?.totalDiscount?.toFixed(2) || 0 }} on
            this order!
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>
