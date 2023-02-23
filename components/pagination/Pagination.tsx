interface Props {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  if(totalPages === 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div>
      <ul>
        {pages. map((page) => (
          <li key={page}>
            <a onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
