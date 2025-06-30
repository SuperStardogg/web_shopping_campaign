export interface Products {
  id: number
  name: string
  category: Category
  price: number
  quantity: number
}

export enum Category {
  CLOTHING = 'Clothing',
  ACCESSORIES = 'Accessories',
  ELECTRONICS = 'Electronics',
}
