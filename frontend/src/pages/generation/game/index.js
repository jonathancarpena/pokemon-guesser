import React, { useEffect, useState, useMemo } from 'react'

// Utilities
import { shuffleArray } from '../../../lib/utils'

// Constants
import { POKEDEX, GEN_SLICE, RANDOM_LEVELS } from '../../../lib/constants'

// Router
import { useParams, useNavigate } from 'react-router-dom'

// Components
import Silhouettes from '../../../components/Game/Silhouettes'
import GuessInput from '../../../components/Game/GuessInput'
import Stopwatch from '../../../components/Game/Stopwatch'
import InstructionsModal from '../../../components/Game/InstructionsModal'
import GiveUpModal from '../../../components/Game/GiveUpModal'
import CompleteGame from '../../../components/Game/CompleteGame'
import Loading from '../../../components/Layout/Loading'


function Game() {
    const { num: generation, difficulty } = useParams()
    const navigate = useNavigate()
    const difficultLevel = useMemo(() => RANDOM_LEVELS.includes(difficulty), [difficulty, RANDOM_LEVELS])
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
            if (difficultLevel) {
                allPokemons = shuffleArray(allPokemons)
            }
            let onlyNames = allPokemons.map((item) => item.name)
            setGuesses([...onlyNames])
            setPokemons([...allPokemons])

        }
    }, [difficulty, guesses, difficultLevel, generation, pokemons])



    // Game State - In Progress
    useEffect(() => {
        if (gameState === 'progress' && guesses.every((item) => item !== '' && !loading)) {
            setIsActive(true)
        }
    }, [gameState, guesses])


    // Game State - Completed
    useEffect(() => {
        if (guesses !== null && guesses.every((item) => item === '')) {
            setGameState('complete')
            setIsActive(false)

            setTimeout(() => {
                navigate(
                    `/generation/${generation}/${difficulty}/game/results`,
                    { state: { score: time } }
                )
            }, [2500])

        }
    }, [guesses])



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
        <div>

            {loading && <Loading />}

            {(gameState === 'pause' && !loading) &&
                <InstructionsModal
                    setGameState={setGameState}
                    difficulty={difficulty}
                    generation={generation}
                />
            }

            {giveUp &&
                <GiveUpModal
                    giveUp={giveUp}
                    setGiveUp={setGiveUp}
                    handleGiveUp={handleGiveUp}
                />
            }


            <CompleteGame show={gameState === 'complete'} />

            <h1 className='text-2xl'>Generation {generation}</h1>

            {gameState === 'progress' &&
                <div className='  flex space-x-5'>
                    <Stopwatch
                        time={time}
                        setTime={setTime}
                        isActive={isActive}
                    />
                    <button onClick={() => setGiveUp(true)} className='bg-red-500 text-white px-5 rounded-xl'>
                        Give Up
                    </button>
                </div>
            }




            {(pokemons && guesses) &&
                <ul className={`${gameState === 'pause' ? 'blur-md' : ''} ${loading ? 'hidden' : 'visible'} grid grid-cols-9  gap-16 py-20 transition-all ease-in-out`}>
                    <Silhouettes
                        setLoading={setLoading}
                        random={RANDOM_LEVELS.includes(difficulty)}
                        difficulty={difficulty}
                        generation={generation}
                        pokemons={pokemons}
                        guesses={guesses}
                    />
                </ul>
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

        </div >
    )
}

export default Game