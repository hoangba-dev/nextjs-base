'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DateRangePickerProps {
  dateRange?: DateRange
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  showPresets?: boolean
}

const presets = [
  {
    label: 'Today',
    value: 'today',
    getDates: () => {
      const today = new Date()
      return { from: today, to: today }
    }
  },
  {
    label: 'Yesterday',
    value: 'yesterday',
    getDates: () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return { from: yesterday, to: yesterday }
    }
  },
  {
    label: 'Last 7 days',
    value: 'last7days',
    getDates: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 6)
      return { from: start, to: end }
    }
  },
  {
    label: 'Last 30 days',
    value: 'last30days',
    getDates: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 29)
      return { from: start, to: end }
    }
  },
  {
    label: 'This month',
    value: 'thisMonth',
    getDates: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      return { from: start, to: end }
    }
  },
  {
    label: 'Last month',
    value: 'lastMonth',
    getDates: () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 0)
      return { from: start, to: end }
    }
  }
]

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = 'Pick a date range',
  className,
  disabled = false,
  showPresets = true
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handlePresetSelect = (preset: (typeof presets)[0]) => {
    const newDateRange = preset.getDates()
    onDateRangeChange?.(newDateRange)
    setIsOpen(false)
  }

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    onDateRangeChange?.(newDateRange)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={cn(
            'w-[300px] justify-start text-left font-normal',
            !dateRange && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'LLL dd, y')} - {format(dateRange.to, 'LLL dd, y')}
              </>
            ) : (
              format(dateRange.from, 'LLL dd, y')
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          initialFocus
          mode='range'
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={handleDateRangeChange}
          numberOfMonths={2}
        />
        {showPresets && (
          <div className='border-t p-3'>
            <div className='text-sm font-medium mb-2'>Quick select</div>
            <div className='grid grid-cols-2 gap-2'>
              {presets.map((preset) => (
                <Button
                  key={preset.value}
                  variant='outline'
                  size='sm'
                  onClick={() => handlePresetSelect(preset)}
                  className='text-xs'
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

// Convenience function for creating date filter configs
export function createDateFilter(label: string) {
  return {
    key: 'dateRange',
    label,
    options: [
      { value: 'today', label: 'Today' },
      { value: 'yesterday', label: 'Yesterday' },
      { value: 'last7days', label: 'Last 7 days' },
      { value: 'last30days', label: 'Last 30 days' },
      { value: 'thisMonth', label: 'This month' },
      { value: 'lastMonth', label: 'Last month' }
    ],
    multiple: false
  }
}
