'use client'

import { useSocket } from '@/context/SocketProvider'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {}

const UserGroup = (props: Props) => {

    const { userId } = useParams()
    const { joinGroup } = useSocket()
    const router = useRouter();

    const [room, setRoom] = useState<string>('')

    const handleJoin = () => {
        // joinGroup(room, userId as string);
        router.push(`/user/${userId}/${room as string}`)
        // setRoom('')

    }

    return (
        <div className='flex flex-col gap-y-2 items-center justify-center min-h-screen w-full'>
            <h1 className='flex '>Enter Room id</h1>
            <input
                placeholder='Enter room number'
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                className='border text-black rounded-md px-2 py-1'
            />
            <button
                onClick={handleJoin}
                className='cursor-pointer border px-2 py-1 rounded-lg w-fit'
            >
                Join Group
            </button>
            <button
                onClick={() => router.push('/testing')}
                className='cursor-pointer border px-2 py-1 rounded-lg w-fit'
            >
                Testing
            </button>
        </div>
    )
}

export default UserGroup