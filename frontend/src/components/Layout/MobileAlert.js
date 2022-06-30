import React from 'react'

import { FaDesktop } from 'react-icons/fa'
function MobileAlert() {
    return (
        <div className='flex flex-col items-center space-y-5 font-arcade text-center '>
            <FaDesktop className='text-[7rem] text-gray-500' />
            <h1 className='font-bold text-xl text-black'>Website is currently only available on Desktop.</h1>
        </div>
    )
}

export default MobileAlert