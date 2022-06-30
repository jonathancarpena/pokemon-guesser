import React from 'react'

// Components
import { motion } from 'framer-motion'


const mainVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: {
        opacity: 0
    }
}
const containerVariant = {
    initial: {
        rotate: -180,
    },
    animate: {
        rotate: 0,
        transition: {
            duration: 3,
            ease: "easeInOut",
            staggerChildren: 0.25,
        }
    }
}
const outerCircleVariant = {
    initial: {
        pathLength: 0,
    },
    animate: {
        pathLength: 1,
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: 'mirror'
        }
    }
}

const innerCircleVariant = {
    initial: {
        pathLength: 0,
    },
    animate: {
        pathLength: 1,
        transition: {
            duration: 2.75,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: 'mirror'
        }
    }
}

const dividerVariant = {
    initial: {
        pathLength: 0,
    },
    animate: {
        pathLength: 1,
        transition: {
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: 'mirror'
        }
    }
}

const dotContainerVariant = {
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

const dotVariant = {
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
function Loading() {

    // viewBox = "minX minY width height"
    return (
        <motion.div
            variants={mainVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className=' absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] flex items-center justify-center flex-col'>

            <motion.div
                variants={containerVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className='w-[300px] h-[300px] relative flex flex-col justify-center items-center'>
                <svg
                    xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" >

                    {/* Outer Circle */}
                    <motion.circle
                        variants={outerCircleVariant}
                        cx="9" cy="9" r="9" transform="translate(3 3)">
                    </motion.circle>

                    {/* Divider */}
                    <motion.path
                        variants={dividerVariant}
                        d="M3 12h6m6 0h6">
                    </motion.path>

                    {/* Inner Circle */}
                    <motion.circle
                        variants={innerCircleVariant}
                        cx="12" cy="12" r="3">
                    </motion.circle>
                </svg>


            </motion.div>


            <h1 className='font-bold font-arcade text-[3rem] flex'>
                <span>Loading</span>
                <motion.span
                    variants={dotContainerVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className='flex'
                >
                    <motion.span variants={dotVariant}>.</motion.span>
                    <motion.span variants={dotVariant}>.</motion.span>
                    <motion.span variants={dotVariant}>.</motion.span>
                </motion.span>
            </h1>



        </motion.div>

    )
}

export default Loading