import React from 'react'
// Components
import { motion, AnimatePresence } from 'framer-motion'


const backdropVariant = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 0.7,
        transition: {
            duration: 0.75,
            ease: "easeIn",
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
}
const containerVariant = {
    initial: {
        opacity: 0,
        scale: 0.8,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.75,
            ease: "easeInOut",
        }
    }
}

const circleVariant = {
    initial: {
        pathLength: 0,
    },
    animate: {
        pathLength: 1,
        transition: {
            duration: 1.5,
            ease: "easeInOut"
        }
    }
}

const fillVariant = {
    initial: {
        fill: "#ffffff"
    },
    animate: {
        fill: "#22C55E",
        transition: {
            duration: 1.5,
            ease: "easeInOut"
        }
    }
}

const checkVariant = {
    initial: {
        pathLength: 0,
    },
    animate: {
        pathLength: 1,
        transition: {
            duration: 1.75,
            ease: "easeInOut"
        }
    }
}

const spanVariant = {
    initial: {
        y: 100
    },
    animate: {
        y: 0,
        transition: {
            duration: 1.75,
            ease: "easeInOut"
        }
    }
}

function CompleteGame({ show }) {
    return (
        <AnimatePresence>
            {show && (
                <>
                    <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={containerVariant}
                        className='fixed w-screen h-screen z-[100]  inset-0 flex justify-center items-center'>
                        <motion.div
                            className={`
                w-[500px] h-[500px] rounded-full  bg-white relative flex items-center flex-col justify-center
                transition-all ease-in-out duration-[1500ms] z-[90]
            `}>
                            <div className='relative overflow-hidden mb-3 h-[100px] w-[220px] '>
                                <motion.span
                                    variants={spanVariant}
                                    className='text-[5rem] h-full absolute '>
                                    Done!
                                </motion.span>
                            </div>

                            <motion.svg
                                variants={fillVariant}
                                xmlns="http://www.w3.org/2000/svg"
                                className="rounded-full " width="150" height="150" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <motion.circle
                                    className="stroke-[#22C55E]"
                                    variants={circleVariant}
                                    cx="12" cy="12" r="11"></motion.circle>
                                <motion.path
                                    className="stroke-white"
                                    variants={checkVariant}
                                    d="M9 12l2 2l4 -4"></motion.path>
                            </motion.svg>
                        </motion.div>



                    </motion.div>


                    <motion.div
                        variants={backdropVariant}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={` transition-all ease-in-out fixed inset-0 h-screen z-[80] bg-green-500`}></motion.div>

                </>

            )}

        </AnimatePresence>
    )
}

export default CompleteGame