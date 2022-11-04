import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
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
// Redux
import { useDispatch } from 'react-redux'
import { clearErrors } from '../redux/features/user'
// Firebase
import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const screenLg = useMediaQuery('(min-width: 1024px)')
    const router = useRouter()
    const dispatch = useDispatch()

    onAuthStateChanged(auth, (user) => {
        if (user && !user.emailVerified) {
            router.push('/verify')
            return
        }

        if (user) {
            router.push(`/setup?email=${user.email}`)
            return
        }
    })

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
                <legend className='register-legend'>
                    {isLogin ? 'Login to LND' : 'Sign up to LND'}
                </legend>
                {isLogin ? (
                    <div className='register-sizing'>
                        <LoginForm />
                        <div className='flex items-center justify-between mt-4 text-light-gray 2xl:text-xl'>
                            <div className='hover:underline'>
                                <Link href={'/'}>Forgot Password?</Link>
                            </div>
                            <p
                                className='hover:underline cursor-pointer'
                                onClick={() => {
                                    setIsLogin(false)
                                    dispatch(clearErrors())
                                }}
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
                            onClick={() => {
                                setIsLogin(true)
                                dispatch(clearErrors())
                            }}
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
