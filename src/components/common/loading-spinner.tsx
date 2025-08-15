'use client'

import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
  showText?: boolean
}

export function LoadingSpinner({ size = 'md', className, text = 'Loading...', showText = false }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {showText && <p className='text-sm text-muted-foreground'>{text}</p>}
    </div>
  )
}

// Convenience components for common use cases
export function PageLoadingSpinner() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <LoadingSpinner size='xl' showText />
    </div>
  )
}

export function TableLoadingSpinner() {
  return (
    <div className='flex items-center justify-center py-8'>
      <LoadingSpinner size='lg' text='Loading data...' showText />
    </div>
  )
}

export function ButtonLoadingSpinner({ size = 'sm' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <LoadingSpinner size={size} />
}
