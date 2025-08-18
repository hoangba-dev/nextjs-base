'use client'

import { DashboardHeader, DashboardSidebar } from '@/components/dashboard'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className='flex flex-1 flex-col gap-4 p-2'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
