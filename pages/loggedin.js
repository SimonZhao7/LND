import React, { useState } from 'react'
import { useRouter } from 'next/router'
// Components
import Button from '../components/Button'
// Firebase
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'

const LoggedIn = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    onAuthStateChanged(auth, user => {
        if (!user) {
            router.push('/login')
            return
        }
        setLoading(false)
    })

    return (
        <>
            {!loading && (
                <div className='flex items-center justify-center'>
                    <Button
                        label={'Sign Out'}
                        props={{
                            onClick: () => {
                                signOut(auth)
                            },
                        }}
                        extraStyles={'bg-highlight text-white max-w-2xl mx-auto'}
                    />
                </div>
            )}
        </>
    )
}

export default LoggedIn
