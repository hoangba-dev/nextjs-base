'use client'

import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  showHome?: boolean
  homeHref?: string
  className?: string
  separator?: React.ReactNode
}

export function Breadcrumb({
  items,
  showHome = true,
  homeHref = '/',
  className,
  separator = <ChevronRight className='h-4 w-4 text-muted-foreground' />
}: BreadcrumbProps) {
  const allItems = showHome ? [{ label: 'Home', href: homeHref }, ...items] : items

  return (
    <nav className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}>
      {allItems.map((item, index) => (
        <div key={index} className='flex items-center'>
          {index > 0 && <span className='mx-2'>{separator}</span>}

          {item.href && !item.active ? (
            <Link href={item.href} className='hover:text-foreground transition-colors'>
              {index === 0 && showHome ? <Home className='h-4 w-4' /> : item.label}
            </Link>
          ) : (
            <span
              className={cn('transition-colors', item.active ? 'text-foreground font-medium' : 'text-muted-foreground')}
            >
              {index === 0 && showHome ? <Home className='h-4 w-4' /> : item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Convenience function to create breadcrumb items from pathname
export function createBreadcrumbFromPath(pathname: string, basePath = '') {
  const segments = pathname
    .replace(basePath, '')
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = basePath + '/' + array.slice(0, index + 1).join('/')
      const label = segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      return {
        label,
        href: index === array.length - 1 ? undefined : href,
        active: index === array.length - 1
      }
    })

  return segments
}

// Dashboard breadcrumb helper
export function DashboardBreadcrumb({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return <Breadcrumb items={items} showHome={false} homeHref='/dashboard' className={className} />
}
