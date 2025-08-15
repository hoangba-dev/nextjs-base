'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PageContentProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function PageContent({ children, className, maxWidth = 'full', padding = 'md' }: PageContentProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-6',
    md: 'px-6 py-8',
    lg: 'px-8 py-12'
  }

  return (
    <div className={cn('mx-auto w-full', maxWidthClasses[maxWidth], paddingClasses[padding], className)}>
      {children}
    </div>
  )
}

// Convenience components for common page layouts
export function PageContentSection({
  children,
  className,
  title,
  description
}: {
  children: ReactNode
  className?: string
  title?: string
  description?: string
}) {
  return (
    <section className={cn('space-y-6', className)}>
      {title && (
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold'>{title}</h2>
          {description && <p className='text-muted-foreground'>{description}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

export function PageContentGrid({
  children,
  className,
  cols = 1
}: {
  children: ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4
}) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }

  return <div className={cn('grid gap-6', gridClasses[cols], className)}>{children}</div>
}
