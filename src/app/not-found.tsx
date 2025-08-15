'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('not-found')

  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <div className='text-center space-y-6 px-4'>
        <div className='space-y-2'>
          <h1 className='text-9xl font-bold text-muted-foreground'>404</h1>
          <h2 className='text-2xl font-semibold text-foreground'>{t('title')}</h2>
          <p className='text-muted-foreground max-w-md mx-auto'>{t('description')}</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild>
            <Link href='/'>{t('home')}</Link>
          </Button>
          <Button variant='outline' onClick={() => window.history.back()}>
            {t('back')}
          </Button>
        </div>

        <div className='pt-8'>
          <p className='text-sm text-muted-foreground'>
            {t('contact-prefix')}{' '}
            <Link href='/contact' className='text-primary hover:underline'>
              {t('contact-link')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
