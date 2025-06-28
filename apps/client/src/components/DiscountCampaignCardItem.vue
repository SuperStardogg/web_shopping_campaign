<script setup lang="ts">
import { PropType } from 'vue'
import Card from './ui/card/Card.vue'
import type { DiscountCampaign as DiscountCampaignType } from '../types/campaign'
import Badge from '../components/ui/badge/Badge.vue'

const props = defineProps({
  campaign: Object as PropType<DiscountCampaignType>,
})

const getTypeColor = (type: string) => {
  switch (type) {
    case 'percentage':
      return 'bg-blue-100 text-blue-800'
    case 'fixed':
      return 'bg-green-100 text-green-800'
    case 'category':
      return 'bg-orange-100 text-orange-800'
    case 'points':
      return 'bg-purple-100 text-purple-800'
    case 'special':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getValueDisplay = () => {
  switch (props.campaign?.type) {
    case 'percentage':
      return `${props.campaign?.value}% off entire cart`
    case 'fixed':
      return `${props.campaign?.value} THB off`
    case 'category':
      return `${props.campaign?.value}% off ${props.campaign?.category}`
    case 'points':
      return `Use ${props.campaign?.pointsRequired} points (max ${props.campaign?.maxDiscountPercent}%)`
    case 'special':
      return `${props.campaign?.specialDiscount} THB off every ${props.campaign?.specialThreshold} THB`
    default:
      return props.campaign?.value
  }
}

const getCategoryBadge = () => {
  switch (props.campaign?.type) {
    case 'fixed':
    case 'percentage':
      return 'Coupon'
    case 'category':
    case 'points':
      return 'On Top'
    case 'special':
      return 'Seasonal'
    default:
      return 'Other'
  }
}
</script>

<template>
  <Card
    :class="`p-4 transition-all duration-200 ${
      campaign?.active ? 'ring-2 ring-blue-200 bg-blue-50' : 'bg-white'
    }`"
  >
    <template #content>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div
            class="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"
          >
            <div class="text-3xl">%</div>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900">{{ campaign?.name }}</h3>
            <p class="text-sm text-gray-500">{{ campaign?.description }}</p>
            <div class="flex items-center space-x-2 mt-2">
              <Badge class="bg-gray-100 text-gray-800">
                {{ getCategoryBadge() }}
              </Badge>
              <Badge :class="getTypeColor(campaign.type)">
                {{ campaign?.type }}
              </Badge>
              <span class="text-sm font-medium text-gray-700">
                {{ getValueDisplay() }}
              </span>
              <span class="text-xs text-gray-400">
                Priority: {{ campaign?.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #action>
      <slot name="action" v-bind="campaign"></slot>
    </template>
  </Card>
</template>
