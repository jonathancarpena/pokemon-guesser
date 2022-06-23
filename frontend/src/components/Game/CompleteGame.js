import React from 'react'

function CompleteGame({ show }) {
    return (
        <div
            className={`
            ${show ? 'opacity-100 scale-100' : ' scale-50 opacity-0'}
            text-[7rem] fixed top-[45%] -translate-y-[50%]
            transition-all ease-in-out duration-[500ms] text-black
        `}>

            <div className={`
                ${show ? 'opacity-90 scale-100 ' : ' scale-50 opacity-0'}
                w-[500px] h-[500px] rounded-full border-[1.5rem] border-black
                fixed top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] 
                transition-all ease-in-out duration-[1500ms]
            `}></div>
            Done!
        </div>
    )
}

export default CompleteGame