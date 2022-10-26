import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
// Components
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'
// Assets
import loginPhoto from '../assets/loginPhoto.jpeg'
import registerPhoto from '../assets/registerPhoto.jpg'
// Framer Motion
import { motion } from 'framer-motion'
// Hooks
import { useMediaQuery } from '../hooks/useMediaQuery'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const screenLg = useMediaQuery('(min-width: 1024px)')

    const formVariants = screenLg
        ? { login: { x: '100%' }, register: { x: '0%' } }
        : {
              login: { x: '0%' },
              register: { x: '0%' },
          }

    const imageVariants = {
        show: { opacity: [0.3, 0.35, 0.4, 0.6, 0.85, 1] },
        hide: { opacity: 0 },
    }

    return (
        <main className='h-full flex relative'>
            <motion.div
                className='flex-1 relative'
                animate={isLogin ? 'show' : 'hide'}
                variants={imageVariants}
            >
                <Image
                    src={loginPhoto}
                    alt='login photo'
                    className='absolute opacity-50'
                    layout={'fill'}
                    priority={true}
                    objectFit='cover'
                />
            </motion.div>
            <motion.div
                className={'flex-1 relative'}
                animate={isLogin ? 'hide' : 'show'}
                variants={imageVariants}
            >
                <Image
                    src={registerPhoto}
                    alt='register photo'
                    className='absolute opacity-50'
                    layout={'fill'}
                    objectFit='cover'
                />
            </motion.div>
            <motion.section
                animate={isLogin ? 'login' : 'register'}
                variants={formVariants}
                className={`p-12 flex flex-col justify-center h-full w-full lg:w-1/2 lg:p-16 2xl:p-20 absolute bg-background`}
                initial={formVariants.login}
                transition={{ duration: screenLg ? 0.75 : 0 }}
            >
                <h1 className='text-4xl text-light-gray mb-8 text-center 2xl:text-5xl font-nunito'>
                    {isLogin ? 'Login to LND' : 'Sign up to LND'}
                </h1>
                {isLogin ? (
                    <div className='max-w-xl 2xl:max-w-none w-full mx-auto'>
                        <LoginForm />
                        <div className='flex items-center justify-between mt-4 text-light-gray 2xl:text-xl'>
                            <div className='hover:underline'>
                                <Link href={'/'}>Forgot Password?</Link>
                            </div>
                            <p
                                className='hover:underline cursor-pointer'
                                onClick={() => setIsLogin(false)}
                            >
                                Don't have an account?
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <RegisterForm />
                        <p
                            className='mt-4 text-light-gray cursor-pointer hover:underline text-right 2xl:text-xl'
                            onClick={() => setIsLogin(true)}
                        >
                            Already have an account?
                        </p>
                    </>
                )}
            </motion.section>
        </main>
    )
}

export default Login
