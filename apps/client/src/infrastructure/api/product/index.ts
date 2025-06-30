import http from '../../../utils/Http'
import { Products } from './type'

enum Api {
  Product = '/api/v1/products',
}

export const getAllProductsApi = () => {
  return http.get<Products[]>(`${Api.Product}`)
}
