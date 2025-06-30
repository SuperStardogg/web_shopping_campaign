import { ref } from 'vue'
import http from '../utils/Http'
import type { CartItem, Campaign } from '../types/campaign'

export function useDiscountCalculator() {
  const finalPrice = ref<number | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const calculate = async (items: CartItem[], campaigns: Campaign[]) => {
    loading.value = true
    error.value = null
    try {
      const res = await http.post('/api/v1/campaign/calculate', { items, campaigns })
      finalPrice.value = res.data.finalPrice
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Error calculating discount'
    } finally {
      loading.value = false
    }
  }

  return {
    finalPrice,
    loading,
    error,
    calculate,
  }
}
