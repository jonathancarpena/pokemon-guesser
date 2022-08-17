import React, { useEffect, useState } from 'react'

// Router
import { useParams } from 'react-router-dom'

// Utilities
import axios from 'axios'
import moment from 'moment'
import API from '../../lib/api'
import { convertMsToTime } from '../../lib/utils'

// Components
import { motion } from 'framer-motion'
import Loading from '../../components/Layout/Loading'


const containerVariant = {
    initial: { opacity: 0, y: 200, x: 0 },
    animate: {
        opacity: 1, y: 0, x: 0,
        transition: {
            type: 'spring',
            mass: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.2
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
const childVariant = {
    initial: { opacity: 0, y: 100, x: 0 },
    animate: { opacity: 1, y: 0, x: 0, },
}
function GenerationRanking() {
    const { generation } = useParams()
    const [rankings, setRankings] = useState(null)

    const rankingHeaderColors = ["bg-green-500", "bg-yellow-500", "bg-red-500", "bg-blue-500", "bg-purple-500"]
    useEffect(() => {
        if (rankings === null) {
            axios.get(`${API.scores}/${generation}`)
                .then(({ data }) => {
                    setRankings([...data])
                })
        }
    })


    if (!rankings) {
        return <Loading />
    }

    return (
        <motion.div
            variants={containerVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className='flex flex-col items-center space-y-16 p-20 '>


            <h1 className='ring-8 drop-shadow-md ring-neutral-400 font-arcade flex flex-col items-center justify-center text-center text-4xl  space-y-2 py-3 px-6  bg-white rounded-xl  w-max'>
                <span className='uppercase font-bold'>Generation {generation} Rankings</span>
                <span className='text-xl font-arcade font-semibold '>as of <span className='underline underline-offset-2'>{moment(Date.now()).format('MMM DD, YYYY')}</span></span>
            </h1>


            <div className='grid grid-cols-2 gap-10'>
                {rankings.map((item, idx) => (
                    <motion.div variants={childVariant} key={item._id} className='flex flex-col  rounded-lg bg-white drop-shadow-lg overflow-hidden'>
                        <h2 className={`font-arcade p-5 text-white ${rankingHeaderColors[idx]} capitalize text-center text-2xl font-semibold`}>
                            {item.difficulty}
                        </h2>


                        <ul className='flex flex-col p-5 font-arcade font-semibold'>

                            <li className=' grid grid-cols-[70px_100px_100px_100px] gap-4'>
                                <span>Rank</span>
                                <span>Score</span>
                                <span>Name</span>
                                <span>Date</span>
                            </li>

                            {item.scores.map((score, idx) => (
                                <li key={score._id} className={`text-black even:bg-gray-100 p-2   grid grid-cols-[70px_100px_100px_100px]  gap-4 `}>
                                    <span>#{idx + 1}</span>
                                    <span>{convertMsToTime(score.score)}</span>
                                    <span className='uppercase'>{score.name}</span>
                                    <span>{moment(score.day).format('MM-DD-YY')}</span>
                                </li>

                            ))}

                        </ul>

                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

export default GenerationRanking