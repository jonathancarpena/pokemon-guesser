import React, { useState } from 'react'

// Components
import { motion, AnimatePresence } from 'framer-motion'

function OptionButtons({ children, accent = 'bg-neutral-500' }) {
    const [hover, setHover] = useState(false)

    return (
        <motion.button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={`
            h-[75px]
        bg-neutral-100 px-8 py-5 rounded-md    drop-shadow-md 
         hover:scale-110 hover:bg-white hover:drop-shadow-lg hover:text-white active:scale-90 focus:outline-none
        transition-all ease-in-out duration-200 delay-[50ms] relative overflow-hidden `}>
            <span className='z-50  flex  items-center'>
                {children}
            </span>
            <AnimatePresence>
                {hover &&
                    <motion.span
                        initial={{ opacity: 0, rotate: 45, y: '200%', x: '-200%' }}
                        animate={{ opacity: 1, rotate: 45, y: '-67%', x: '-75%' }}
                        transition={{ type: 'spring', mass: 0.25, }}
                        exit={{ opacity: 0, y: '200%', x: '-200%' }}
                        className={`rotate-45 absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] w-[300px] h-[200px]  ${accent} -z-50 rounded-2xl`}>
                    </motion.span>
                }
            </AnimatePresence>

        </motion.button>
    )
}

export default OptionButtons