export const QUERY_KEYS = {
  AUTH: {
    ME: ['auth', 'me'],
    USER: ['auth', 'user']
  },
  DASHBOARD: {
    STATS: ['dashboard', 'stats'],
    OVERVIEW: ['dashboard', 'overview']
  },
  USERS: {
    LIST: ['users', 'list'],
    DETAIL: (id: string) => ['users', 'detail', id],
    CREATE: ['users', 'create'],
    UPDATE: (id: string) => ['users', 'update', id],
    DELETE: (id: string) => ['users', 'delete', id],
    STATS: ['users', 'stats']
  },
  ANALYTICS: {
    OVERVIEW: ['analytics', 'overview'],
    CHART_DATA: ['analytics', 'chart-data'],
    METRICS: ['analytics', 'metrics']
  },
  DOCUMENTS: {
    LIST: ['documents', 'list'],
    DETAIL: (id: string) => ['documents', 'detail', id],
    UPLOAD: ['documents', 'upload']
  },
  BILLING: {
    INVOICES: ['billing', 'invoices'],
    SUBSCRIPTIONS: ['billing', 'subscriptions'],
    PAYMENT_METHODS: ['billing', 'payment-methods']
  },
  SETTINGS: {
    PROFILE: ['settings', 'profile'],
    PREFERENCES: ['settings', 'preferences'],
    SECURITY: ['settings', 'security']
  }
} as const
