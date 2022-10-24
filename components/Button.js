import React from 'react'

const Button = ({ label, extraStyles, children }) => {
    return (
        <button
            className={`flex items-center justify-center relative h-[50px] 2xl:h-[65px] w-full rounded-full 2xl:text-xl ${extraStyles}`}
        >
            {children}
            {label}
        </button>
    )
}

export default Button
