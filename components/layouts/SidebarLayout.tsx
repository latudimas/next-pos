import { Sidebar } from '@components/sidebar'

export const SidebarLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        {children}
      </div>
    </>
  )
}
