import React from 'react'
import { SectionCard } from '../common'
import { BarChart3Icon, UsersIcon } from 'lucide-react'

export function UsersStat() {
  const stats = {
    total: 1000,
    active: 750,
    pending: 150,
    inactive: 100,
    activePercentage: 75
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
      <SectionCard title='Total Users' variant='outlined'>
        <div className='flex items-center space-x-2'>
          <UsersIcon className='h-8 w-8 text-blue-600' />
          <div>
            <div className='text-2xl font-bold'>{stats?.total || 0}</div>
            <div className='text-sm text-muted-foreground'>All time</div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title='Active Users' variant='outlined'>
        <div className='flex items-center space-x-2'>
          <BarChart3Icon className='h-8 w-8 text-green-600' />
          <div>
            <div className='text-2xl font-bold'>{stats?.active || 0}</div>
            <div className='text-sm text-muted-foreground'>{stats?.activePercentage || 0}% of total</div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title='Pending Users' variant='outlined'>
        <div className='flex items-center space-x-2'>
          <BarChart3Icon className='h-8 w-8 text-yellow-600' />
          <div>
            <div className='text-2xl font-bold'>{stats?.pending || 0}</div>
            <div className='text-sm text-muted-foreground'>Awaiting approval</div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title='Inactive Users' variant='outlined'>
        <div className='flex items-center space-x-2'>
          <BarChart3Icon className='h-8 w-8 text-gray-600' />
          <div>
            <div className='text-2xl font-bold'>{stats?.inactive || 0}</div>
            <div className='text-sm text-muted-foreground'>Suspended/Inactive</div>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}
