'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface FormSectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  variant?: 'default' | 'outlined' | 'elevated'
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export function FormSection({
  title,
  description,
  children,
  className,
  variant = 'default',
  collapsible = false,
  defaultCollapsed = false
}: FormSectionProps) {
  const variantClasses = {
    default: 'border-border',
    outlined: 'border-2 border-border',
    elevated: 'border-border shadow-lg'
  }

  if (!title && !description) {
    return <div className={cn('space-y-4', className)}>{children}</div>
  }

  return (
    <Card className={cn('w-full', variantClasses[variant], className)}>
      {(title || description) && (
        <CardHeader className='pb-4'>
          {title && <CardTitle className='text-lg'>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className='pt-0'>
        <div className='space-y-4'>{children}</div>
      </CardContent>
    </Card>
  )
}

// Convenience components for common form layouts
export function FormSectionGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6', className)}>{children}</div>
}

export function FormSectionDivider({ className }: { className?: string }) {
  return <Separator className={cn('my-6', className)} />
}

export function FormSectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-semibold text-foreground', className)}>{children}</h3>
}

export function FormSectionDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
}
