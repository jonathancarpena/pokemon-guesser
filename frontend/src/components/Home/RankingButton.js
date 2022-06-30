import React, { useState } from 'react'

// Components
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'

// Icons
import { FaTrophy } from 'react-icons/fa'

const rankingVariant = {
    hover: {
        scale: 1.25,
        transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "mirror"
        }
    },

}

function RankingButton() {
    const [hover, setHover] = useState(false)
    return (
        <motion.span
            variants={rankingVariant}
            whileHover="hover"
            className='absolute w-full h-full left-0 flex justify-center items-center' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

            <FaTrophy />
            {hover &&
                <Confetti

                    width={'100%'}
                    height={'100%'}
                    colors={['#ffffff']}
                    numberOfPieces={50}
                />
            }

        </motion.span>
    )
}

export default RankingButton