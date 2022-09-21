import Sidebar from '@components/Sidebar'

export default function SidebarLayout({ children }: { children: React.ReactNode}) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <h1 className="text-blue-500">This is layout</h1>
        {children}
      </div>
    </>
  )
}