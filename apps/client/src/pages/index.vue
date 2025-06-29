<script setup lang="ts">
import ShoppingCardItem from '../components/ShoppingCardItem.vue'
import DiscountCampaignCardItem from '../components/DiscountCampaignCardItem.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import PriceCalculationCard from '../components/PriceCalculationCard.vue'
import type {
  DiscountCampaign as DiscountCampaignType,
  DiscountItem,
  UserPoints,
  PriceCalculation,
} from '../types'
import { ref, onMounted } from 'vue'
import { DiscountEngine } from '../utils/DiscountEngine'

const userPoints = {
  available: 68,
  used: 0,
} as UserPoints

const shoppingCardList = [
  {
    id: '1',
    name: 'T-Shirt',
    category: 'Clothing',
    price: 350,
    quantity: 1,
  },
  {
    id: '2',
    name: 'Hat',
    category: 'Accessories',
    price: 250,
    quantity: 1,
  },
  {
    id: '3',
    name: 'Hoodie',
    category: 'Clothing',
    price: 700,
    quantity: 1,
  },
  {
    id: '4',
    name: 'Watch',
    category: 'Electronics',
    price: 850,
    quantity: 1,
  },
  {
    id: '5',
    name: 'Bag',
    category: 'Accessories',
    price: 640,
    quantity: 1,
  },
]

const discountCampaignCardList = [
  {
    id: '1',
    name: 'Fixed Amount Coupon',
    type: 'fixed',
    value: 50,
    priority: 1,
    active: false,
    description: 'Fixed 50 THB discount on entire cart',
  },
  {
    id: '2',
    name: 'Percentage Discount Coupon',
    type: 'percentage',
    value: 10,
    priority: 2,
    active: false,
    description: '10% off entire cart',
  },
  {
    id: '3',
    name: 'Clothing Category Discount',
    type: 'category',
    value: 15,
    category: 'Clothing',
    priority: 3,
    active: false,
    description: '15% off clothing items',
  },
  {
    id: '4',
    name: 'Points Discount',
    type: 'points',
    value: 0,
    pointsRequired: 68,
    maxDiscountPercent: 20,
    priority: 4,
    active: false,
    description: 'Use 68 points for discount (max 20% of total)',
  },
  {
    id: '5',
    name: 'Special Campaign',
    type: 'special',
    value: 0,
    specialThreshold: 300,
    specialDiscount: 40,
    priority: 5,
    active: false,
    description: '40 THB off for every 300 THB spent',
  },
] as DiscountCampaignType[]

const priceCalculation = ref<PriceCalculation>()

const setPriceDiscount = () => {
  priceCalculation.value = DiscountEngine.calculateFinalPrice(
    shoppingCardList,
    discountCampaignCardList,
    userPoints
  )
}

const selectCampaign = (campaign: DiscountCampaignType): void => {
  discountCampaignCardList.map((campaignItem) => {
    return campaignItem.id === campaign.id
      ? { ...campaign, active: campaign.active }
      : campaign
  })
  setPriceDiscount()
}

onMounted(() => {
  setPriceDiscount()
})
</script>

<template>
  <div class="flex gap-4 flex-col lg:flex-row">
    <div class="w-full">
      <Tabs default-value="cart">
        <TabsList>
          <TabsTrigger value="cart"> 🛍 Shopping cart </TabsTrigger>
          <TabsTrigger value="campaigns"> 🏷 Campaigns </TabsTrigger>
        </TabsList>
        <TabsContent value="cart">
          <div class="flex flex-col gap-2">
            <template
              v-for="(shoppingCard, index) in shoppingCardList"
              :key="index"
            >
              <ShoppingCardItem :shoppingCard="shoppingCard" />
            </template>
          </div>
        </TabsContent>
        <TabsContent value="campaigns">
          <div class="flex flex-col gap-2">
            <template
              v-for="(campaign, index) in discountCampaignCardList"
              :key="index"
            >
              <DiscountCampaignCardItem
                :campaign="campaign"
                @select:campaign="selectCampaign"
              >
              </DiscountCampaignCardItem>
            </template>
          </div>
        </TabsContent>
      </Tabs>
    </div>
    <div class="w-full max-w-[unset] lg:max-w-[400px]">
      <PriceCalculationCard :calculation="priceCalculation" />
    </div>
  </div>
</template>

<style scoped></style>
