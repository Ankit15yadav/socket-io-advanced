'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignIn, SignUp } from '@/types/auth'
import { Eye, EyeClosedIcon, Loader, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'


const SignInPage = () => {

    const router = useRouter()

    const [formData, setFormData] = useState<SignUp>({
        password: '',
        username: '',
        email: '',
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
        if (!formData.username?.trim() || !formData.password?.trim() || !formData.email?.trim()) {
            toast.error("All fields are required")
        }

        try {
            setFormData({
                ...formData,
                loading: true
            })
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()
            // console.log(data)

            if (response.ok) {
                toast.success("Registered successfully")
                router.replace("/sign-in")
            }

            else if (!response.ok) {
                toast.error(`${data.message}`)
            }

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
            className='w-full min-h-screen flex flex-col items-center justify-center'
        >
            {/*  sign in form */}
            <h1 className='font-medium text-xl mb-6'>
                Register to Chat app
            </h1>
            <form className='min-w-sm flex flex-col gap-y-4'
                onSubmit={handleSubmit}
            >
                <div className='flex flex-col gap-y-2'>
                    <Label htmlFor='username'>
                        Username
                    </Label>
                    <Input
                        id='username'
                        name='username'
                        type='text'
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <Label htmlFor='email'>
                        Email
                    </Label>
                    <Input
                        id='email'
                        name='email'
                        type='email'
                        value={formData.email}
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
                        !formData?.loading ? ('Register')
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