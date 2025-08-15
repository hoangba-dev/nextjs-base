'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { ReactNode } from 'react'

interface ConfirmDialogProps {
  title: string
  description: string
  trigger?: ReactNode
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
  loading?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ConfirmDialog({
  title,
  description,
  trigger,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
  loading = false,
  open,
  onOpenChange
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    try {
      await onConfirm()
    } catch (error) {
      console.error('Confirm action failed:', error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        {trigger || <Button variant={variant === 'destructive' ? 'destructive' : 'outline'}>{confirmText}</Button>}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel} disabled={loading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={variant === 'destructive' ? 'bg-destructive hover:bg-destructive/90' : ''}
          >
            {loading ? 'Loading...' : confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Convenience components for common use cases
export function DeleteConfirmDialog({
  itemName,
  onConfirm,
  trigger,
  loading
}: {
  itemName: string
  onConfirm: () => void | Promise<void>
  trigger?: ReactNode
  loading?: boolean
}) {
  return (
    <ConfirmDialog
      title='Delete Confirmation'
      description={`Are you sure you want to delete "${itemName}"? This action cannot be undone.`}
      confirmText='Delete'
      variant='destructive'
      onConfirm={onConfirm}
      trigger={trigger}
      loading={loading}
    />
  )
}

export function UpdateConfirmDialog({
  itemName,
  onConfirm,
  trigger,
  loading
}: {
  itemName: string
  onConfirm: () => void | Promise<void>
  trigger?: ReactNode
  loading?: boolean
}) {
  return (
    <ConfirmDialog
      title='Update Confirmation'
      description={`Are you sure you want to update "${itemName}"?`}
      confirmText='Update'
      onConfirm={onConfirm}
      trigger={trigger}
      loading={loading}
    />
  )
}
