'use client'

import { Column } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>
  title: string
  className?: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className='h-8 data-[state=open]:bg-accent'
      >
        {title}
        {column.getIsSorted() === 'desc' ? (
          <ChevronDown className='ml-2 h-4 w-4' />
        ) : column.getIsSorted() === 'asc' ? (
          <ChevronUp className='ml-2 h-4 w-4' />
        ) : (
          <ArrowUpDown className='ml-2 h-4 w-4' />
        )}
      </Button>
    </div>
  )
}
