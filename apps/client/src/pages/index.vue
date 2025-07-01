<script setup lang="ts">
import ShoppingCardItem from '../components/ShoppingCardItem.vue'
import DiscountCampaignCardItem from '../components/DiscountCampaignCardItem.vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import PriceCalculationCard from '../components/PriceCalculationCard.vue'
import type { CartItem, UserPoints } from '../types'
import { ref, onMounted, watch } from 'vue'
import { getAllProductsApi } from '../infrastructure/api/product'
import { Products } from '../infrastructure/api/product/type'
import {
  Campaigns,
  CampaignsCalculationResponse,
  CampaignsRequestBody,
} from '../infrastructure/api/campaign/type'
import {
  calculateDiscountCampaignApi,
  getAllCampaignsApi,
} from '../infrastructure/api/campaign'
import { useToast } from '../hooks/use-toast'

const userPoints = {
  available: 68,
  used: 0,
} as UserPoints

const { toast } = useToast()
const cartItems = ref<Products[]>()
const campaignList = ref<Campaigns[]>()
const calculationDiscount = ref<CampaignsCalculationResponse>()

const setPriceDiscount = async (targetCampaign?) => {
  try {
    const data = {
      items: cartItems.value,
      campaigns: findActiveCampaign(),
    } as CampaignsRequestBody
    const response = await calculateDiscountCampaignApi(data)
    calculationDiscount.value = (response as unknown) as CampaignsCalculationResponse
  } catch (error) {
    if (targetCampaign) setTargetCampaign(targetCampaign, false)
    toast({
      title: '⚠️',
      variant: 'destructive',
      description: (error as any).message,
      class: '!bg-orange-100',
    })
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

const removeItem = (cart: CartItem) => {
  if (!cartItems?.value) return
  const index = cartItems.value.findIndex((value) => value.id === cart.id)
  cartItems.value.splice(index, 1)
  toast({
    title: '⚠️Item removed',
    description: 'Item has been removed from your cart.',
    class: '!bg-orange-100',
  })
  setPriceDiscount()
}

const findActiveCampaign = () => {
  if (!campaignList?.value) return
  return campaignList.value.filter((campaignItem) => campaignItem.active)
}

const setTargetCampaign = (targetCampaign: Campaigns, isActive: boolean) => {
  if (!campaignList?.value) return
  campaignList.value.map((campaign) =>
    campaign.id === targetCampaign.id
      ? (targetCampaign.active = isActive)
      : campaign
  )
}

const selectCampaign = (targetCampaign: Campaigns, isActive: boolean): void => {
  setTargetCampaign(targetCampaign, isActive)
  setPriceDiscount(targetCampaign)
}

onMounted(async () => {
  await fetchCampaign()
  await fetchProducts()
  await setPriceDiscount()
})
</script>

<template>
  <div class="flex gap-4 flex-col lg:flex-row w-full">
    <div class="w-full">
      <Tabs default-value="cart">
        <TabsList>
          <TabsTrigger value="cart"> 🛍 Shopping cart </TabsTrigger>
          <TabsTrigger value="campaigns"> 🏷 Campaigns </TabsTrigger>
        </TabsList>
        <TabsContent value="cart">
          <div v-if="cartItems?.length" class="flex flex-col gap-2">
            <template v-for="(shoppingCard, index) in cartItems" :key="index">
              <ShoppingCardItem
                :shoppingCard="shoppingCard"
                @remove:item="removeItem($event)"
              />
            </template>
          </div>
        </TabsContent>
        <TabsContent value="campaigns">
          <div
            v-if="campaignList?.length && cartItems?.length"
            class="flex flex-col gap-2"
          >
            <template v-for="(campaign, index) in campaignList" :key="index">
              <DiscountCampaignCardItem
                :campaign="campaign"
                @select:campaign="selectCampaign"
              >
              </DiscountCampaignCardItem>
            </template>
          </div>
          <div v-else>Please select campaign</div>
        </TabsContent>
      </Tabs>
    </div>
    <div class="w-full max-w-[unset] lg:max-w-[400px]">
      <PriceCalculationCard :calculation="calculationDiscount" />
    </div>
  </div>
</template>

<style scoped></style>
