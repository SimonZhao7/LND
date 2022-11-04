import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// Components
import FormInput from './FormInput'
import Button from './Button'
import Alert from './Alert'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { linkEmailAccount } from '../redux/features/user'

const FinishSetupForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector((state) => state.user.user)
    const error = useSelector((state) => state.user.error)
    const loading = useSelector((state) => state.user.loading)
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(linkEmailAccount({ username, password, confirmPassword }))
    }

    useEffect(() => {
        if (Object.keys(user).length > 0) {
            router.push('/loggedin')
            return
        }
    }, [user])

    return (
        <div className='flex-1 flex items-center'>
            <form
                className='p-12 flex-1 space-y-4 register-sizing'
                onSubmit={handleSubmit}
            >
                <legend className='register-legend'>
                    Finish Setting Up Your Account
                </legend>
                {error && <Alert message={error.error} />}
                <FormInput
                    label='Username:'
                    props={{
                        type: 'text',
                        onChange: (e) => setUsername(e.target.value),
                    }}
                    hasError={error?.location === 0}
                />
                <FormInput
                    label='Password:'
                    props={{
                        type: 'password',
                        autoComplete: 'on',
                        onChange: (e) => setPassword(e.target.value),
                    }}
                    hasError={error?.location === 1}
                />
                <FormInput
                    label='Confirm Password:'
                    props={{
                        type: 'password',
                        autoComplete: 'on',
                        onChange: (e) => setConfirmPassword(e.target.value),
                    }}
                    hasError={error?.location === 2}
                />
                <Button
                    label={'Create Account'}
                    props={{ type: 'submit' }}
                    loading={loading}
                    extraStyles='purple-btn'
                />
            </form>
        </div>
    )
}

export default FinishSetupForm
