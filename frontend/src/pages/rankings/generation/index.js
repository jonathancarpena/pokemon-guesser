import React, { useEffect, useState } from 'react'

// Router
import { useParams } from 'react-router-dom'

// Utilities
import axios from 'axios'
import moment from 'moment'
import API from '../../../lib/api'
import { convertMsToTime } from '../../../lib/utils'

function GenerationRanking() {
    const { generation } = useParams()
    const [rankings, setRankings] = useState(null)

    useEffect(() => {
        if (rankings === null) {
            axios.get(`${API.scores}/${generation}`)
                .then(({ data }) => {
                    setRankings([...data])
                })
        }
    })


    if (!rankings) {
        return <h1>Loading...</h1>
    }

    return (
        <div className='flex flex-col items-center space-y-10'>
            <h1 className='text-center text-3xl font-semibold uppercase bg-white py-3 px-4  rounded-lg w-max'>
                Generation {generation} Rankings
            </h1>


            <div className='grid grid-cols-2 gap-10'>
                {rankings.map((item) => (
                    <div key={item._id} className='flex flex-col  border-4 border-gray-300 rounded-lg bg-white drop-shadow-lg overflow-hidden'>
                        <h2 className='font-arcade p-5 text-white bg-black capitalize text-center text-2xl font-semibold'>
                            {item.difficulty.replace('-', ' ')}
                        </h2>


                        <ul className='flex flex-col p-5 font-arcade font-semibold'>

                            <li className=' grid grid-cols-[70px_100px_100px_100px] gap-4'>
                                <span>Rank</span>
                                <span>Score</span>
                                <span>Name</span>
                                <span>Date</span>
                            </li>

                            {item.scores.map((score, idx) => (
                                <li key={score._id} className={`p-2 even:bg-gray-100 grid grid-cols-[70px_100px_100px_100px]  gap-4`}>
                                    <span>#{idx + 1}</span>
                                    <span>{convertMsToTime(score.score)}</span>
                                    <span className='uppercase'>{score.name}</span>
                                    <span>{moment(score.day).format('MM-DD-YY')}</span>
                                </li>

                            ))}

                        </ul>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default GenerationRanking