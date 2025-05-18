'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignIn } from '@/types/auth'
import { Eye, EyeClosedIcon, Loader, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'


const SignInPage = () => {

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

            if (response.ok) {
                toast.success("Login successfull")
            }

            return;

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
            className='bg-pink-100 w-full min-h-screen flex flex-col items-center justify-center'
        >
            {/*  sign in form */}
            <h1 className='font-medium text-lg'>
                Welcome to Chat app
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