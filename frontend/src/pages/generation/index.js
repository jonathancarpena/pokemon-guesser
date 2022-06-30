import React from 'react'


// Router
import { useParams, useNavigate } from 'react-router-dom'

// Components
import { motion } from 'framer-motion'

// Constants
import { GEN_SLICE, GENERATION_STARTERS } from '../../lib/constants'

// Images - Region Maps
import Gen1 from '../../images/maps/gen1.png'
import Gen2 from '../../images/maps/gen2.png'
import Gen3 from '../../images/maps/gen3.png'
import Gen4 from '../../images/maps/gen4.png'
import Gen5 from '../../images/maps/gen5.png'
import Gen6 from '../../images/maps/gen6.png'
import Gen7 from '../../images/maps/gen7.png'
import Gen8 from '../../images/maps/gen8.png'
const REGION_MAPS = [Gen1, Gen2, Gen3, Gen4, Gen5, Gen6, Gen7, Gen8]


const backdropVariant = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            duration: 0.6,
            ease: 'easeInOut'
        }
    },
}

const headerContainerVariant = {
    initial: {
        x: "-40vw"
    },
    animate: {
        x: 0,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.75,
            ease: 'easeInOut'
        }
    },
    exit: {
        width: 0, opacity: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.4,
            ease: 'easeInOut'
        }
    }
}

const generationVariant = {
    initial: {
        opacity: 0,
        scale: 0.7
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            duration: 1
        }
    },
    exit: {
        scale: 0, opacity: 0,
        transition: {
            ease: 'easeInOut', duration: 0.5
        }
    }
}

const regionVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        transition: {
            ease: 'easeInOut', duration: 0.5
        }
    }
}

const spriteContainerVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            staggerChildren: 0.25,
            ease: 'easeInOut'
        }
    },
    exit: {
        opacity: 0,
        transition: {
            ease: 'easeInOut', duration: 0.5
        }
    }
}

const spriteVariant = {
    initial: {
        y: 0,
    },
    animate: {
        y: -5,
        transition: {
            duration: 0.5,
            type: 'tween',
            repeatType: "mirror",
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
}


function Generation() {
    const { num: generation } = useParams()
    const navigate = useNavigate()


    const imgVariant = {
        initial: {
            x: generation === '8' ? 0 : 100,
            y: generation === '8' ? 100 : 0,
            scale: 1.25
        },
        animate: {
            x: generation === '8' ? 0 : -100,
            y: generation === '8' ? -100 : 0,
            transition: {
                duration: 7,
                ease: "easeInOut",
                repeatType: "reverse",
                repeat: Infinity,
            }
        },
        exit: {
            opacity: 0,
            scale: 5,
            transition: {
                ease: 'easeInOut',
                delay: 1,
                duration: 2
            }
        }

    }

    const regionNames = ['kanto', 'johto', 'hoenn', 'sinnoh']
    return (

        <motion.div
            variants={backdropVariant}
            initial="initial"
            animate="animate"
            className='z-[60] relative flex items-center justify-center overflow-hidden max-w-screen select-none'>

            <motion.img
                variants={imgVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                src={REGION_MAPS[generation - 1]}
                alt={`gen-${generation}-map`}
                className='fixed inset-0 w-[100vw] z-[20] h-screen object-cover'
            />


            <motion.div
                variants={headerContainerVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className='fixed bottom-16 h-[150px]  z-[60] bg-white opacity-90  text-white font-bold  w-screen flex items-center '>

                <div
                    className='flex space-x-5 items-center font-arcade capitalize ml-10 opacity-100'>
                    {/* Generation */}
                    <motion.div
                        variants={generationVariant}
                        className='bg-red-500 w-[200px] h-[200px] text-white border-white border-[14px] rounded-[100%] font-arcade relative '>
                        <span className='text-[3rem] uppercase absolute top-5 left-[50%] -translate-x-[50%]'>
                            gen
                        </span>
                        <span className='text-[5rem] absolute -bottom-2 left-[50%] -translate-x-[50%]'>
                            {generation}
                        </span>
                    </motion.div>

                    {/* Region */}
                    <motion.div
                        variants={regionVariant}
                        className='flex flex-col text-black'>
                        <span className='text-[2.5rem] uppercase'>
                            {regionNames[generation - 1]} Region
                        </span>
                        <span className='text-[1.75rem]'>
                            #{GEN_SLICE[generation].start + 1}-{GEN_SLICE[generation].end + 1} Pokedex
                        </span>
                    </motion.div>

                    {/* Sprites */}
                    <motion.div
                        onClick={() => navigate('/')}
                        variants={spriteContainerVariant}
                        className='flex  text-black'>
                        {GENERATION_STARTERS[generation].map((item) => (
                            <motion.img
                                key={item}
                                variants={spriteVariant}
                                src={item}
                                alt={item}
                                className='w-[50px]' />
                        ))}

                    </motion.div>

                    <motion.button
                        onClick={() => navigate(`/generation/${generation}/difficulty`)}
                        variants={regionVariant}
                        className={`
                    hover:scale-110 active:scale-90 opacity-100 cursor-pointer
                   bg-blue-500 w-[300px] h-[70px] overflow-hidden rounded-lg text-4xl text-black font-semibold  
                    transition-all ease-in-out duration-150  relative border-[6px] border-blue-700
                `}>
                        <span className=' text-white'>Continue</span>
                        <span className='left-0 -bottom-4 absolute w-full z-0 bg-blue-600 h-[50%]'></span>


                    </motion.button>

                </div>


            </motion.div>


        </motion.div>
    )
}

export default Generation