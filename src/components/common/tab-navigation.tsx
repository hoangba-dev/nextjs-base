'use client'

import { ReactNode } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

interface TabItem {
  value: string
  label: string
  icon?: ReactNode
  content: ReactNode
  disabled?: boolean
  badge?: string | number
}

interface TabNavigationProps {
  tabs: TabItem[]
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  orientation?: 'horizontal' | 'vertical'
}

export function TabNavigation({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal'
}: TabNavigationProps) {
  const variantClasses = {
    default: '',
    pills: 'bg-muted p-1 rounded-lg',
    underline: 'border-b'
  }

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const orientationClasses = {
    horizontal: '',
    vertical: 'flex-col'
  }

  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn('w-full', className)}
      orientation={orientation}
    >
      <TabsList
        className={cn(
          'grid w-full',
          orientation === 'horizontal' ? 'grid-cols-1' : 'grid-cols-1',
          tabs.length > 1 && orientation === 'horizontal' && `grid-cols-${tabs.length}`,
          variantClasses[variant],
          orientationClasses[orientation]
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={cn(
              'flex items-center space-x-2',
              sizeClasses[size],
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className='ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground'>
                {tab.badge}
              </span>
            )}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className='mt-6'>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

// Convenience components for common tab patterns
export function TabNavigationSimple({
  tabs,
  activeTab,
  onTabChange,
  className
}: {
  tabs: Array<{ value: string; label: string; disabled?: boolean }>
  activeTab: string
  onTabChange: (value: string) => void
  className?: string
}) {
  return (
    <div className={cn('flex space-x-1', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          disabled={tab.disabled}
          className={cn(
            'px-3 py-2 text-sm font-medium rounded-md transition-colors',
            activeTab === tab.value
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            tab.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
