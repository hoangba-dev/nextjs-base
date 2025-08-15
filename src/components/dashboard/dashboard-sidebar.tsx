'use client'

import { Home, Users, BarChart3, Settings, FileText, CreditCard, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { APP_ROUTES } from '@/constants/api'

const navigation = [
  { name: 'Dashboard', href: APP_ROUTES.DASHBOARD, icon: Home },
  { name: 'Users', href: APP_ROUTES.USERS, icon: Users },
  { name: 'Analytics', href: APP_ROUTES.ANALYTICS, icon: BarChart3 },
  { name: 'Documents', href: APP_ROUTES.DOCUMENTS, icon: FileText },
  { name: 'Billing', href: APP_ROUTES.BILLING, icon: CreditCard },
  { name: 'Settings', href: APP_ROUTES.SETTINGS, icon: Settings }
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side='left' className='w-72 p-0'>
          <div className='flex grow flex-col gap-y-5 overflow-y-auto bg-background px-6 pb-4'>
            <div className='flex h-16 shrink-0 items-center justify-between'>
              <h1 className='text-xl font-bold'>Admin Panel</h1>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='-m-2.5 p-2.5 text-muted-foreground'
                onClick={() => setSidebarOpen(false)}
              >
                <span className='sr-only'>Close sidebar</span>
                <X className='h-6 w-6' aria-hidden='true' />
              </Button>
            </div>
            <nav className='flex flex-1 flex-col'>
              <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                  <ul role='list' className='-mx-2 space-y-1'>
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            pathname === item.href
                              ? 'bg-accent text-accent-foreground'
                              : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon
                            className={cn(
                              pathname === item.href
                                ? 'text-accent-foreground'
                                : 'text-muted-foreground group-hover:text-accent-foreground',
                              'h-5 w-5 shrink-0'
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className='hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col'>
        <div className='flex grow flex-col gap-y-5 overflow-y-auto border-r bg-background px-6 pb-4'>
          <div className='flex h-16 shrink-0 items-center'>
            <h1 className='text-xl font-bold'>Admin Panel</h1>
          </div>
          <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
              <li>
                <ul role='list' className='-mx-2 space-y-1'>
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-accent-foreground hover:bg-accent',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                        )}
                      >
                        <item.icon
                          className={cn(
                            pathname === item.href
                              ? 'text-accent-foreground'
                              : 'text-muted-foreground group-hover:text-accent-foreground',
                            'h-5 w-5 shrink-0'
                          )}
                          aria-hidden='true'
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}
