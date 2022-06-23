import React, { useEffect, useState } from 'react'


// Router
import { useParams, useNavigate } from 'react-router-dom'

// Images - Region Maps
import Gen1 from '../../images/maps/gen1.png'
import Gen2 from '../../images/maps/gen2.png'
import Gen3 from '../../images/maps/gen3.png'
import Gen4 from '../../images/maps/gen4.png'

const REGION_MAPS = [Gen1, Gen2, Gen3, Gen4]
function Generation() {
    const { num: generation } = useParams()
    const navigate = useNavigate()
    const [showGeneration, setShowGeneration] = useState(true)
    const [showRegion, setShowRegion] = useState(null)

    setTimeout(() => {
        setShowGeneration(false)
        setShowRegion(true)
        setTimeout(() => {
            navigate(`/generation/${generation}/difficulty`)
        }, [2000])
    }, [2000])
    const regionNames = ['kanto', 'johto', 'hoenn', 'sinnoh']
    return (
        <>
            <div className='z-[60] relative flex items-center justify-center'>
                <img src={REGION_MAPS[generation - 1]} alt={`gen-${generation}-map`} className='opacity-80' />
                {showGeneration &&
                    <h1 className='text-white font-bold absolute text-[5rem] top-[50%] -translate-y-[50%] z-[70]'>
                        GEN {generation}
                    </h1>
                }

                {showRegion &&
                    <h1 className='uppercase text-white font-bold absolute text-[5rem] top-[50%] -translate-y-[50%] z-[70]'>
                        {regionNames[generation - 1]}
                    </h1>
                }

            </div>
            <div className={`opacity-90 transition-all ease-in-out fixed inset-0 h-screen z-[50] bg-black`}></div>
        </>

    )
}

export default Generation