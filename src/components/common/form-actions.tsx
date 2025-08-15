'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface FormActionsProps {
  children: ReactNode
  className?: string
  showSeparator?: boolean
  align?: 'left' | 'center' | 'right' | 'between'
}

export function FormActions({ children, className, showSeparator = true, align = 'right' }: FormActionsProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  }

  return (
    <div className={cn('space-y-4', className)}>
      {showSeparator && <Separator />}
      <div className={cn('flex items-center space-x-3', alignClasses[align])}>{children}</div>
    </div>
  )
}

// Predefined action button sets for common form patterns
export function FormActionsPrimary({
  children,
  loading = false,
  disabled = false,
  ...props
}: {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  [key: string]: any
}) {
  return (
    <Button type='submit' disabled={loading || disabled} className='min-w-[100px]' {...props}>
      {children}
    </Button>
  )
}

export function FormActionsSecondary({
  children,
  onClick,
  disabled = false,
  ...props
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  [key: string]: any
}) {
  return (
    <Button type='button' variant='outline' onClick={onClick} disabled={disabled} {...props}>
      {children}
    </Button>
  )
}

export function FormActionsCancel({
  children = 'Cancel',
  onClick,
  disabled = false,
  ...props
}: {
  children?: ReactNode
  onClick?: () => void
  disabled?: boolean
  [key: string]: any
}) {
  return (
    <Button type='button' variant='ghost' onClick={onClick} disabled={disabled} {...props}>
      {children}
    </Button>
  )
}

export function FormActionsDelete({
  children = 'Delete',
  onClick,
  loading = false,
  disabled = false,
  ...props
}: {
  children?: ReactNode
  onClick?: () => void
  loading?: boolean
  disabled?: boolean
  [key: string]: any
}) {
  return (
    <Button type='button' variant='destructive' onClick={onClick} disabled={loading || disabled} {...props}>
      {children}
    </Button>
  )
}
