import React from 'react'

// Components
import { motion } from 'framer-motion'


function Guesser({ color }) {
    const colors = {
        'bg-green-500': '#22C55E',
        'bg-red-500': '#EF4444',
        'bg-blue-500': '#3B82F6'
    }

    const wordVariant = {
        initial: { opacity: 0, y: 200, x: 0 },
        animate: {
            opacity: 1, y: 0, x: 0,
            transition: {
                type: 'spring',
                mass: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.18,
            }
        },


    }

    const letterVariant = {
        initial: {
            opacity: 0,
            color: '#ffffff'
        },
        animate: {
            opacity: 1,
            color: '#ffffff',
            backgroundColor: `${colors[color]}`,

        }
    }
    return (
        <motion.span
            variants={wordVariant}
            initial="initial"
            animate="animate"
            className='inline-block relative '>
            <motion.span variants={letterVariant} className='pl-2 rounded-l-lg'>G</motion.span>
            <motion.span variants={letterVariant}>u</motion.span>
            <motion.span variants={letterVariant}>e</motion.span>
            <motion.span variants={letterVariant}>s</motion.span>
            <motion.span variants={letterVariant}>s</motion.span>
            <motion.span variants={letterVariant}>e</motion.span>
            <motion.span variants={letterVariant} className='pr-2 rounded-r-lg '>r</motion.span>

        </motion.span>
    )
}

export default Guesser