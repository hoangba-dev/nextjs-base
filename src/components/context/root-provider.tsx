import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { ThemeProvider } from './theme-provider'
import QueryProvider from './query-provider'
import { AuthProvider } from './auth-provider'
import { SessionProvider } from 'next-auth/react'

export default function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      <SessionProvider>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextIntlClientProvider>
  )
}
