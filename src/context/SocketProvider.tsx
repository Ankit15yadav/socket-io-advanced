'use client'

import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'

interface SocketProviderProps {
    children?: React.ReactNode
}

interface Message {
    content: string
}

interface SocketContext {
    messages: Message[],
    sendMessages: (message: string, groupId: string) => any
    joinGroup: (groupId: string, userId: string) => any
    leaveGroup: (groupId: string) => void
    isTyping: (groupId: string, userId: string) => void
    stoppedTyping: (groupId: string, userId: string) => void
    userCount: number | 0
    userTyping: string | null

}

const socketContext = createContext<SocketContext | null>(null);

export const useSocket = () => {

    const state = useContext(socketContext);

    if (!state) { throw new Error("no state present") }

    return state;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessage] = useState<Message[]>([]);
    const [userTyping, setUserTyping] = useState<string | null>(null)
    const [userCount, setUserCount] = useState<number | 0>(0)
    // const usercountRef = useRef<number | 0>(0)
    const groupIdRef = useRef<string | null>(null);
    const userIdRef = useRef<string | null>(null);

    const sendMessages = (msg: string, groupId: string) => {

        if (socket) {
            socket?.emit('message', { message: msg, groupId })
        }
    }

    const joinGroup = (groupId: string, userId: string) => {

        groupIdRef.current = groupId;
        userIdRef.current = userId;
        if (socket?.connected) {
            socket.emit('join-group', { groupId, userId });

        }
    }

    const isTyping = (groupId: string, userId: string) => {
        if (socket) {
            socket.emit('typing', { groupId, userId })
        }
    }

    const stoppedTyping = (groupId: string, userId: string) => {
        if (socket) {
            socket.emit('stop-typing', { groupId, userId })
        }
    }

    const leaveGroup = (groupId: string) => {
        if (socket) {
            socket.emit('leave-group', { groupId })
        }
    }

    useEffect(() => {
        const _socket = io('http://localhost:8000')

        _socket.on('connect', () => {
            console.log('connected')

            if (userIdRef.current && groupIdRef.current) {
                // console.log(userIdRef.current, groupIdRef.current, 'is called')
                _socket.emit('join-group', {
                    groupId: groupIdRef.current,
                    userId: userIdRef.current,
                })
            }
        })

        _socket.on('message', ({ message }) => {
            setMessage((prev) => [...prev, { content: message }])
        })

        _socket.on('userTyping', ({ userId }) => {
            setUserTyping(userId)
        })
        _socket.on('user-stopped-typing', () => {
            setUserTyping(null)
        })

        _socket.on('user-count', ({ count }) => {
            setUserCount(count)
            // usercountRef.current = count;
        })

        setSocket(_socket);

        return () => {
            _socket.disconnect();
            setSocket(undefined);
        }
    }, [])


    return (
        <socketContext.Provider value={{ messages, sendMessages, joinGroup, isTyping, userTyping, stoppedTyping, leaveGroup, userCount }}>
            {children}
        </socketContext.Provider>
    )
}