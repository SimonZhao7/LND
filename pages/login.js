import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
// Components
import LoginForm from '../components/LoginForm'
// Assets
import loginPhoto from '../assets/loginPhoto.jpeg'

const Login = () => {
    return (
        <main className='h-full flex'>
            <div className='hidden lg:block w-1/2 relative'>
                <Image
                    src={loginPhoto}
                    alt='login photo'
                    className='absolute opacity-50'
                    layout={'fill'}
                    objectFit='cover'
                />
            </div>
            <section className='p-12 flex flex-col justify-center h-full lg:w-1/2 lg:p-16'>
                <LoginForm />
                <div className='flex items-center justify-between mt-4 text-light-gray'>
                    <div className='hover:underline'>
                        <Link href={'/'}>Forgot Password?</Link>
                    </div>
                    <p className='hover:underline cursor-pointer'>
                        Don't have an account?
                    </p>
                </div>
            </section>
        </main>
    )
}

export default Login
