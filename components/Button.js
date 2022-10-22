import React from 'react'

const Button = ({ label, extraStyles, children }) => {
    return (
        <button
            className={`flex items-center justify-center relative h-[50px] w-full rounded-full ${extraStyles}`}
        >
            {children}
            {label}
        </button>
    )
}

export default Button