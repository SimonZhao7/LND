import React from 'react'

const FormInput = ({ label, props }) => {
    return (
        <div className='w-full text-light-gray'>
            <label className='mb-1'>{label}</label>
            <input
                {...props}
                className='w-full h-[50px] bg-space-gray p-5 outline-none rounded-md'
            />
        </div>
    )
}

export default FormInput