'use client'

import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Search, Filter, ChevronDown } from 'lucide-react'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchKey?: string
  searchPlaceholder?: string
  showSearch?: boolean
  showColumnToggle?: boolean
  filters?: Array<{
    key: string
    label: string
    options: Array<{ value: string; label: string }>
    multiple?: boolean
  }>
  onFilterChange?: (key: string, value: string | string[]) => void
  className?: string
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = 'Search...',
  showSearch = true,
  showColumnToggle = true,
  filters = [],
  onFilterChange,
  className = ''
}: DataTableToolbarProps<TData>) {
  return (
    <div className={`flex items-center justify-between py-4 ${className}`}>
      <div className='flex items-center space-x-4'>
        {showSearch && searchKey && (
          <div className='flex items-center space-x-2'>
            <Search className='h-4 w-4 text-muted-foreground' />
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn(searchKey)?.setFilterValue(event.target.value)}
              className='max-w-sm'
            />
          </div>
        )}

        {filters.length > 0 && onFilterChange && (
          <div className='flex items-center space-x-2'>
            <Filter className='h-4 w-4 text-muted-foreground' />
            {filters.map((filter) => (
              <DropdownMenu key={filter.key}>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' size='sm' className='h-8 border-dashed'>
                    {filter.label}
                    <ChevronDown className='ml-2 h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                  {filter.options.map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={true} // You'll need to implement the checked state based on your filter logic
                      onCheckedChange={(checked) => {
                        if (filter.multiple) {
                          // Handle multiple selection
                          const currentValues = (table.getColumn(filter.key)?.getFilterValue() as string[]) || []
                          const newValues = checked
                            ? [...currentValues, option.value]
                            : currentValues.filter((value) => value !== option.value)
                          onFilterChange(filter.key, newValues)
                        } else {
                          // Handle single selection
                          onFilterChange(filter.key, checked ? option.value : '')
                        }
                      }}
                    >
                      {option.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        )}
      </div>

      {showColumnToggle && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
