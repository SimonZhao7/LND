import React from 'react'
import Spinner from './Spinner'

const Button = ({ label, extraStyles, loading, children, props }) => {
    return (
        <button
            {...props}
            className={`flex items-center justify-center relative h-[50px] 2xl:h-[65px] w-full rounded-full 2xl:text-xl ${extraStyles}`}
        >
            {children}
            {loading ? (
                <Spinner height={'[40px]'} />
            ) : (
                <p>{label}</p>
            )}
        </button>
    )
}

export default Button
