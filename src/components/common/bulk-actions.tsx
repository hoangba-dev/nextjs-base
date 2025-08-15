'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Trash2, Edit, Archive, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BulkAction {
  key: string
  label: string
  icon?: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary'
  onClick: (selectedIds: string[]) => void
}

interface BulkActionsProps {
  selectedIds: string[]
  totalItems: number
  actions: BulkAction[]
  onSelectAll?: (checked: boolean) => void
  onClearSelection?: () => void
  className?: string
  showSelectAll?: boolean
  showSelectionCount?: boolean
}

export function BulkActions({
  selectedIds,
  totalItems,
  actions,
  onSelectAll,
  onClearSelection,
  className,
  showSelectAll = true,
  showSelectionCount = true
}: BulkActionsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedCount = selectedIds.length
  const isAllSelected = selectedCount === totalItems
  const isIndeterminate = selectedCount > 0 && selectedCount < totalItems

  const handleSelectAll = (checked: boolean) => {
    onSelectAll?.(checked)
  }

  const handleClearSelection = () => {
    onClearSelection?.()
  }

  if (totalItems === 0) return null

  return (
    <div className={cn('flex items-center justify-between py-4', className)}>
      <div className='flex items-center space-x-4'>
        {showSelectAll && (
          <div className='flex items-center space-x-2'>
            <Checkbox
              checked={isAllSelected ? true : isIndeterminate ? 'indeterminate' : false}
              onCheckedChange={handleSelectAll}
            />
            <span className='text-sm text-muted-foreground'>Select All ({totalItems})</span>
          </div>
        )}

        {showSelectionCount && selectedCount > 0 && (
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-muted-foreground'>
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </span>
            <Button variant='ghost' size='sm' onClick={handleClearSelection} className='h-auto p-1 text-xs'>
              Clear
            </Button>
          </div>
        )}
      </div>

      {selectedCount > 0 && actions.length > 0 && (
        <div className='flex items-center space-x-2'>
          {actions.length === 1 ? (
            <Button variant={actions[0].variant || 'default'} size='sm' onClick={() => actions[0].onClick(selectedIds)}>
              {actions[0].icon}
              <span className='ml-2'>{actions[0].label}</span>
            </Button>
          ) : (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' size='sm'>
                  Actions
                  <MoreHorizontal className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {actions.map((action) => (
                  <DropdownMenuItem
                    key={action.key}
                    onClick={() => {
                      action.onClick(selectedIds)
                      setIsOpen(false)
                    }}
                    className={cn(action.variant === 'destructive' && 'text-destructive')}
                  >
                    {action.icon}
                    <span className='ml-2'>{action.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}
    </div>
  )
}

// Predefined bulk actions
export const commonBulkActions = {
  delete: {
    key: 'delete',
    label: 'Delete Selected',
    icon: <Trash2 className='h-4 w-4' />,
    variant: 'destructive' as const,
    onClick: (selectedIds: string[]) => {
      // Handle delete action
      console.log('Delete:', selectedIds)
    }
  },
  edit: {
    key: 'edit',
    label: 'Edit Selected',
    icon: <Edit className='h-4 w-4' />,
    onClick: (selectedIds: string[]) => {
      // Handle edit action
      console.log('Edit:', selectedIds)
    }
  },
  archive: {
    key: 'archive',
    label: 'Archive Selected',
    icon: <Archive className='h-4 w-4' />,
    onClick: (selectedIds: string[]) => {
      // Handle archive action
      console.log('Archive:', selectedIds)
    }
  },
  download: {
    key: 'download',
    label: 'Download Selected',
    icon: <Download className='h-4 w-4' />,
    onClick: (selectedIds: string[]) => {
      // Handle download action
      console.log('Download:', selectedIds)
    }
  }
}
