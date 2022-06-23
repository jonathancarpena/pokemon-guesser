import React, { useState } from 'react'

// Router
import { useNavigate, useParams } from 'react-router-dom'

// Components
import { motion } from 'framer-motion'

// Icons
import { FaCheck } from 'react-icons/fa'



function Difficulty() {
    const { num } = useParams()
    const navigate = useNavigate()
    const [difficulty, setDifficulty] = useState(null)

    const levels = [
        {
            value: 'very easy',
            rules: 'In Order, Silhouette, Cry'
        },
        {
            value: 'easy',
            rules: 'In Order, Silhouette, No Cry'
        },
        {
            value: 'medium',
            rules: 'In Order, Cry, No Silhouette'
        },
        {
            value: 'hard',
            rules: 'In Order, No Silhouette, No Cry'
        },
        {
            value: 'very hard',
            rules: 'Random, Silhouette, Cry'
        },
        {
            value: 'expert',
            rules: 'Random, Silhouette, No Cry'
        },
        {
            value: 'insane',
            rules: 'Random, Cry, No Silhouette'
        },
        {
            value: 'master',
            rules: 'Random, No Silhouette, No Cry'
        },
    ]

    function handleCheck(value) {
        if (value === difficulty) {
            setDifficulty(null)
        } else {
            setDifficulty(value)
        }
    }


    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
        >
            <h1 className='font-bold text-3xl'>
                Choose Difficulty
            </h1>

            <div className='flex flex-col space-y-5'>
                {levels.map((item) => (
                    <div key={item.value} className='flex items-start space-x-3'>
                        <button
                            onClick={() => handleCheck(item.value)}
                            value={item.value}
                            className={`
                                ${item.value === difficulty ? 'bg-blue-500 ring-blue-500 hover:bg-blue-400 hover:ring-blue-400' : 'bg-gray-100 ring-neutral-500 hover:bg-white'} 
                                flex items-center justify-center relative top-1.5 
                                
                                transition-all ease-in-out duration-150
                                w-[20px] h-[20px] ring-2 rounded-sm
                            `}>
                            {item.value === difficulty &&
                                <FaCheck className={`text-white text-sm `} />
                            }

                        </button>
                        <div onClick={() => handleCheck(item.value)} className='cursor-pointer'>
                            <span className='text-lg font-semibold capitalize'>{item.value}</span>
                            <p>{item.rules}</p>
                        </div>
                    </div>
                ))}
            </div>


            <button
                onClick={() => navigate(`/generation/${num}/${difficulty.replace(' ', '-')}/game`)}
                disabled={!difficulty}
                className={`
                    ${difficulty ? 'opacity-100 hover:animate-pulse cursor-pointer' : 'opacity-0 cursor-default'} 
                    bg-blue-500 w-[200px] py-3 rounded-lg text-lg text-white font-semibold  
                    transition-all ease-in-out duration-150
                `}>

                Continue
            </button>

        </motion.div>

    )
}

export default Difficulty