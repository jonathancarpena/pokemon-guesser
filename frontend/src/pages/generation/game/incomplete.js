import React, { useEffect, useState } from 'react'

// Router
import { useParams, useLocation, useNavigate } from 'react-router-dom'

// Utils
import { convertMsToTime } from '../../../lib/utils'

// Components
import Loading from '../../../components/Layout/Loading'
import Silhouttes from '../../../components/Generation/Game/Silhouettes'
import { motion } from 'framer-motion'


const containerVariant = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            type: "spring",
            ease: "easeInOut",
            duration: 0.25
        }
    },
    exit: {
        y: 200, opacity: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
            ease: 'easeInOut'
        }
    }
}


function Incomplete() {
    const { num: generation, difficulty } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(true)
    const [time, setTime] = useState(null)
    const [correct, setCorrect] = useState(null)

    useEffect(() => {

        if (location.state) {
            const { time: score, pokemons, guesses } = location.state
            if (results === null && time === null && correct === null) {
                const num = guesses.filter((item) => item === "").length
                const updatedPokemons = []
                pokemons.forEach((item) => {
                    let temp = { ...item }
                    if (!guesses.includes(item.name)) {
                        temp['result'] = 'correct'

                    } else {
                        temp['result'] = 'wrong'
                    }
                    updatedPokemons.push(temp)
                })

                setCorrect(num)
                setResults([...updatedPokemons])
                setTime(score)
            }
        } else {
            navigate('/')
        }
    }, [location.state, results, time, correct, navigate])



    if (!results) {
        return <Loading />
    }
    return (
        <motion.div
            variants={containerVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${difficulty === 'master' ? 'py-16' : ''} `}>



            <div className=' bg-white rounded-xl'>

                <div className='select-none flex space-x-6 p-8 items-end bg-stone-500 text-white' >
                    <span className='text-2xl font-semibold'>{`Score: ${correct}/${results.length}`}</span>
                    <span className='text-xl '>Time: <span className='font-semibold'>{convertMsToTime(time)}</span></span>
                    <span className='text-xl '>Generation: <span className='font-semibold'>{generation}</span></span>
                    <span className='capitalize text-xl'>Difficulty: <span className='font-semibold'>{difficulty}</span></span>
                </div>

                <ul className={`${loading ? 'blur-md' : ''}  
                select-none grid 
                ${difficulty === 'master' ? 'grid-cols-9' : 'grid-cols-6 grid-rows-5'} 
                gap-6 p-8 `}>
                    <Silhouttes
                        setLoading={setLoading}
                        random={false}
                        difficulty={difficulty}
                        generation={generation}
                        pokemons={results}
                    />
                </ul>


            </div>
        </motion.div>
    )
}

export default Incomplete