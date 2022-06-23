import React from 'react'

// Router
import { Link } from 'react-router-dom'

// Components
import { motion } from 'framer-motion'

// Icons
import { FaTrophy } from 'react-icons/fa'

// Utils
import { randomItem } from '../lib/utils'

// Images - Pokemon Starter Sprites
import gen1_Grass from '../images/starters/gen1-grass.png'
import gen1_Fire from '../images/starters/gen1-fire.png'
import gen1_Water from '../images/starters/gen1-water.png'
import gen2_Grass from '../images/starters/gen2-grass.png'
import gen2_Fire from '../images/starters/gen2-fire.png'
import gen2_Water from '../images/starters/gen2-water.png'
import gen3_Grass from '../images/starters/gen3-grass.png'
import gen3_Fire from '../images/starters/gen3-fire.png'
import gen3_Water from '../images/starters/gen3-water.png'
import gen4_Grass from '../images/starters/gen4-grass.png'
import gen4_Fire from '../images/starters/gen4-fire.png'
import gen4_Water from '../images/starters/gen4-water.png'


const GRASS_STARTERS = [gen1_Water, gen2_Water, gen3_Water, gen4_Water]
const FIRE_STARTERS = [gen1_Fire, gen2_Fire, gen3_Fire, gen4_Fire]
const WATER_STARTERS = [gen1_Grass, gen2_Grass, gen3_Grass, gen4_Grass]
const GENERATION_STYLES = {
    grass: GRASS_STARTERS,
    fire: FIRE_STARTERS,
    water: WATER_STARTERS
}



function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='flex flex-col items-center space-y-10'
        >

            <h1 className='font-arcade text-5xl font-semibold text-center uppercase'>
                Pokemon Guesser
            </h1>
            <ul className='flex flex-col space-y-5 text-xl'>
                {GENERATION_STYLES[randomItem(Object.keys(GENERATION_STYLES))].map((item, idx) => (
                    <li key={`generation-${idx}`} className='flex space-x-3 '>
                        <Link to={`/generation/${idx + 1}`}>
                            <button className={`
                                
                                bg-neutral-100 px-10 py-5 rounded-md    drop-shadow-md 
                                 hover:scale-110 hover:bg-white hover:drop-shadow-lg 
                                transition-all ease-in-out duration-150 flex space-x-2 items-center`}>
                                <span className='font-arcade uppercase font-semibold'>
                                    Generation {idx + 1}
                                </span>
                                <img src={item} className='h-full w-auto' />
                            </button>
                        </Link>
                        <Link to={`/rankings/generation/${idx + 1}`}>
                            <button className={`
                                h-full bg-neutral-100 px-6 py-3 rounded-md   drop-shadow-md 
                                  hover:scale-110 hover:bg-white hover:drop-shadow-lg 
                                    transition-all ease-in-out duration-150`}>
                                <FaTrophy />
                            </button>
                        </Link>
                    </li>
                ))}

            </ul>
        </motion.div>

    )
}

export default Home