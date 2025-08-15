'use client'

import { Menu as MenuIcon, Bell, User, LogOut } from 'lucide-react'
import { useAuth } from '@/components/context/auth-provider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardHeader() {
  const { logout, user } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className='sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8'>
      {/* Mobile menu button */}
      <Sheet>
        <SheetTrigger asChild>
          <Button type='button' variant='ghost' size='sm' className='-m-2.5 p-2.5 text-muted-foreground lg:hidden'>
            <span className='sr-only'>Open sidebar</span>
            <MenuIcon className='h-6 w-6' aria-hidden='true' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-72 p-0'>
          <DashboardSidebar />
        </SheetContent>
      </Sheet>

      <div className='flex flex-1 gap-x-4 self-stretch lg:gap-x-6'>
        <div className='flex flex-1' />
        <div className='flex items-center gap-x-4 lg:gap-x-6'>
          <Button
            type='button'
            variant='ghost'
            size='sm'
            className='-m-2.5 p-2.5 text-muted-foreground hover:text-foreground'
          >
            <span className='sr-only'>View notifications</span>
            <Bell className='h-6 w-6' aria-hidden='true' />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                <Avatar className='h-8 w-8'>
                  <AvatarImage src='' alt={user?.name || ''} />
                  <AvatarFallback>
                    <User className='h-4 w-4' />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
