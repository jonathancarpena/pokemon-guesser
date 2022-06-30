import React, { useEffect, useState } from 'react'

// Utils
import axios from 'axios'
import moment from 'moment'
import API from '../../../lib/api'
import { convertMsToTime } from '../../../lib/utils'

// Components
import { motion } from 'framer-motion'
import Loading from '../../../components/Layout/Loading'

// Routes
import { useParams, useLocation, useNavigate } from 'react-router-dom'

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
        opacity: 0,
        transition: {
            ease: "easeInOut"

        }
    }
}

function Results() {
    const { num: generation, difficulty } = useParams()
    const [highScores, setHighScores] = useState(null)
    const [newHighScore, setNewHighScore] = useState(false)
    const [name, setName] = useState('-----')
    const navigate = useNavigate()
    const location = useLocation()
    const rankingColors = {
        easy: "bg-green-500",
        medium: "bg-yellow-500",
        hard: "bg-red-500",
        expert: "bg-blue-500",
        master: "bg-purple-500"
    }

    useEffect(() => {
        if (!location.state) {
            navigate('/')
        }
    }, [location, navigate])

    useEffect(() => {

        if (location.state && highScores === null) {



            try {
                axios.get(`${API.scores}/${generation}/${difficulty}`)
                    .then(({ data }) => {
                        let currentHighScores = []
                        let flag = false
                        let oldScore;
                        data.forEach((item, idx) => {
                            if ((location.state.score < item.score && !flag)) {
                                oldScore = { ...item }
                                flag = true
                                currentHighScores[idx] = { _id: 'new-score', score: location.state.score, name: 'jacky', date: Date.now() }
                                currentHighScores[idx + 1] = { ...oldScore }
                                setNewHighScore(true)
                            } else {
                                currentHighScores.push(item)
                            }
                        })
                        setHighScores([...currentHighScores.splice(0, 10)])
                    })
            } catch (error) {
                console.log('FETCH ABORT')
            }

        }


    }, [highScores, location, difficulty, generation])

    function handleNameChange(e) {
        const defaultDashes = '-----'
        let currentValue = e.target.value.split('-').filter((item) => item !== '').join('')
        if (e.nativeEvent.data === null) {
            currentValue = currentValue.slice(0, -1)
        }
        currentValue = `${currentValue}${defaultDashes.substring(0, 5 - currentValue.length)}`
        if (name.length < 5 || name.split('').includes('-') || e.nativeEvent.data === null) {
            setName(currentValue)
        }
    }

    async function handleNewScoreSubmit(e) {
        e.preventDefault()
        if (name.split('').includes('-')) {
            alert('Please Enter 5 Characters')
        } else {
            const userConfirm = window.confirm(`Does everything look correct?`)
            if (userConfirm) {
                await axios.post(`${API.addScore}`, {
                    score: location.state.score,
                    difficulty,
                    generation,
                    name
                })
                navigate('/', { replace: true })
            }
        }

    }
    if (highScores === null) {
        return (
            <Loading />
        )
    }

    return (
        <div className='font-arcade flex flex-col'>

            {newHighScore &&
                <h1 className='w-max absolute top-24 animate-pulse text-[5rem] left-[50%] -translate-x-[50%]'>
                    NEW HIGH SCORE!
                </h1>
            }
            {/* Game Details */}
            <div className='flex flex-col'>
                <h1 className='text-3xl text-center mb-3'>
                    Generation: <span className='font-bold  text-black   '>{generation}</span>
                </h1>
                {!newHighScore &&
                    <h2 className='text-3xl text-center mb-3'>Score: {convertMsToTime(location.state.score)}</h2>
                }

            </div>


            {/* High Scores */}
            <motion.div
                variants={containerVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className='flex flex-col  rounded-lg bg-white drop-shadow-lg overflow-hidden'>
                <h2 className={`font-arcade p-5 text-white ${rankingColors[difficulty]} capitalize text-center text-2xl font-semibold`}>
                    {difficulty}
                </h2>

                <ul className='flex flex-col p-5 font-arcade font-semibold'>

                    <li className=' grid grid-cols-[70px_100px_100px_100px] gap-4'>
                        <span>Rank</span>
                        <span>Score</span>
                        <span>Name</span>
                        <span>Date</span>
                    </li>

                    {highScores.map((item, idx) => (
                        <li key={item._id} className={` ${item._id === 'new-score' ? 'bg-black text-white animate-pulse' : 'text-black even:bg-gray-100'}   p-2   grid grid-cols-[70px_100px_100px_100px]  gap-4 `}>
                            <span>#{idx + 1}</span>
                            <span>{convertMsToTime(item.score)}</span>
                            {(newHighScore && item._id === 'new-score')
                                ? <form onSubmit={handleNewScoreSubmit} className='bg-transparent w-[100px]'>
                                    <input spellCheck={false} value={name} onChange={handleNameChange} className='uppercase bg-transparent w-[100px] outline-none' />
                                </form>
                                : <span className='uppercase'>{item.name}</span>
                            }

                            <span>{moment(item.day).format('MM-DD-YY')}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {newHighScore &&
                <button type='submit' className='hover:bg-blue-600 active:scale-90 transition-all ease-in-out duration-150 text-white text-4xl  absolute left-[50%] -translate-x-[50%] bottom-20 bg-blue-500 px-4 py-2 rounded-lg' onClick={handleNewScoreSubmit}>
                    Save Changes
                </button>
            }

        </div>
    )
}

export default Results