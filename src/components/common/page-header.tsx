'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
  className?: string
  showSeparator?: boolean
}

export function PageHeader({ title, description, children, className, showSeparator = true }: PageHeaderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <h1 className='text-2xl font-semibold tracking-tight'>{title}</h1>
          {description && <p className='text-muted-foreground'>{description}</p>}
        </div>
        {children && <div className='flex items-center space-x-2'>{children}</div>}
      </div>
      {showSeparator && <Separator />}
    </div>
  )
}

// Convenience components for common actions
export function PageHeaderActions({ children }: { children: ReactNode }) {
  return <div className='flex items-center space-x-2'>{children}</div>
}

export function PageHeaderButton({
  children,
  variant = 'default',
  size = 'default',
  ...props
}: {
  children: ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  [key: string]: any
}) {
  return (
    <Button variant={variant} size={size} {...props}>
      {children}
    </Button>
  )
}
