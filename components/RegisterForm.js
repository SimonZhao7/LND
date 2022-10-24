import Image from 'next/image'
import React from 'react'
// Components
import FormInput from './FormInput'
import Button from './Button'
import OptionsDivider from './OptionsDivider'
// Assets
import googleLogo from '../assets/google.png'

const RegisterForm = () => {
    return (
        <form className='w-full space-y-4'>
            <FormInput label='Email:' props={{ type: 'email' }} />
            <FormInput label='Username:' props={{ type: 'text' }} />
            <FormInput label='Password:' props={{ type: 'password' }} />
            <FormInput label='Confirm Password:'  props={{ type: 'password' }} />
            <Button
                label='Create Account'
                extraStyles='bg-highlight text-light-gray hover:bg-highlight-dark transition duration-100 ease'
            />
            <OptionsDivider />
            <Button
                label='Sign Up With Google'
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
