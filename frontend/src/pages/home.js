import React, { useState, useEffect } from 'react'

// Router
import { Link } from 'react-router-dom'

// Components
import { motion, useAnimation } from 'framer-motion'
import OptionButton from '../components/Home/OptionButton'
import RankingButton from '../components/Home/RankingButton'
import Guesser from '../components/Home/Guesser'

// Utils
import { randomItem } from '../lib/utils'

// Images - Pokemon Starter Sprites
import { GENERATION_STYLES } from '../lib/constants'



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
            ease: 'easeInOut', duration: 0.25
        }
    }
}

const childVariant = {
    initial: { opacity: 0, y: 100, x: -100 },
    animate: { opacity: 1, y: 0, x: 0, }
}

const imgVariant = {
    hover: {
        y: 2,
        transition: {
            duration: 0.1,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
            delay: 0.25
        }
    },

}





function Home() {
    const [starters, setStarters] = useState(null)
    const controls = useAnimation();


    useEffect(() => {
        if (starters === null) {
            const type = randomItem(Object.keys(GENERATION_STYLES))
            setStarters([...GENERATION_STYLES[type]])
            controls.start("animate");
        }
    }, [controls, starters])


    return (
        starters && (
            <motion.div
                variants={containerVariant}
                initial='initial'
                animate='animate'
                exit="exit"
                className='flex flex-col items-center space-y-10 select-none'
            >

                <h1 className='font-arcade text-5xl font-semibold text-center uppercase'>
                    Pokemon <Guesser color={starters[0].accent} />
                </h1>


                <div className='grid grid-cols-2 gap-10'>
                    <ul
                        className='flex flex-col space-y-5 text-xl'>
                        {starters.slice(0, 4).map((item, idx) => (
                            <motion.li
                                variants={childVariant}
                                key={`generation-${idx}`} className='flex space-x-5 '>
                                <Link to={`/generation/${idx + 1}`}>
                                    <OptionButton accent={item.accent} accent2={item.accent2}>
                                        <span className='font-arcade uppercase font-semibold pr-7'>
                                            Generation {idx + 1}
                                        </span>
                                        <motion.span
                                            variants={imgVariant}
                                            whileHover='hover'
                                            className='pr-5  w-full left-0 h-full flex items-center justify-end absolute '>
                                            <img
                                                alt={item.img}
                                                src={item.img}
                                                className='h-[40px] w-auto  mb-1'
                                            />
                                        </motion.span>


                                    </OptionButton>
                                </Link>
                                <Link to={`/generation/${idx + 1}/rankings`}>
                                    <OptionButton accent={'bg-yellow-500'} >
                                        <RankingButton />
                                    </OptionButton>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    <ul
                        className='flex flex-col space-y-5 text-xl'>
                        {starters.slice(4, starters.length).map((item, idx) => (
                            <motion.li
                                variants={childVariant}
                                key={`generation-${idx}`} className='flex space-x-5 '>
                                <Link to={`/generation/${idx + 5}`}>
                                    <OptionButton accent={item.accent} accent2={item.accent2}>
                                        <span className='font-arcade uppercase font-semibold pr-7'>
                                            Generation {idx + 5}
                                        </span>
                                        <motion.span
                                            variants={imgVariant}
                                            whileHover='hover'
                                            className='pr-5  w-full left-0 h-full flex items-center justify-end absolute '>
                                            <img
                                                alt={item.img}
                                                src={item.img}
                                                className={`h-[40px] w-auto mb-1 `}
                                            />
                                        </motion.span>


                                    </OptionButton>
                                </Link>
                                <Link to={`/generation/${idx + 1}/rankings`}>
                                    <OptionButton accent={'bg-yellow-500'} >
                                        <RankingButton />
                                    </OptionButton>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>



            </motion.div >


        )
    )
}

export default Home