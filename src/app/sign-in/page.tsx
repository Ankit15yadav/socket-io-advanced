'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUser } from '@/context/userprovider'
import { StoreUserLocalInfo } from '@/lib/store-user-info'
import { SignIn } from '@/types/auth'
import { Eye, EyeClosedIcon, Loader, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'


const SignInPage = () => {


    const router = useRouter();
    const { setUserInfo } = useUser()

    const [formData, setFormData] = useState<SignIn>({
        password: '',
        username: '',
        loading: false
    })
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        if (!formData.username?.trim() || !formData.password?.trim()) {
            toast.error("All fields are required")
        }

        try {
            setFormData({
                ...formData,
                loading: true
            })
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            // console.log(data)



            if (!response.ok) {
                toast.error(`${data.message}`)
            }

            toast.success("Login successfull")
            // console.log(data?.user)
            // set the user email in the local
            localStorage.setItem("user-email", data?.user?.email)

            console.log(data?.user)

            const user = {
                id: data?.user?.id as string,
                userName: data?.user?.userName as string,
                status: data?.user?.Status as string,
                email: data?.user?.email as string
            }

            StoreUserLocalInfo(user)
            setUserInfo()
            router.replace("/")


        } catch (error) {
            console.log('error')
        }
        finally {
            setFormData({
                ...formData,
                loading: false
            })
        }

        return true
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div
            className=' w-full min-h-screen flex flex-col items-center justify-center'
        >
            {/*  sign in form */}
            <h1 className='font-medium text-lg mb-6'>
                Welcome to Chat app
            </h1>
            <form className='min-w-sm flex flex-col gap-y-4'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-y-2'>
                    <Label htmlFor='username'>
                        Email
                    </Label>
                    <Input
                        id='username'
                        name='username'
                        type='email'
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <Label htmlFor='password'>
                        Password
                    </Label>
                    <div className='relative'>
                        <Input
                            className={''}
                            id='password'
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleInputChange}
                        // onFocus={() => setFocus(true)}
                        // onBlur={() => setFocus(false)}
                        />
                        {
                            showPassword ?
                                (
                                    <EyeClosedIcon
                                        size={20}
                                        className='absolute right-2 bottom-1.5 cursor-pointer'
                                        onClick={togglePasswordVisibility}
                                    />
                                )
                                :
                                (
                                    <Eye
                                        size={20}
                                        className='absolute right-2 bottom-1.5 cursor-pointer'
                                        onClick={togglePasswordVisibility}
                                    />
                                )
                        }

                    </div>

                </div>
                <Button
                    type='submit'
                    className='cursor-pointer'
                    disabled={!formData.password || !formData.username}
                >
                    {
                        !formData?.loading ? ('Login')
                            :
                            (
                                <div className='flex gap-x-3 items-center'>
                                    <Loader className='animate-spin' />
                                    <span>
                                        Loading...
                                    </span>

                                </div>
                            )
                    }
                </Button>

            </form>

        </div>
    )
}

export default SignInPage