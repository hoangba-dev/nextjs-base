'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface SectionCardProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  showHeader?: boolean
  variant?: 'default' | 'outlined' | 'elevated'
}

export function SectionCard({
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  showHeader = true,
  variant = 'default'
}: SectionCardProps) {
  const variantClasses = {
    default: 'border-border',
    outlined: 'border-2 border-border',
    elevated: 'border-border shadow-lg'
  }

  return (
    <Card className={cn(variantClasses[variant], className)}>
      {showHeader && (title || description) && (
        <CardHeader className={cn('pb-4', headerClassName)}>
          {title && <CardTitle className='text-lg'>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn('pt-0', contentClassName)}>{children}</CardContent>
    </Card>
  )
}

// Convenience components for common use cases
export function InfoCard({ title, description, children, ...props }: Omit<SectionCardProps, 'variant'>) {
  return (
    <SectionCard title={title} description={description} variant='outlined' {...props}>
      {children}
    </SectionCard>
  )
}

export function ActionCard({ title, description, children, ...props }: Omit<SectionCardProps, 'variant'>) {
  return (
    <SectionCard title={title} description={description} variant='elevated' {...props}>
      {children}
    </SectionCard>
  )
}
