import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// Components
import Button from '../components/Button'
// Firebase
import { auth } from '../firebase'
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth'

const Verify = () => {
    const router = useRouter()
    const [tracker, setTracker] = useState(true)
    const [timer, setTimer] = useState(0)

    onAuthStateChanged(auth, (user) => {
        if (router.isReady) {
            if (!user) {
                router.push('/login')
                return
            }

            if (user.emailVerified) {
                router.push('/loggedin')
                return
            }
        }
    })

    useEffect(() => {
        const timer = setInterval(async () => {
            if (auth.currentUser) {
                await auth.currentUser.reload()
            }
            setTracker(!tracker)
        }, 1500)

        return () => {
            clearInterval(timer)
        }
    })

    useEffect(() => {
        const resendDelay = setInterval(() => {
            setTimer((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(resendDelay)
    })

    const resendEmailLink = async () => {
        await sendEmailVerification(auth.currentUser)
        setTimer(60)
    }

    return (
        <main className='p-16 text-white font-nunito space-y-4 pt-40 2xl:space-y-8 2xl:p-20 2xl:pt-52'>
            <h1 className='text-4xl md:text-5xl 2xl:text-6xl'>
                Verify your email.
            </h1>
            <h3 className='text-xl 2xl:text-2xl'>
                Please verify your email by clicking on the link on the email we
                sent you.
            </h3>
            <Button
                extraStyles={`purple-btn max-w-2xl ${
                    timer > 0 && 'bg-highlight-dark cursor-not-allowed'
                }`}
                label={
                    timer > 0
                        ? `Email Confirmation Sent (${timer}s)`
                        : 'Resend Email'
                }
                props={{
                    onClick: resendEmailLink,
                    disabled: timer > 0,
                }}
            />
        </main>
    )
}

export default Verify
