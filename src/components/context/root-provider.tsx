import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { ThemeProvider } from './theme-provider'
import QueryProvider from './query-provider'
import { AuthProvider } from './auth-provider'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '../ui/sonner'

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster richColors />
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  )
}
