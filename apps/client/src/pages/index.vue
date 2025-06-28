<script setup>
import ShoppingCardItem from '../components/ShoppingCardItem.vue'

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
</script>

<template>
  <div class="w-full">
    <template v-for="(shoppingCard, index) in shoppingCardList" :key="index">
      <ShoppingCardItem :shoppingCard="shoppingCard"/>
    </template>
  </div>
</template>

<style scoped></style>
