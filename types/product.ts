export type ProductForm = {
  barcode: string
  productName: string
  categoryId?: number
  unitId?: number
}

export type ProductStock = {
  productId: number
  productBarcode: string
  quantity: number
}

export type ProductCategory = {
  categoryName: string
}

export type ProductUnit = {
  unitName: string
}