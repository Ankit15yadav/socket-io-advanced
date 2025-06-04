'use client'

import { getStoredUser } from "@/lib/store-user-info"
import { User } from "@/types/user"
import { useRouter } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"

interface UserProverProps {
    children?: React.ReactNode
}

interface UserContext {
    setUserInfo: () => void
    // refreshUser: () => Promise<void>
    user: User | null
}


export const useUser = () => {

    const state = useContext(userContext);

    if (!state) {
        throw new Error("no state present")
    }

    return state;
}

const userContext = createContext<UserContext | null>(null)


export const UserProvider: React.FC<UserProverProps> = ({ children }) => {

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null)

    const setUserInfo = async () => {
        const email = localStorage.getItem('user-email')
        // console.log("Email from local", email)

        const StoredUser = await getStoredUser();

        if (!email || !StoredUser) {
            router.replace('/sign-in')
        }
        setUser(StoredUser)

    }


    useEffect(() => {
        // this is the middleware that ensures that user is logged in or not
        setUserInfo()
    }, [])

    return (
        <userContext.Provider value={{ setUserInfo, user }} >
            {children}
        </userContext.Provider>
    )
}