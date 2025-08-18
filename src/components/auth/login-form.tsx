'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { loginSchema, type LoginInput } from '@/types/auth.type'
import { useAuth } from '../context/auth-provider'
import { AppForm } from '../common'
import { useTranslations } from 'next-intl'
import { AppLogo } from '../common/app-logo'
import { Loader2Icon } from 'lucide-react'
import { PasswordInput } from '../common/app-input/password-input'

export function LoginForm() {
  const { login } = useAuth()
  const t = useTranslations('login')

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@example.com',
      password: 'password'
    }
  })

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      form.setError('root', {
        message: error instanceof Error ? error.message : 'Login failed'
      })
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='space-y-1 flex flex-col items-center'>
        <AppLogo />
        <CardTitle className='text-2xl font-bold'>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <AppForm form={form} onSubmit={onSubmit} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('placeholder.email')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('password')}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder={t('placeholder.password')} {...field} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Loader2Icon className='mr-1 h-4 w-4 animate-spin' />}
            {t('button')}
          </Button>
        </AppForm>
      </CardContent>
    </Card>
  )
}
