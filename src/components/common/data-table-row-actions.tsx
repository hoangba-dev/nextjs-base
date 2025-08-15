'use client'

import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Edit, Trash2, Eye, Copy, Archive } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ActionItem {
  label: string
  icon?: React.ReactNode
  onClick: (row: Row<unknown>) => void
  variant?: 'default' | 'destructive' | 'outline'
  disabled?: boolean
  separator?: boolean
}

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
  actions: ActionItem[]
  showDropdown?: boolean
  className?: string
}

export function DataTableRowActions<TData>({
  row,
  actions,
  showDropdown = true,
  className
}: DataTableRowActionsProps<TData>) {
  if (!showDropdown) {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'outline'}
            size='sm'
            onClick={() => action.onClick(row as Row<unknown>)}
            disabled={action.disabled}
            className='h-8 w-8 p-0'
          >
            {action.icon}
            <span className='sr-only'>{action.label}</span>
          </Button>
        ))}
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {actions.map((action) => (
          <div key={action.label}>
            {action.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              onClick={() => action.onClick(row as Row<unknown>)}
              disabled={action.disabled}
              className={cn(action.variant === 'destructive' && 'text-destructive focus:text-destructive')}
            >
              {action.icon}
              <span className='ml-2'>{action.label}</span>
            </DropdownMenuItem>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Predefined action sets for common use cases
export const commonRowActions = {
  view: (onView: (row: Row<unknown>) => void): ActionItem => ({
    label: 'View',
    icon: <Eye className='h-4 w-4' />,
    onClick: onView
  }),
  edit: (onEdit: (row: Row<unknown>) => void): ActionItem => ({
    label: 'Edit',
    icon: <Edit className='h-4 w-4' />,
    onClick: onEdit
  }),
  delete: (onDelete: (row: Row<unknown>) => void): ActionItem => ({
    label: 'Delete',
    icon: <Trash2 className='h-4 w-4' />,
    onClick: onDelete,
    variant: 'destructive'
  }),
  copy: (onCopy: (row: Row<unknown>) => void): ActionItem => ({
    label: 'Copy',
    icon: <Copy className='h-4 w-4' />,
    onClick: onCopy
  }),
  archive: (onArchive: (row: Row<unknown>) => void): ActionItem => ({
    label: 'Archive',
    icon: <Archive className='h-4 w-4' />,
    onClick: onArchive
  })
}
