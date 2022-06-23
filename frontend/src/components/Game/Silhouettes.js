import React, { useRef, useState } from 'react'

// Utilities
import API from '../../lib/api'
import { DIFFICULTY } from '../../lib/constants'

// Icons
import { FaRegQuestionCircle } from 'react-icons/fa'
import { AiFillSound } from 'react-icons/ai'


export const SingleSilhoutte = ({ name, onAudioLoad, onImgLoad, random = false, correct = true, id, generation, shape = true, cry = true, idx }) => {
    const audioRef = useRef()
    const [soundOn, setSoundOn] = useState(false)


    function PokemonCry() {
        if (cry || correct) {
            audioRef.current.play()
            setSoundOn(true)
        }
    }

    return (
        <div onClick={PokemonCry} className={`${(correct || cry) ? 'active:scale-110' : ''}  w-[100px] h-[100px] relative cursor-pointer flex items-center justify-center transition-transform ease-linear duration-100`}>

            {/* Pokedex ID */}
            {(!random || correct) &&
                <span className='border-[3px] w-[45px] h-[45px] absolute -top-3 -left-3 flex items-center justify-center text-lg  font-arcade font-semibold text-black border-black rounded-full'>
                    <span>
                        {id}
                    </span>
                </span>

            }



            {/* Question Mark */}
            <FaRegQuestionCircle
                className={`
                ${correct ? 'opacity-0' : 'opacity-100'}
                ${shape ? 'text-white' : 'text-black'}
                absolute  text-[35px] 
                z-[20] top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]
                transition-all ease-in-out duration-200
                `}
            />



            {/* Pokemon Cry Audio */}
            {(cry || correct) &&
                <>
                    <audio
                        onEnded={() => setSoundOn(false)}
                        onLoadStart={() => onAudioLoad(idx)}
                        ref={audioRef}
                        src={`${API.audio}/${generation}/${id}`}
                    />
                    {soundOn &&
                        <AiFillSound className={`absolute text-[20px] z-[20] 
                             ${correct ? 'top-[50%] -translate-y-[50%] text-white' : '-bottom-5 text-black'}  left-[50%] -translate-x-[50%]
                             transition-all ease-in-out duration-200`} />
                    }
                </>

            }


            {/* Pokemon Image & Name */}
            <span className={`
            relative
            ${correct
                    ? `brightness-100`
                    : `${!shape ? 'opacity-0' : 'opacity-100'} brightness-0`
                }
                
            transition-all ease-in-out duration-200 z-0 select-none
            `}>
                <img
                    className='w-[75px] h-[75px] max-w-[75px] max-h-[75px] object-contain'
                    onLoad={() => onImgLoad(idx)}
                    src={`${API.image}/${generation}/${id}`}
                    alt={`pokemon-order-${idx}`} />

                <span className={`${correct ? 'visible -bottom-5' : 'hidden'} w-max absolute left-[50%] -translate-x-[50%] capitalize font-semibold`}>
                    {name}
                </span>


            </span>

        </div>
    )
}

function Silhouttes({ random, pokemons, guesses, difficulty, generation, setLoading }) {

    let imgTemp = [...pokemons]
    let audioTemp = [...pokemons]

    function onAudioLoad(index,) {
        console.log('Audio Loading ', index)
        audioTemp[index] = ''
        if (audioTemp.every((item) => item === '')) {
            console.log('ALL AUDIO LOADED')
            allLoaded()
        }
    }

    function onImgLoad(index) {
        console.log('Image Loading ', index)
        imgTemp[index] = ''
        if (imgTemp.every((item) => item === '')) {
            console.log('ALL IMAGES LOADED')
            allLoaded()
        }

    }

    function allLoaded() {
        if (DIFFICULTY[difficulty].cry && DIFFICULTY[difficulty].shape) {
            if (audioTemp.every((item) => item === '') && imgTemp.every((item) => item === '')) {
                setLoading(false)
            }
        } else if (DIFFICULTY[difficulty].cry && !DIFFICULTY[difficulty].shape) {
            if (audioTemp.every((item) => item === '')) {
                setLoading(false)
            }

        } else if (!DIFFICULTY[difficulty].cry && DIFFICULTY[difficulty].shape) {
            if (imgTemp.every((item) => item === '')) {
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }




    return (
        <>
            {pokemons.map((item, idx) => (
                <SingleSilhoutte
                    onImgLoad={onImgLoad}
                    onAudioLoad={onAudioLoad}
                    random={random}
                    key={`${item}-${idx}`}
                    cry={DIFFICULTY[difficulty].cry}
                    shape={DIFFICULTY[difficulty].shape}
                    generation={generation}
                    id={item.id}
                    name={item.name}
                    correct={guesses ? guesses[idx] === '' : true}
                    idx={idx}
                />
            ))}

        </>


    )
}

export default Silhouttes