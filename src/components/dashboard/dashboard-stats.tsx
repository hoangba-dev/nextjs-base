'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, CreditCard, Activity } from 'lucide-react'
import { QUERY_KEYS } from '@/constants/api'

// Mock API function - replace with real API calls
const fetchDashboardStats = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    totalUsers: 1234,
    revenue: 45231,
    subscriptions: 573,
    activeUsers: 89
  }
}

export function DashboardStats() {
  const {
    data: stats,
    isLoading,
    error
  } = useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.STATS,
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>...</div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return <div>Error loading dashboard stats</div>
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers.toLocaleString(),
      description: '+20.1% from last month',
      icon: Users
    },
    {
      title: 'Revenue',
      value: `$${stats?.revenue.toLocaleString()}`,
      description: '+180.1% from last month',
      icon: TrendingUp
    },
    {
      title: 'Active Subscriptions',
      value: stats?.subscriptions.toLocaleString(),
      description: '+201 since last hour',
      icon: CreditCard
    },
    {
      title: 'Active Now',
      value: stats?.activeUsers.toLocaleString(),
      description: '+201 since last hour',
      icon: Activity
    }
  ]

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
            <stat.icon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
            <p className='text-xs text-muted-foreground'>{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
