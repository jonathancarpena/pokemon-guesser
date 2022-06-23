import React, { useEffect, useState } from 'react'

// Utils
import axios from 'axios'
import moment from 'moment'
import API from '../../../lib/api'
import { convertMsToTime } from '../../../lib/utils'

// Routes
import { useParams, useLocation, useNavigate } from 'react-router-dom'

function Results() {
    const { num: generation, difficulty } = useParams()
    const [highScores, setHighScores] = useState(null)
    const [newHighScore, setNewHighScore] = useState(false)
    const [name, setName] = useState('-----')
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!location.state) {
            navigate('/')
        } else {
            if (highScores === null) {
                axios.get(`${API.scores}/${generation}/${difficulty}`)
                    .then(({ data }) => {
                        let currentHighScores = [...data]

                        let flag = false
                        currentHighScores.forEach((item, idx) => {
                            if ((location.state.score < item.score) && flag === false) {
                                flag = true
                                setNewHighScore(true)
                                currentHighScores[idx] = { _id: 'new-score', score: location.state.score, name: 'jacky', date: Date.now() }
                            }
                        })

                        setHighScores([...currentHighScores])
                    })
            }
        }


    })

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
                console.log('ADDIng')
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
        return <h1>Loading...</h1>
    }

    return (
        <div className='font-arcade flex flex-col space-y-5 text-2xl'>

            {newHighScore &&
                <h1 className='w-max absolute top-32 animate-pulse text-[5rem] left-[50%] -translate-x-[50%]'>
                    NEW HIGH SCORE!
                </h1>
            }
            {/* Game Details */}
            <h1>Generation: {generation}</h1>
            <h1 className='capitalize'>Difficulty: {difficulty.replace('-', ' ')}</h1>
            <h1>Your Score: {convertMsToTime(location.state.score)}</h1>



            {/* High Scores */}
            <div>
                <ul className='flex flex-col'>

                    <li className='grid grid-cols-4 gap-10'>
                        <span>Rank</span>
                        <span>Score</span>
                        <span>Name</span>
                        <span>Date</span>
                    </li>

                    {highScores.map((item, idx) => (
                        <li key={item._id} className={`${item._id === 'new-score' ? 'bg-black text-white animate-pulse' : ''} grid grid-cols-4  gap-10`}>
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

                <button type='submit' className='text-white  absolute left-[50%] -translate-x-[50%] bottom-32 bg-blue-500 px-4 py-2 rounded-lg' onClick={handleNewScoreSubmit}>
                    Save Changes
                </button>

            </div>
        </div>
    )
}

export default Results