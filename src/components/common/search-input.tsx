'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  onClear?: () => void
  className?: string
  debounceMs?: number
  showClearButton?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function SearchInput({
  placeholder = 'Search...',
  value: externalValue,
  onChange,
  onSearch,
  onClear,
  className,
  debounceMs = 300,
  showClearButton = true,
  size = 'md'
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(externalValue || '')
  const [debouncedValue, setDebouncedValue] = useState(internalValue)

  // Handle external value changes
  useEffect(() => {
    if (externalValue !== undefined) {
      setInternalValue(externalValue)
      setDebouncedValue(externalValue)
    }
  }, [externalValue])

  // Debounce internal value changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(internalValue)
    }, debounceMs)

    return () => clearTimeout(timer)
  }, [internalValue, debounceMs])

  // Trigger search when debounced value changes
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedValue)
    }
  }, [debouncedValue, onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const handleClear = () => {
    setInternalValue('')
    setDebouncedValue('')
    onChange?.('')
    onClear?.()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(internalValue)
    }
  }

  const sizeClasses = {
    sm: 'h-8 text-sm',
    md: 'h-10 text-base',
    lg: 'h-12 text-lg'
  }

  return (
    <div className={cn('relative', className)}>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          type='text'
          placeholder={placeholder}
          value={internalValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className={cn('pl-10 pr-10', sizeClasses[size])}
        />
        {showClearButton && internalValue && (
          <Button
            type='button'
            variant='ghost'
            size='sm'
            onClick={handleClear}
            className='absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-muted'
          >
            <X className='h-3 w-3' />
            <span className='sr-only'>Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
}

// Advanced search with filters
interface AdvancedSearchProps {
  searchValue: string
  onSearchChange: (value: string) => void
  filters?: Array<{
    key: string
    label: string
    options: Array<{ value: string; label: string }>
    value?: string
    onChange: (value: string) => void
  }>
  className?: string
}

export function AdvancedSearch({ searchValue, onSearchChange, filters = [], className }: AdvancedSearchProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <SearchInput value={searchValue} onChange={onSearchChange} placeholder='Search...' className='w-full max-w-md' />

      {filters.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {filters.map((filter) => (
            <div key={filter.key} className='flex items-center space-x-2'>
              <label className='text-sm font-medium text-muted-foreground'>{filter.label}:</label>
              <select
                value={filter.value || ''}
                onChange={(e) => filter.onChange(e.target.value)}
                className='rounded-md border border-input bg-background px-3 py-1 text-sm'
              >
                <option value=''>All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
