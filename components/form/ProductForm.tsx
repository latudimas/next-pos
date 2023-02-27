import React, { useState } from "react"
import { ProductCategory, ProductUnit } from "@root/types"
import unit from "@root/pages/api/unit"

interface Props {
  categories: ProductCategory[]
  units: ProductUnit[]
}

export const ProductForm = (props: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedUnit, setSelectedUnit] = useState('')

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value)
  }

  const handleUnitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(event.target.value)
  }

  return (
    <form>
      <label htmlFor="barcode">Barcode</label>
      <input type="text" id="barcode"/>

      <label htmlFor="productName">Product Name</label>
      <input type="text" id="productName"/>

      <label htmlFor="price">Price</label>
      <input type="number" id="price"/>

      <label htmlFor="stock">Stock</label>
      <input type="number" id="stock"/>

      <label htmlFor="category">Category</label>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">--Please choose a category--</option>
        {props.categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.categoryName}
          </option>
        ))}
      </select>

      <label htmlFor="unit">Unit</label>
      <select id="unit" value={selectedUnit} onChange={handleUnitChange}>
        <option value="">--Please choose a unit--</option>
        {props.units.map(unit => (
          <option key={unit.id} value={unit.id}>
            {unit.unitName}
          </option>
        ))}
      </select>
    </form>
  )
}