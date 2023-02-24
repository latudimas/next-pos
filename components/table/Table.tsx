interface Column {
  key: string
  label: string
}

interface Product {
  number?:number
  id: number
  productName: string
  barcode: string
  category: string
  unit: string
}

interface TableProps {
  columns: Column[]
  data: Product[]
}

export const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-blue-200 text-black">
          {columns.map((column) => (
            <th 
              className="border" 
              key={column.key}>{column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((product, index) => (
          <tr key={product.id} className="text-center">
            {columns.map((column) => (
              <td key={column.key} className="border">
                {/* Since number for "No."" column are not provided we need to use index*/}
                {column.key === "number" ? index+1 : product[column.key as keyof Product]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
