import { Form } from '@/components/ui/form'
import React from 'react'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'
interface AppFormProps<FormData extends FieldValues> {
  className?: string
  children: React.ReactNode
  form: UseFormReturn<FormData>
  onSubmit: SubmitHandler<FormData>
}
export function AppForm<FormData extends FieldValues>({ form, onSubmit, className, children }: AppFormProps<FormData>) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </Form>
  )
}
