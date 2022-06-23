import React from 'react'


// Icons
import { MdCatchingPokemon } from 'react-icons/md'

function Loading() {
    return (
        <div className='absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] flex items-center flex-col'>
            <div className='animate-bounce'>
                <MdCatchingPokemon className='animate-spin-slow text-[20rem] inline-block' />
            </div>

            <span className='text-[3rem] bottom-12 relative'>Loading</span>

        </div>

    )
}

export default Loading