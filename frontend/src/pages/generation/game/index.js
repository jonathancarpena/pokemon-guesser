import React, { useEffect, useState } from 'react'

// Utilities
import { shuffleArray } from '../../../lib/utils'

// Constants
import { POKEDEX, GEN_SLICE, DIFFICULTY } from '../../../lib/constants'

// Router
import { useParams, useNavigate } from 'react-router-dom'

// Icons
import { AiFillPlayCircle, AiFillMinusCircle } from 'react-icons/ai'

// Components
import Silhouettes from '../../../components/Generation/Game/Silhouettes'
import GuessInput from '../../../components/Generation/Game/GuessInput'
import Stopwatch from '../../../components/Generation/Game/Stopwatch'
import InstructionsModal from '../../../components/Generation/Game/InstructionsModal'
import GiveUpModal from '../../../components/Generation/Game/GiveUpModal'
import CompleteGame from '../../../components/Generation/Game/CompleteGame'
import Loading from '../../../components/Layout/Loading'
import { motion } from 'framer-motion'


const containerVariant = {
    initial: { opacity: 0, y: 200 },
    animate: {
        opacity: 1, y: 0,
        transition: {
            type: 'spring',
            mass: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.2
        }
    },
    exit: {
        opacity: 0,
        transition: {
            ease: 'easeInOut', duration: 0.5
        }
    }
}

function Game() {
    const { num: generation, difficulty } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [guesses, setGuesses] = useState(null)
    const [pokemons, setPokemons] = useState(null)
    const [time, setTime] = useState(0)
    const [gameState, setGameState] = useState('pause')
    const [isActive, setIsActive] = useState(false)
    const [giveUp, setGiveUp] = useState(false)
    const [input, setInput] = useState('')
    const [reaction, setReaction] = useState(null)



    // Setting Up Pokemons
    useEffect(() => {
        if (guesses === null && pokemons === null) {

            let allPokemons = POKEDEX.slice(GEN_SLICE[generation].start, GEN_SLICE[generation].end + 1)
            if (difficulty !== 'master') {
                if (DIFFICULTY[difficulty].random) {
                    allPokemons = shuffleArray(allPokemons).splice(0, 30)
                } else {
                    const max = (GEN_SLICE[generation].end + 1) - 30
                    const slotEnd = Math.floor(Math.random() * max) + GEN_SLICE[generation].start
                    const slotStart = slotEnd - 30
                    allPokemons = POKEDEX.slice(slotStart, slotEnd)
                }
            }

            let onlyNames = allPokemons.map((item) => item.name)
            setGuesses([...onlyNames])
            setPokemons([...allPokemons])

        }
    }, [difficulty, guesses, generation, pokemons])



    // Game State - In Progress
    useEffect(() => {
        if (gameState === 'progress' && guesses.every((item) => item !== '' && !loading)) {
            setIsActive(true)
        }
    }, [gameState, guesses, loading])


    // Game State - Completed
    useEffect(() => {
        if (guesses !== null && guesses.length >= 30 && guesses.every((item) => item === '')) {
            setGameState('complete')
            setIsActive(false)
            setTimeout(() => {
                navigate(
                    `/generation/${generation}/${difficulty}/game/results`,
                    { state: { score: time } }
                )
            }, [2500])

        }
    }, [guesses, generation, difficulty, navigate, time])



    function handleSubmit(e) {
        e.preventDefault()

        if (input !== '') {
            if (guesses.includes(input.toLowerCase())) {
                const temp = [...guesses]
                const index = temp.findIndex((item) => item === input)
                temp[index] = ""
                setGuesses([...temp])
                setReaction(true)
                setInput('')
                setTimeout(() => {
                    setReaction(null)
                }, [1000])
            } else if (pokemons.find(({ name }) => name === input.toLowerCase()) && !guesses.includes(input.toLowerCase())) {
                setReaction('neutral')
                setInput('')
                setTimeout(() => {
                    setReaction(null)
                }, [1000])
            }
            else {
                setReaction(false)
                setInput('')
                setTimeout(() => {
                    setReaction(null)
                }, [1000])
            }
        }

    }


    function handleGiveUp() {
        navigate(
            `/generation/${generation}/${difficulty}/game/incomplete`,
            {
                state: {
                    time: time,
                    guesses: guesses,
                    pokemons: pokemons
                }
            }
        )

    }

    return (
        <motion.div
            variants={containerVariant}
            initial={false}
            animate="animate"
            exit="exit"
            className={`${difficulty === "master" ? 'py-10' : ''} `}>

            {loading && <Loading />}


            <InstructionsModal
                show={gameState === 'pause' && !loading}
                setGameState={setGameState}
                difficulty={difficulty}
                generation={generation}
            />

            <GiveUpModal
                giveUp={giveUp}
                setGiveUp={setGiveUp}
                handleGiveUp={handleGiveUp}
            />

            <CompleteGame
                show={gameState === 'complete'}
            />



            {!loading &&
                <div className={` ${gameState === 'pause' ? 'blur-md' : ''}  select-none flex space-x-8 mb-8`}>
                    <button onClick={() => navigate(`/generation/${generation}/difficulty`)} className='w-[100px] border-[10px] border-[#707176] text-[#707176] font-arcade font-semibold flex-0   bg-white rounded-xl flex flex-col space-y-1 items-center justify-center transition-all duration-150 ease-in-out active:scale-90'>
                        <AiFillPlayCircle className='text-2xl rotate-180' />
                        <span>Back</span>
                    </button>
                    <Stopwatch
                        time={time}
                        setTime={setTime}
                        isActive={isActive}
                    />
                    <button onClick={() => setGiveUp(true)} className='w-[100px] border-[10px] border-[#cf3838] text-[#cf3838] font-arcade font-semibold flex-0   bg-white rounded-xl flex flex-col space-y-1 items-center justify-center transition-all duration-150 ease-in-out active:scale-90'>
                        <AiFillMinusCircle className='text-2xl' />
                        <span>Quit</span>
                    </button>
                </div>
            }





            {(pokemons && guesses) &&
                <div className={`
                ${gameState === 'pause' ? 'blur-md' : ''} 
                ${loading ? 'hidden' : 'visible'} 
                rounded-xl transition-all ease-in-out 
                border-[12px] border-t-[#A1884F] border-l-[#A1884F] border-r-[#795F28] border-b-[#795F28] bg-pokemonStorage bg-center bg-repeat
                `}>
                    <ul className={`
                ${gameState === 'pause' ? 'blur-md' : ''} 
                ${loading ? 'hidden' : 'visible'} 
                ${difficulty === 'master' ? 'grid-cols-9' : 'grid-cols-6 grid-rows-5'} 
                grid  gap-6 p-6
                transition-all ease-in-out 
                border-[12px] border-l-[#E0F8A7] border-t-[#E0F8A7] border-r-[#56861E] border-b-[#56861E] select-none
                `}>
                        <Silhouettes
                            setLoading={setLoading}
                            random={DIFFICULTY[difficulty].random}
                            difficulty={difficulty}
                            generation={generation}
                            pokemons={pokemons}
                            guesses={guesses}
                        />
                    </ul>
                </div>

            }


            {(!loading && !giveUp) &&
                <form onSubmit={handleSubmit} >
                    <GuessInput
                        gameState={gameState}
                        reaction={reaction}
                        input={input}
                        setInput={setInput}

                    />
                </form>
            }

        </motion.div >
    )
}

export default Game