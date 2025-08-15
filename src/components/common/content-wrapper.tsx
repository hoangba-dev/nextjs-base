'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContentWrapperProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'narrow' | 'wide' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  background?: 'default' | 'muted' | 'transparent'
}

export function ContentWrapper({
  children,
  className,
  variant = 'default',
  padding = 'md',
  background = 'default'
}: ContentWrapperProps) {
  const variantClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-7xl',
    full: 'max-w-full'
  }

  const paddingClasses = {
    none: '',
    sm: 'px-4 py-6',
    md: 'px-6 py-8',
    lg: 'px-8 py-12'
  }

  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted/50',
    transparent: 'bg-transparent'
  }

  return (
    <div
      className={cn(
        'mx-auto w-full',
        variantClasses[variant],
        paddingClasses[padding],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </div>
  )
}

// Convenience components for common wrapper patterns
export function ContentWrapperSection({
  children,
  className,
  title,
  description,
  variant = 'default'
}: {
  children: ReactNode
  className?: string
  title?: string
  description?: string
  variant?: 'default' | 'narrow' | 'wide' | 'full'
}) {
  return (
    <ContentWrapper variant={variant} className={className}>
      {title && (
        <div className='mb-6 space-y-2'>
          <h2 className='text-2xl font-semibold'>{title}</h2>
          {description && <p className='text-muted-foreground'>{description}</p>}
        </div>
      )}
      {children}
    </ContentWrapper>
  )
}

export function ContentWrapperCard({
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
    <ContentWrapper variant='narrow' className={className}>
      <div className='rounded-lg border bg-card p-6 shadow-sm'>
        {title && (
          <div className='mb-6 space-y-2'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            {description && <p className='text-muted-foreground'>{description}</p>}
          </div>
        )}
        {children}
      </div>
    </ContentWrapper>
  )
}
