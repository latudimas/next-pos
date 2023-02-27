export type ProductFormInput = {
  barcode: string
  productName: string
  categoryId?: number
  unitId?: number
}

export type ProductStock = {
  productBarcode: string
  quantity: number
}

export type ProductCategory = {
  id: number
  categoryName: string
}

export type ProductUnit = {
  id: number
  unitName: string
}
