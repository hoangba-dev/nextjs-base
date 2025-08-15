import { API_ROUTES } from '@/constants/routes'

export const dashboardApi = {
  getStats: async () => {
    const response = await fetch(API_ROUTES.DASHBOARD.STATS)

    if (!response.ok) {
      throw new Error('Failed to get dashboard stats')
    }

    return response.json()
  },

  getOverview: async () => {
    const response = await fetch(API_ROUTES.DASHBOARD.OVERVIEW)

    if (!response.ok) {
      throw new Error('Failed to get dashboard overview')
    }

    return response.json()
  }
}
