'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/context/userprovider'
import { useRouter } from 'next/navigation'
import React, { use } from 'react'

type Props = {}

const Home = (props: Props) => {

  const router = useRouter()
  const { user } = useUser()

  return (
    <div className='min-h-screen w-full bg-yellow-100 '>
      <Button
        onClick={() => router.push(`/user/${crypto.randomUUID()}`)}
      >
        Go to room page
      </Button>
      <div>
        <h1>User's information</h1>
        <p> {user?.id} </p>
        <p> {user?.userName} </p>
        <p> {user?.email}</p>
        <p> {user?.status} </p>
      </div>
    </div>
  )
}

export default Home