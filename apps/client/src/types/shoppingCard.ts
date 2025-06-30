import { Products } from '../infrastructure/api/product/type'

export interface CartItem extends Products {
  image?: string
}
