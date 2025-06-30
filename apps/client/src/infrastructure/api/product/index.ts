import http from '../../../utils/Http'
import { Response } from '../../../utils/Http'
import { Products } from './type'

enum Api {
  Product = '/api/v1/products',
}

export const getAllProductsApi = () => {
  return http.get<Response<Products[]>>(`${Api.Product}`)
}
