import React, { useEffect, useState } from 'react'

// Router
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'

// Utils
import { convertMsToTime } from '../../../lib/utils'

// Components
import Loading from '../../../components/Layout/Loading'
import Silhouttes from '../../../components/Game/Silhouettes'

// Icons
import { FaUndo } from 'react-icons/fa'

function Incomplete() {
    const { num: generation, difficulty } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [correct, setCorrect] = useState(null)
    const [missed, setMissed] = useState(null)
    const [loading, setLoading] = useState(true)

    // guesses
    // pokemons


    useEffect(() => {
        if (!location.state) {
            navigate('/')
        } else {
            if (correct === null && missed === null) {
                const { guesses, pokemons } = location.state
                console.log(location.state)
                const correctTemp = []
                let missedTemp = pokemons.filter((item) => guesses.includes(item.name))
                guesses.forEach((item, idx) => {
                    if (item === '') {
                        correctTemp.push(pokemons[idx])
                    }
                })
                setCorrect([...correctTemp])
                setMissed([...missedTemp])
            }

        }
    })

    if (!correct && !missed) {
        return <Loading />
    }
    return (
        <div className='flex flex-col space-y-5'>
            <div>
                <h2>Generation {generation}</h2>
                <h2 className='capitalize'>Difficulty {difficulty.replace('-', ' ')}</h2>
                <h2>Your Time: {convertMsToTime(location.state.time)}</h2>
                <Link to={`/generation/${generation}/${difficulty}/game`}>
                    <button className='flex items-center space-x-2 text-lg bg-white rounded-md w-max p-2'>
                        <span>Retry</span> <FaUndo />
                    </button>
                </Link>


            </div>

            <div className='flex flex-col space-y-10'>
                <div className='bg-white p-10 rounded-lg flex flex-col space-y-5'>
                    <h1 className='text-xl font-semibold'>Correct: {correct.length}</h1>
                    <ul className='grid grid-cols-9 gap-16'>
                        <Silhouttes
                            setLoading={setLoading}
                            random={false}
                            difficulty={difficulty}
                            generation={generation}
                            pokemons={correct}
                        />
                    </ul>

                </div>

                <div className='bg-white p-10 rounded-lg flex flex-col space-y-5'>
                    <h1 className='text-xl font-semibold'>
                        Missed: {missed.length}
                    </h1>
                    <ul className='grid grid-cols-9 gap-16'>
                        <Silhouttes
                            setLoading={setLoading}
                            random={false}
                            difficulty={difficulty}
                            generation={generation}
                            pokemons={missed}
                        />
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default Incomplete