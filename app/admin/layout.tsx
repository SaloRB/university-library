import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import Header from '@/components/admin/Header'
import Sidebar from '@/components/admin/Sidebar'
import '@/styles/admin.css'

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth()

  if (!session?.user?.id) redirect('/sign-in')

  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar session={session} />
      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  )
}
export default AdminLayout
