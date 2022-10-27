import Image from 'next/image'
import React, { useState } from 'react'
// Components
import FormInput from './FormInput'
import Button from './Button'
import OptionsDivider from './OptionsDivider'
import Alert from './Alert'
// Assets
import googleLogo from '../assets/google.png'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { regsiterUser } from '../redux/features/user'

const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { user, error, loading } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(regsiterUser({ email, username, password, confirmPassword }))
        if (user) {
            // redirect
        }
    }

    return (
        <form className='w-full space-y-4' onSubmit={handleSubmit}>
            {error && (
                <Alert message={error.error} />
            )}
            <FormInput
                label='Email:'
                props={{
                    type: 'email',
                    onChange: (e) => setEmail(e.target.value),
                }}
                hasError={error && error.location == 0}
            />
            <FormInput
                label='Username:'
                props={{
                    type: 'text',
                    onChange: (e) => setUsername(e.target.value),
                }}
                hasError={error && error.location == 1}
            />
            <FormInput
                label='Password:'
                props={{
                    type: 'password',
                    onChange: (e) => setPassword(e.target.value),
                    autoComplete: 'on',
                }}
                hasError={error && error.location == 2}
            />
            <FormInput
                label='Confirm Password:'
                props={{
                    type: 'password',
                    onChange: (e) => setConfirmPassword(e.target.value),
                    autoComplete: 'on',
                }}
                hasError={error && error.location == 3}
            />
            <Button
                label='Create Account'
                loading={loading}
                extraStyles='bg-highlight text-light-gray hover:bg-highlight-dark transition duration-100 ease'
            />
            <OptionsDivider />
            <Button
                label='Sign Up With Google'
                props={{ type: 'submit' }}
                extraStyles='bg-white text-black hover:bg-light-gray transition duration-100 ease'
            >
                <div className='absolute left-4 flex items-center'>
                    <Image
                        src={googleLogo}
                        alt='Google Logo'
                        width={30}
                        height={30}
                    />
                </div>
            </Button>
        </form>
    )
}

export default RegisterForm
