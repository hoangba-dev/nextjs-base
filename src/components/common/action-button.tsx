'use client'

import { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from './loading-spinner'
import { cn } from '@/lib/utils'

interface ActionButtonProps {
  children?: ReactNode
  onClick?: () => void | Promise<void>
  loading?: boolean
  disabled?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  type?: 'button' | 'submit' | 'reset'
  form?: string
}

export function ActionButton({
  children,
  onClick,
  loading = false,
  disabled = false,
  variant = 'default',
  size = 'default',
  icon,
  iconPosition = 'left',
  className,
  type = 'button',
  form
}: ActionButtonProps) {
  const handleClick = async () => {
    if (loading || disabled || !onClick) return

    try {
      await onClick()
    } catch (error) {
      console.error('Action button error:', error)
    }
  }

  const isDisabled = loading || disabled

  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isDisabled}
      className={cn(className)}
      form={form}
    >
      {loading ? (
        <>
          <LoadingSpinner size='sm' />
          <span className='ml-2'>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className={cn('mr-2', size === 'icon' && 'mr-0')}>{icon}</span>}
          {size !== 'icon' && children}
          {icon && iconPosition === 'right' && <span className='ml-2'>{icon}</span>}
        </>
      )}
    </Button>
  )
}

// Convenience components for common actions
export function DeleteButton({
  children = 'Delete',
  onClick,
  loading,
  disabled,
  size = 'sm',
  ...props
}: Omit<ActionButtonProps, 'variant'>) {
  return (
    <ActionButton variant='destructive' size={size} onClick={onClick} loading={loading} disabled={disabled} {...props}>
      {children}
    </ActionButton>
  )
}

export function EditButton({
  children = 'Edit',
  onClick,
  loading,
  disabled,
  size = 'sm',
  ...props
}: Omit<ActionButtonProps, 'variant'>) {
  return (
    <ActionButton variant='outline' size={size} onClick={onClick} loading={loading} disabled={disabled} {...props}>
      {children}
    </ActionButton>
  )
}

export function SaveButton({
  children = 'Save',
  onClick,
  loading,
  disabled,
  ...props
}: Omit<ActionButtonProps, 'variant' | 'type'>) {
  return (
    <ActionButton variant='default' type='submit' onClick={onClick} loading={loading} disabled={disabled} {...props}>
      {children}
    </ActionButton>
  )
}

export function CancelButton({ children = 'Cancel', onClick, disabled, ...props }: Omit<ActionButtonProps, 'variant'>) {
  return (
    <ActionButton variant='ghost' onClick={onClick} disabled={disabled} {...props}>
      {children}
    </ActionButton>
  )
}
