import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
// Components
import FinishSetupForm from '../components/FinishSetupForm'
// Assets
import registerPhoto from '../assets/registerPhoto.jpg'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/features/user'
// Firebase
import { auth } from '../firebase'

const FinishSetup = ({ email }) => {
    const router = useRouter()
    const user = useSelector((state) => state.user.user)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser(email))
        if (Object.keys(user).length > 0 && auth?.currentUser?.email === email) {
            router.push('/loggedin')
            return
        }
        if (auth?.currentUser?.email !== email) {
            router.push('/login')
            return
        }
        setLoading(false)
    }, [])

    return (
        <>
            {!loading && (
                <main className='flex h-full'>
                    <FinishSetupForm />
                    <div className='flex-1 relative hidden lg:block'>
                        <Image
                            src={registerPhoto}
                            alt='register photo'
                            className='absolute opacity-50'
                            layout={'fill'}
                            priority={true}
                            objectFit='cover'
                        />
                    </div>
                </main>
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {
            email: context.query.email,
        },
    }
}

export default FinishSetup
