'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type StatusVariant =
  | 'default'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'success'
  | 'warning'
  | 'info'
  | 'pending'
  | 'active'
  | 'inactive'

interface StatusBadgeProps {
  status: string
  variant?: StatusVariant
  className?: string
}

const statusConfig: Record<string, { variant: StatusVariant; className?: string }> = {
  // User statuses
  active: { variant: 'success', className: 'bg-green-100 text-green-800 border-green-200' },
  inactive: { variant: 'secondary', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  pending: { variant: 'warning', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  suspended: { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200' },

  // Order statuses
  completed: { variant: 'success', className: 'bg-green-100 text-green-800 border-green-200' },
  processing: { variant: 'info', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  cancelled: { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200' },
  refunded: { variant: 'secondary', className: 'bg-gray-100 text-gray-800 border-gray-200' },

  // Payment statuses
  paid: { variant: 'success', className: 'bg-green-100 text-green-800 border-green-200' },
  unpaid: { variant: 'warning', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  failed: { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200' },

  // Subscription statuses
  subscribed: { variant: 'success', className: 'bg-green-100 text-green-800 border-green-200' },
  expired: { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200' },
  trial: { variant: 'info', className: 'bg-blue-100 text-blue-800 border-blue-200' },

  // Document statuses
  published: { variant: 'success', className: 'bg-green-100 text-green-800 border-green-200' },
  draft: { variant: 'secondary', className: 'bg-gray-100 text-gray-800 border-gray-200' },
  archived: { variant: 'outline', className: 'bg-gray-50 text-gray-600 border-gray-300' },

  // Default fallbacks
  success: { variant: 'success', className: 'bg-green-100 text-green-800 border-green-200' },
  error: { variant: 'destructive', className: 'bg-red-100 text-red-800 border-red-200' },
  warning: { variant: 'warning', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  info: { variant: 'info', className: 'bg-blue-100 text-blue-800 border-blue-200' }
}

export function StatusBadge({ status, variant, className }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] || { variant: 'default' }
  const finalVariant = variant || config.variant

  return (
    <Badge
      variant={finalVariant === 'default' ? 'default' : 'outline'}
      className={cn('capitalize font-medium', config.className, className)}
    >
      {status}
    </Badge>
  )
}

// Convenience components for common statuses
export function UserStatusBadge({ status }: { status: string }) {
  return <StatusBadge status={status} />
}

export function OrderStatusBadge({ status }: { status: string }) {
  return <StatusBadge status={status} />
}

export function PaymentStatusBadge({ status }: { status: string }) {
  return <StatusBadge status={status} />
}

export function SubscriptionStatusBadge({ status }: { status: string }) {
  return <StatusBadge status={status} />
}
