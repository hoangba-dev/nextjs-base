'use client'

import * as React from 'react'
import { CommandIcon } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { APP_ROUTES, sidebarRouteMap } from '@/constants/routes'
import { NavItem } from '@/types/dashboard.type'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations()

  const renderSidebar = (): NavItem[] => {
    const items = Object.values(sidebarRouteMap).map((route) => ({
      ...route,
      title: t(route.title ?? ''),
      childrens:
        route.childrens?.map((child) => ({
          ...child,
          title: t(child.title ?? '')
        })) ?? []
    }))
    return items
  }

  return (
    <Sidebar variant='floating' collapsible='icon' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href={APP_ROUTES.HOME}>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <CommandIcon className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>Acme Inc</span>
                  <span className='truncate text-xs'>Enterprise</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={renderSidebar()} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
