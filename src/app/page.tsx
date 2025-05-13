'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const Home = (props: Props) => {

  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen'>
      welcome to the chat application
      <button
        className='border px-2 py-1 rounded-lg w-fit cursor-pointer'
        onClick={() => {
          router.push(`/user/${crypto.randomUUID()}`)
        }}
      >
        click to start chat
      </button>
    </div>
  )
}

export default Home