'use client'
import { useSocket } from '@/context/SocketProvider';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

type Props = {}
// let typingTimeout: NodeJS.Timeout;

const page = (props: Props) => {
    const { messages, sendMessages, isTyping, userTyping, stoppedTyping, joinGroup, userCount, ActiveUser } = useSocket()
    const [message, setMessage] = useState<string>('');
    const typingTimeOutRef = useRef<NodeJS.Timeout | null>(null)

    const { roomid, userId } = useParams();
    const roomId = roomid as string
    const user = userId as string

    const handleSend = () => {
        sendMessages(message, roomid as string)
        setMessage('')
    }

    const handleTyping = () => {
        isTyping(roomId, user)

        if (typingTimeOutRef.current) clearTimeout(typingTimeOutRef.current);

        typingTimeOutRef.current = setTimeout(() => {

            stoppedTyping(roomId, user)
        }, 1500);
    };


    useEffect(() => {
        if (userId && roomid) {
            joinGroup(roomid as string, userId as string)
        }

    }, [userId, roomid, joinGroup])

    useEffect(() => {
        // on unmount clear the timer if it is there to prevent memory leak

        return () => {
            if (typingTimeOutRef.current) {
                clearTimeout(typingTimeOutRef.current)
            }
        }
    }, [])

    return (
        <div className=' w-full min-h-screen'>
            <div className=''>
                <input
                    placeholder='Send messages'
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        handleTyping()
                    }}
                    className='border text-black'
                />

                <button onClick={handleSend}
                    className='border px-2 py-1 rounded-lg'
                >
                    Send
                </button>
                <div>
                    User count : {userCount}
                </div>
            </div>

            <h1>Messages :</h1>
            {
                messages.map((message, index) =>

                    <ul key={index}
                        className='list-none flex flex-col gap-y-1 text-black'
                    >
                        <li className='flex flex-col'>

                            {
                                message.content
                            }

                        </li>
                    </ul>
                )
            }
            {
                userTyping && (`${userTyping} is typing...`)
            }

            <div className='mt-3'>
                {
                    ActiveUser.map((user, index) => (
                        <p key={index}>
                            {user} is online
                        </p>
                    ))
                }
            </div>

        </div>

    )
}

export default page