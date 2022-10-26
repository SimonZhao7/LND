import React from 'react'

const FormInput = ({ label, props, hasError, extraStyles }) => {
    return (
        <div className='w-full text-light-gray 2xl:text-xl'>
            <label className='mb-1'>{label}</label>
            <input
                {...props}
                required={props.required || false}
                className={`w-full h-[50px] 2xl:h-[65px] bg-space-gray p-5 outline-none rounded-md ${
                    hasError && 'ring-2 ring-red-400'
                } ${extraStyles}`}
            />
        </div>
    )
}

export default FormInput
