import React from 'react'

const Alert = ({ message }) => {
    return (
        <div className=' p-5 rounded-md bg-highlight text-white text-xl'>
            {message}
        </div>
    )
}

export default Alert
