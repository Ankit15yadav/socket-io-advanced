'use client'
import { useSocket } from '@/context/SocketProvider'
import { useRouter } from 'next/navigation'
import React from 'react'

type Room = {
    id: string
    name: string
}

const rooms: Room[] = [
    {
        id: '1',
        name: 'ankit',
    },
    {
        id: '2',
        name: 'parth',
    },
    {
        id: '3',
        name: 'prakhar',
    },
    {
        id: '4',
        name: 'sameer'
    },
]

const TestingPage = () => {

    const { joinGroup } = useSocket()
    const router = useRouter()

    const handleJoinGroup = (roomId: string, userId: string) => {
        router.push(`/user/${userId}/${roomId}`)
        // joinGroup(roomId, userId);
    }

    return (
        <div>
            {
                rooms.map((room) => (
                    <div key={room.id}
                        onClick={() => handleJoinGroup(room.id, room.id)}
                        className='h-10 border max-w-xs mt-3 ml-4 rounded-xl bg-yellow-100 cursor-pointer'
                    >
                        <p className='p-2 text-center text-md uppercase'>
                            {room.name}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default TestingPage