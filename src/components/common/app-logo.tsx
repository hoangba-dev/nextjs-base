import { CommandIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export function AppLogo() {
  return (
    <Link href='/' className='flex space-x-2 py-3 items-center'>
      <h1 className='text-xl font-bold flex items-center gap-2'>
        <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
          <CommandIcon className='size-4' />
        </div>
        Blocks
      </h1>
    </Link>
  )
}
