interface Props {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ totalPages, currentPage, onPageChange }: Props) => {
  if(totalPages === 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  //TODO: Make it display horizontally
  // return (
  //   <div>
  //     <ul>
  //       {pages. map((page) => (
  //         <li key={page}>
  //           <a onClick={() => onPageChange(page)}>
  //             {page}
  //           </a>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // )

  return (
    <div className="flex space-x-2">
      {pages.map((page) => (
        <a
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md cursor-pointer ${
            currentPage === page
              ? "bg-gray-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </a>
      ))}
    </div>
  );
}
