'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const Home = (props: Props) => {

  const router = useRouter()

  return (
    <div className='min-h-screen w-full bg-yellow-100 '>
      <Button
        onClick={() => router.push(`/user/${crypto.randomUUID()}`)}
      >
        Go to room page
      </Button>
    </div>
  )
}

export default Home