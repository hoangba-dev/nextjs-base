export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
    REFRESH: '/api/auth/refresh'
  },
  USERS: {
    LIST: '/api/users',
    CREATE: '/api/users',
    DETAIL: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`
  },
  DASHBOARD: {
    STATS: '/api/dashboard/stats',
    OVERVIEW: '/api/dashboard/overview'
  },
  ANALYTICS: {
    OVERVIEW: '/api/analytics/overview',
    CHART_DATA: '/api/analytics/chart-data',
    METRICS: '/api/analytics/metrics'
  },
  DOCUMENTS: {
    LIST: '/api/documents',
    UPLOAD: '/api/documents/upload',
    DETAIL: (id: string) => `/api/documents/${id}`
  },
  BILLING: {
    INVOICES: '/api/billing/invoices',
    SUBSCRIPTIONS: '/api/billing/subscriptions',
    PAYMENT_METHODS: '/api/billing/payment-methods'
  },
  SETTINGS: {
    PROFILE: '/api/settings/profile',
    PREFERENCES: '/api/settings/preferences',
    SECURITY: '/api/settings/security'
  }
} as const

export const APP_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  ANALYTICS: '/dashboard/analytics',
  DOCUMENTS: '/dashboard/documents',
  BILLING: '/dashboard/billing',
  SETTINGS: '/dashboard/settings'
} as const

export const APP_ROUTE_GROUPS = {
  PUBLIC: [APP_ROUTES.HOME, APP_ROUTES.LOGIN, APP_ROUTES.REGISTER],
  PROTECTED: [
    APP_ROUTES.DASHBOARD,
    APP_ROUTES.USERS,
    APP_ROUTES.ANALYTICS,
    APP_ROUTES.DOCUMENTS,
    APP_ROUTES.BILLING,
    APP_ROUTES.SETTINGS
  ],
  AUTH_ONLY: [APP_ROUTES.LOGIN, APP_ROUTES.REGISTER]
} as const
