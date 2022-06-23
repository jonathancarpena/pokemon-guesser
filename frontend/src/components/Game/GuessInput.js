import React, { useEffect, useRef, useState } from 'react'

import { MdSend } from 'react-icons/md'
import { ImCross, ImCheckmark } from 'react-icons/im'

function GuessInput({ input, setInput, reaction, gameState }) {
    const [focus, setFocus] = useState(false)
    const inputRef = useRef(null)
    useEffect(() => {
        if (document.activeElement === inputRef.current && input !== '') {
            setFocus(true)
        } else if (reaction !== null) {
            setFocus(true)
        } else {
            setFocus(false)
        }
    }, [inputRef, input, reaction])



    return (

        <div className={`${gameState === 'pause' ? 'blur-md' : ''} z-[70] w-screen h-max fixed left-0 bottom-[7rem] overflow-visible flex justify-center`}>

            <label
                htmlFor='guessInput'
                className={`
                border-4 text-black
                bg-white z-[80] relative
                ${focus
                        ? ` bottom-4 opacity-100 scale-125  drop-shadow-xl border-sky-500
                            ${reaction === false ? 'animate-wiggleFocus border-0 ring-4 ring-red-500' : ''} 
                            ${reaction === 'neutral' ? 'animate-wiggleFocus  border-0 ring-gray-400 ring-4' : ''} 
                            ${reaction === true ? 'animate-nodFocus  border-0 ring-green-500  ring-4' : ''} 
                            `
                        : ` bottom-0 opacity-90 scale-100 ring-gray-400 drop-shadow-md
                            ${reaction === false ? 'animate-wiggle  border-0 ring-red-500  ring-4' : ''} 
                            ${reaction === 'neutral' ? 'animate-wiggle border-0  ring-4' : ''} 
                            ${reaction === true ? 'animate-nod  border-0 ring-green-500  ring-4' : ''}  
                            `
                    }

                w-max rounded-xl 
                transition-[transform_opacity] ease-in-out duration-300
             
            
             `}>

                {reaction === false &&
                    <span className=' border-t-4 border-x-4 border-red-500 rounded-t-xl px-2 py-1 bg-white absolute -top-11 left-1.5 text-lg text-red-500 font-semibold flex space-x-2 items-center'>
                        <span>
                            Incorrect
                        </span>
                        <ImCross className=' text-red-500 inline-block' />
                    </span>}

                {reaction === 'neutral' &&
                    <span className='border-t-4 border-x-4 border-gray-400 rounded-t-xl px-2 py-1 bg-white absolute -top-11 left-1.5 text-lg text-gray-500 font-semibold flex space-x-2 items-center'>
                        <span>
                            Already Guessed That
                        </span>
                    </span>}

                {reaction === true &&
                    <span className=' border-t-4 border-x-4 border-green-500 rounded-t-xl px-2 py-1 bg-white absolute -top-11 left-1.5 text-lg text-green-500 font-semibold flex space-x-2 items-center'>
                        <span>Correct</span>
                        <ImCheckmark className=' inline-block' />
                    </span>}
                <button disabled={input === ''} type='submit' className={`
                         absolute right-3 top-[50%] -translate-y-[50%] 
                         cursor-pointer rounded-xl p-1
                         hover:bg-gray-200 transition-colors ease-in-out duration-150`}>
                    <MdSend className={`${focus ? 'text-sky-500' : 'text-gray-400'}  text-[1.5rem] `} />
                </button>

                <input
                    ref={inputRef}
                    id='guessInput'
                    placeholder='Guess Here...'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={`py-2 pl-4 pr-14 text-xl rounded-xl  z-[40] bg-inherit text-black focus:outline-none`}
                />
            </label>

        </div>



    )
}

export default GuessInput