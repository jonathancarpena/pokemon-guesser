import React from 'react'

// Router
import { useNavigate } from 'react-router-dom'

// Components
import { motion, AnimatePresence } from 'framer-motion'

// Icons
import { FaHome } from 'react-icons/fa'

const variant = {
    initial: {
        y: -100,
        x: -50,
        scale: 0.5,
    },
    animate: {
        y: -25,
        x: -25,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeInOut'
        }
    },
    exit: {
        y: -100,
        x: -50,
        scale: 0.5,
        transition: {
            duration: 0.6,
            ease: 'easeInOut'
        }
    }
}

function HomeButton({ isVisible }) {
    const navigate = useNavigate()
    return (
        <AnimatePresence>
            {
                isVisible &&
                <motion.div
                    whileTap={{
                        scale: 0.9,
                        transition: { duration: 0.15, easeIn: "easeInOut" },
                    }}

                    variants={variant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    onClick={() => navigate('/', { replace: true })}
                    className='bg-white pt-10 pl-10 pb-5 pr-5 rounded-2xl select-none cursor-pointer flex space-x-2 items-center justify-center fixed top-0 left-0 text-black text-[1.5rem] drop-shadow-md hover:drop-shadow-lg '>
                    <FaHome className='' />
                    <span>Home</span>
                </motion.div>}
        </AnimatePresence>
    )
}

export default HomeButton