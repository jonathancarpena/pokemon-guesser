import React, { useState } from 'react'

// Router
import { useNavigate, useParams } from 'react-router-dom'

// Components
import { motion } from 'framer-motion'
import Options from '../../components/Generation/Difficulty/Options'
import Display from '../../components/Generation/Difficulty/Display'

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



function Difficulty() {
    const { num } = useParams()
    const navigate = useNavigate()
    const [difficulty, setDifficulty] = useState('easy')

    function handleCheck(value) {
        if (value !== difficulty) {
            setDifficulty(value)
        }
    }

    return (
        <div
            className=' w-full flex items-center justify-center font-arcade select-none'
        >

            <motion.div
                variants={containerVariant}
                animate="animate"
                initial="initial"
                exit="exit"
                className='flex  relative'>
                <h1 className='-top-[5rem] left-10 absolute font-bold text-4xl w-max'>
                    Choose Difficulty: <span className='capitalize underline underline-offset-4'>{difficulty}</span>
                </h1>
                <Options
                    handleCheck={handleCheck}
                    difficulty={difficulty}
                />
                <Display difficulty={difficulty} />

                <button
                    onClick={() => navigate(`/generation/${num}/${difficulty.replace(' ', '-')}/game`)}
                    disabled={!difficulty}
                    className={`
                    ${difficulty ? 'hover:scale-110 active:scale-90 opacity-100 cursor-pointer' : 'opacity-0 cursor-default'} 
                   bg-blue-500 w-[300px] h-[70px] overflow-hidden rounded-lg text-4xl text-black font-semibold  
                    transition-all ease-in-out duration-150 -top-[6rem] right-0 absolute border-[6px] border-blue-700
                `}>
                    <span className=' text-white'>Continue</span>
                    <span className='left-0 -bottom-4 absolute w-full z-0 bg-blue-600 h-[50%]'></span>

                </button>
            </motion.div>






        </div>

    )
}

export default Difficulty