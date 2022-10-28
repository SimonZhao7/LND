import Image from 'next/image'
import React, { useState } from 'react'
// Components
import FormInput from './FormInput'
import OptionsDivider from './OptionsDivider'
import Button from './Button'
import Alert from './Alert'
// Assets
import googleLogo from '../assets/google.png'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, googleLogin } from '../redux/features/user'

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, loading, user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
    }

    return (
        <form className='w-full space-y-4' onSubmit={handleSubmit}>
            {error && <Alert message={error.error} />}
            <FormInput
                label='Email/Username:'
                props={{
                    type: 'text',
                    onChange: (e) => setEmail(e.target.value),
                }}
                hasError={error}
            />
            <FormInput
                label='Password:'
                props={{
                    type: 'password',
                    autoComplete: 'on',
                    onChange: (e) => setPassword(e.target.value),
                }}
                hasError={error}
            />
            <Button
                label='Sign in'
                props={{ type: 'submit' }}
                loading={loading}
                extraStyles='bg-highlight text-light-gray hover:bg-highlight-dark transition duration-100 ease'
            />
            <OptionsDivider />
            <Button
                label='Sign In With Google'
                extraStyles='bg-white text-black hover:bg-light-gray transition duration-100 ease'
                props={{ onClick: () => dispatch(googleLogin()), type: 'button' }}
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

export default LoginForm
