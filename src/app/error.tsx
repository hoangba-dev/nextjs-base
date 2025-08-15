'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations('global-error')

  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <div className='min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4'>
      <div className='max-w-md w-full text-center space-y-8'>
        {/* Error Icon */}
        <div className='flex justify-center'>
          <div className='relative'>
            <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center'>
              <AlertTriangle className='w-12 h-12 text-red-600' />
            </div>
            <div className='absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full animate-pulse'></div>
          </div>
        </div>

        {/* Error Message */}
        <div className='space-y-4'>
          <h1 className='text-4xl font-bold text-gray-900'>{t('oops')}</h1>
          <h2 className='text-xl font-semibold text-gray-700'>{t('unexpected-error')}</h2>
          <p className='text-gray-600 leading-relaxed'>{t('description')}</p>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <details className='mt-4 p-4 bg-red-50 rounded-lg text-left'>
              <summary className='cursor-pointer text-sm font-medium text-red-800 mb-2'>{t('details-title')}</summary>
              <pre className='text-xs text-red-700 whitespace-pre-wrap break-words'>
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button
            onClick={reset}
            className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors'
          >
            <RotateCcw className='w-4 h-4 mr-2' />
            {t('retry')}
          </Button>

          <Button
            variant='outline'
            onClick={() => (window.location.href = '/')}
            className='border-red-200 text-red-700 hover:bg-red-50 px-6 py-2 rounded-lg font-medium transition-colors'
          >
            <Home className='w-4 h-4 mr-2' />
            {t('home')}
          </Button>
        </div>

        {/* Support Info */}
        <div className='pt-6 border-t border-red-200'>
          <p className='text-sm text-gray-500'>{t('support')}</p>
        </div>
      </div>
    </div>
  )
}
