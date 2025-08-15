import { Languages } from '@/constants'
import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  const locale = Languages.VI

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default
  }
})
