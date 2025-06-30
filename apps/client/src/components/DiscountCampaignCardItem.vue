<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import Card from './ui/card/Card.vue'
import { Campaigns } from '../infrastructure/api/campaign/type'
import Badge from '../components/ui/badge/Badge.vue'
import Checkbox from '../components/ui/checkbox/Checkbox.vue'

const props = defineProps({
  campaign: Object as PropType<Campaigns>,
})
const emit = defineEmits<{
  (event: 'select:campaign', campaign: Campaigns): void
}>()

const isCheckCampaign = ref(false)

const campaignType = computed(() => {
  switch (props.campaign?.type) {
    case 'percentage':
      return {
        color: 'bg-blue-100 text-blue-800',
        value: `${props.campaign?.percentage}% off entire cart`,
        badge: 'Coupon',
      }
    case 'fixed':
      return {
        color: 'bg-green-100 text-green-800',
        value: `${props.campaign?.amount} THB off`,
        badge: 'Coupon',
      }
    case 'category_percentage':
      return {
        color: 'bg-orange-100 text-orange-800',
        value: `${props.campaign?.description}`,
        badge: 'On Top',
      }
    case 'point':
      return {
        color: 'bg-purple-100 text-purple-800',
        value: `${props.campaign?.description}`,
        badge: 'On Top',
      }
    case 'seasonal':
      return {
        color: 'bg-red-100 text-red-800',
        value: `${props.campaign?.discount} THB off every ${props.campaign?.every} THB`,
        badge: 'Seasonal',
      }
    default:
      return {
        color: 'bg-gray-100 text-gray-800',
        value: props.campaign?.amount,
        badge: 'Other',
      }
  }
})

const toggleCampaign = (campaign: Campaigns, isCheck: boolean) => {
  isCheckCampaign.value = isCheck
  campaign.active = isCheck
  emit('select:campaign', campaign)
}
</script>

<template>
  <Card
    :class="`p-4 transition-all duration-200 ${
      isCheckCampaign ? 'ring-2 ring-blue-200 bg-blue-50' : 'bg-white'
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
            <span class="text-sm font-medium text-gray-400">
              {{ campaignType?.value }}
            </span>
            <div class="flex items-center space-x-2 mt-2">
              <Badge class="bg-gray-100 text-gray-800">
                {{ campaignType.badge }}
              </Badge>
              <Badge :class="campaignType.color">
                {{ campaign?.type }}
              </Badge>
              <span class="text-xs text-gray-400">
                Priority: {{ campaign?.priority }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #action>
      <Checkbox
        :model-value="isCheckCampaign"
        @update:modelValue="
          toggleCampaign(campaign as Campaigns, $event as boolean)
        "
      />
    </template>
  </Card>
</template>
