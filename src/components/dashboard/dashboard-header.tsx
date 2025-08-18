import { SidebarTrigger } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import React from 'react'
import { ModeToggle } from '../common/app-toggle/mode-toggle'

export function DashboardHeader() {
  return (
    <div
      className={cn(
        'bg-background/40 sticky top-0 z-50 flex h-(--header-height) shrink-0 items-center gap-2 border-b backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) md:rounded-tl-xl md:rounded-tr-xl'
      )}
    >
      <div className='flex w-full items-center gap-1 px-4 lg:gap-2'>
        <SidebarTrigger />
        <div className='ml-auto flex items-center gap-2'>
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
