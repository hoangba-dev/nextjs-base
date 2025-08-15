'use client'

import { forwardRef } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'

interface FormFieldProps {
  name: string
  label?: string
  description?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export const FormFieldComponent = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, label, description, error, required, className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <FormLabel className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            {label}
            {required && <span className='text-destructive ml-1'>*</span>}
          </FormLabel>
        )}

        {description && <p className='text-sm text-muted-foreground'>{description}</p>}

        {children}

        {error && <p className='text-sm font-medium text-destructive'>{error}</p>}
      </div>
    )
  }
)

FormFieldComponent.displayName = 'FormFieldComponent'

// Wrapper for useForm
export function FormFieldWrapper({
  control,
  name,
  render,
  ...props
}: {
  control: any
  name: string
  render: (props: any) => React.ReactNode
  [key: string]: any
}) {
  return <FormField control={control} name={name} render={render} {...props} />
}
