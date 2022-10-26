import Image from 'next/image'
import React from 'react'
// Components
import FormInput from './FormInput'
import OptionsDivider from './OptionsDivider'
import Button from './Button'
// Assets
import googleLogo from '../assets/google.png'

const LoginForm = () => {
    return (
        <form className='w-full space-y-4'>
            <FormInput label='Email/Username:' props={{ type: 'text' }} />
            <FormInput
                label='Password:'
                props={{ type: 'password', autoComplete: 'on' }}
            />
            <Button
                label='Sign in'
                extraStyles='bg-highlight text-light-gray hover:bg-highlight-dark transition duration-100 ease'
            />
            <OptionsDivider />
            <Button
                label='Sign In With Google'
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

export default LoginForm
