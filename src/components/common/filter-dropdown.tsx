'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterConfig {
  key: string
  label: string
  options: FilterOption[]
  multiple?: boolean
}

interface FilterDropdownProps {
  filters: FilterConfig[]
  selectedFilters: Record<string, string | string[]>
  onFilterChange: (key: string, value: string | string[]) => void
  onClearFilters?: () => void
  className?: string
  showClearButton?: boolean
  maxDisplayFilters?: number
}

export function FilterDropdown({
  filters,
  selectedFilters,
  onFilterChange,
  onClearFilters,
  className,
  showClearButton = true,
  maxDisplayFilters = 3
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false)

  const handleFilterChange = (key: string, value: string, checked: boolean) => {
    const filter = filters.find((f) => f.key === key)
    if (!filter) return

    if (filter.multiple) {
      const currentValues = (selectedFilters[key] as string[]) || []
      let newValues: string[]

      if (checked) {
        newValues = [...currentValues, value]
      } else {
        newValues = currentValues.filter((v) => v !== value)
      }

      onFilterChange(key, newValues)
    } else {
      onFilterChange(key, checked ? value : '')
    }
  }

  const handleClearFilter = (key: string) => {
    const filter = filters.find((f) => f.key === key)
    if (filter?.multiple) {
      onFilterChange(key, [])
    } else {
      onFilterChange(key, '')
    }
  }

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).filter((value) => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== '' && value !== undefined
    }).length
  }

  const getFilterDisplayValue = (key: string) => {
    const value = selectedFilters[key]
    if (!value) return null

    if (Array.isArray(value)) {
      if (value.length === 0) return null
      if (value.length === 1) return value[0]
      return `${value.length} selected`
    }

    return value
  }

  const hasActiveFilters = getActiveFiltersCount() > 0
  const activeFiltersCount = getActiveFiltersCount()

  return (
    <div className={cn('relative', className)}>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className='h-8 border-dashed'>
            <Filter className='mr-2 h-4 w-4' />
            Filters
            {hasActiveFilters && (
              <Badge variant='secondary' className='ml-2 h-5 w-5 rounded-full p-0 text-xs'>
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {filters.map((filter) => {
            const currentValue = selectedFilters[filter.key]
            const isActive = Array.isArray(currentValue)
              ? currentValue.length > 0
              : currentValue !== '' && currentValue !== undefined

            return (
              <div key={filter.key} className='px-2 py-1'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-sm font-medium'>{filter.label}</span>
                  {isActive && (
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleClearFilter(filter.key)}
                      className='h-6 w-6 p-0'
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  )}
                </div>

                <div className='space-y-1'>
                  {filter.options.map((option) => {
                    const isSelected = filter.multiple
                      ? (currentValue as string[])?.includes(option.value)
                      : currentValue === option.value

                    return (
                      <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={isSelected}
                        onCheckedChange={(checked) => handleFilterChange(filter.key, option.value, !!checked)}
                        className='flex items-center justify-between'
                      >
                        <span>{option.label}</span>
                        {option.count !== undefined && (
                          <Badge variant='secondary' className='ml-2 text-xs'>
                            {option.count}
                          </Badge>
                        )}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {showClearButton && hasActiveFilters && (
            <>
              <DropdownMenuSeparator />
              <div className='px-2 py-1'>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => {
                    onClearFilters?.()
                    setOpen(false)
                  }}
                  className='w-full justify-start'
                >
                  <X className='mr-2 h-4 w-4' />
                  Clear all filters
                </Button>
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Active filter pills */}
      {hasActiveFilters && (
        <div className='flex flex-wrap gap-1'>
          {filters.map((filter) => {
            const displayValue = getFilterDisplayValue(filter.key)
            if (!displayValue) return null

            return (
              <Badge key={filter.key} variant='secondary' className='flex items-center space-x-1 px-2 py-1'>
                <span className='text-xs font-medium'>{filter.label}:</span>
                <span className='text-xs'>{displayValue}</span>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => handleClearFilter(filter.key)}
                  className='h-4 w-4 p-0 hover:bg-transparent'
                >
                  <X className='h-3 w-3' />
                </Button>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Helper functions for creating common filter configurations
export function createStatusFilter(statuses: string[], label = 'Status') {
  return {
    key: 'status',
    label,
    options: statuses.map((status) => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1)
    })),
    multiple: true
  }
}

export function createRoleFilter(roles: string[], label = 'Role') {
  return {
    key: 'role',
    label,
    options: roles.map((role) => ({
      value: role,
      label: role.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    })),
    multiple: true
  }
}
