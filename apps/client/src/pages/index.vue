<script setup lang="ts">
import ShoppingCardItem from '../components/ShoppingCardItem.vue'
import DiscountCampaignCardItem from '../components/DiscountCampaignCardItem.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import PriceCalculationCard from '../components/PriceCalculationCard.vue'
import type { UserPoints } from '../types'
import { ref, onMounted } from 'vue'
import { getAllProductsApi } from '../infrastructure/api/product'
import { Products } from '../infrastructure/api/product/type'
import {
  Campaigns,
  CampaignsCalculationResponse,
} from '../infrastructure/api/campaign/type'
import {
  calculateDiscountCampaignApi,
  getAllCampaignsApi,
} from '../infrastructure/api/campaign'

const userPoints = {
  available: 68,
  used: 0,
} as UserPoints

const cartItems = ref<Products[]>()
const campaignList = ref<Campaigns[]>()
const calculationDiscount = ref<CampaignsCalculationResponse>()

const setPriceDiscount = async (data) => {
  try {
    const response = await calculateDiscountCampaignApi(data)
    calculationDiscount.value = (response as unknown) as CampaignsCalculationResponse
  } catch (error) {
    return Promise.reject(error)
  }
}

const fetchProducts = async (): Promise<void> => {
  try {
    const response = await getAllProductsApi()
    cartItems.value = (response as unknown) as Products[]
  } catch (error) {
    return Promise.reject(error)
  }
}

const fetchCampaign = async (): Promise<void> => {
  try {
    const response = await getAllCampaignsApi()
    campaignList.value = (response as unknown) as Campaigns[]
  } catch (error) {
    return Promise.reject(error)
  }
}

const selectCampaign = (campaign: Campaigns): void => {
  if (!campaignList?.value) return
  const activeCampaign = campaignList.value.filter((campaignItem) => {
    return campaignItem.active
  })
  setPriceDiscount({ items: cartItems.value, campaigns: activeCampaign })
}

onMounted(() => {
  fetchProducts()
  fetchCampaign()
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
          <div v-if="cartItems?.length" class="flex flex-col gap-2">
            <template v-for="(shoppingCard, index) in cartItems" :key="index">
              <ShoppingCardItem :shoppingCard="shoppingCard" />
            </template>
          </div>
        </TabsContent>
        <TabsContent value="campaigns">
          <div v-if="campaignList?.length" class="flex flex-col gap-2">
            <template v-for="(campaign, index) in campaignList" :key="index">
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
      <PriceCalculationCard :calculation="calculationDiscount" />
    </div>
  </div>
</template>

<style scoped></style>
