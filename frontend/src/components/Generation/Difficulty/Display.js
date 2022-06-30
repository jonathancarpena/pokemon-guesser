import React, { useRef, useState } from 'react'

// Utilities
import API from '../../../lib/api'
import { DIFFICULTY } from '../../../lib/constants'

// Icons
import { FaRegQuestionCircle } from 'react-icons/fa'
import { AiFillSound } from 'react-icons/ai'

// Images
import Ex1 from '../../../images/misc/ex1.png'
import Ex2 from '../../../images/misc/ex2.png'
import Ex3 from '../../../images/misc/ex3.png'
const Examples = [Ex1, Ex2, Ex3]

function SingleSilhoutte({ num, cry, shape, random }) {
    const audioRef = useRef(null)
    const [audioOn, setAudioOn] = useState(false)
    function PokemonCry() {
        if (cry) {
            audioRef.current.play()
            setAudioOn(true)
        }
    }
    return (
        <div className=' active:scale-110 relative w-[200px] h-[200px] flex justify-center items-center cursor-pointer transition-transform ease-linear duration-100 overflow-hidden' onClick={PokemonCry}>

            <div className='w-full h-full bg-white absolute rounded-xl opacity-50'></div>
            {!random &&
                <span className='border-[3px] w-[45px] h-[45px] absolute top-1 left-1 flex items-center justify-center text-lg  font-arcade font-semibold text-black border-black rounded-full'>
                    <span>
                        {num + 1}
                    </span>
                </span>
            }


            <FaRegQuestionCircle
                className={`
                ${shape ? "text-white" : "text-[#000000]"}
                    absolute  text-[90px] 
                    z-[20] top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]
                transition-all ease-in-out duration-200
                `}
            />
            {shape &&
                <img src={Examples[num]} alt={Examples[num]} className='brightness-0 w-[150px] h-[150px] object-contain' />
            }

            <audio
                onEnded={() => setAudioOn(false)}
                ref={audioRef}
                src={`${API.audio}/1/${num + 1}`}
            />
            {audioOn &&
                <AiFillSound className={`absolute text-[20px] z-[20] 
              bottom-1 text-black  left-[50%] -translate-x-[50%]
                 transition-all ease-in-out duration-200`} />
            }
        </div>
    )


}
function Display({ difficulty }) {
    // bg-[#97C85F] 
    return (

        <div className=' ml-10 bg-pokemonStorage  rounded-xl  border-[12px] border-t-[#9F874F] border-l-[#9F874F] border-r-[#775F27] border-b-[#775F27]'>
            <div className='w-full h-full flex items-center space-x-5 justify-center border-[12px] border-l-[#E0F8A7] border-t-[#E0F8A7] border-r-[#56861E] border-b-[#56861E] px-5 '>
                {DIFFICULTY[difficulty].random
                    ? <>
                        <SingleSilhoutte num={2} random={true} shape={DIFFICULTY[difficulty].shape} cry={DIFFICULTY[difficulty].cry} />
                        <SingleSilhoutte num={0} random={true} shape={DIFFICULTY[difficulty].shape} cry={DIFFICULTY[difficulty].cry} />
                        <SingleSilhoutte num={1} random={true} shape={DIFFICULTY[difficulty].shape} cry={DIFFICULTY[difficulty].cry} />
                    </>
                    : <>
                        <SingleSilhoutte num={0} random={false} shape={DIFFICULTY[difficulty].shape} cry={DIFFICULTY[difficulty].cry} />
                        <SingleSilhoutte num={1} random={false} shape={DIFFICULTY[difficulty].shape} cry={DIFFICULTY[difficulty].cry} />
                        <SingleSilhoutte num={2} random={false} shape={DIFFICULTY[difficulty].shape} cry={DIFFICULTY[difficulty].cry} />
                    </>
                }
            </div>


        </div>


    )
}

export default Display