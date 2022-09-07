import React from 'react'


// Constants
import { DIFFICULTY } from '../../../lib/constants'

function SingleOption({ random, shape, cry, handleCheck, difficulty, option, accent }) {
    const rankingBorderColor = {
        "bg-green-500": {
            inner: "border-green-600",
            outer: "border-green-700"
        },
        "bg-yellow-500": {
            inner: "border-yellow-600",
            outer: "border-yellow-700"
        },
        "bg-red-500": {
            inner: "border-red-600",
            outer: "border-red-700"
        },
        "bg-blue-500": {
            inner: "border-blue-600",
            outer: "border-blue-700"
        },
        "bg-purple-500": {
            inner: "border-purple-600",
            outer: "border-purple-700"
        },
    }
    return (
        <div onClick={() => handleCheck(option)} className={` hover:scale-110 active:scale-90 border-[7px]  ${option === difficulty ? `${rankingBorderColor[accent].outer} ${accent} text-white font-bold` : 'bg-white border-[#29312E] font-semibold'} w-[370px] text-base rounded-full cursor-pointer  transition-transform ease-in-out duration-150`}>
            <div className={`
                ${option === difficulty ? `${rankingBorderColor[accent].inner} ` : 'border-[#A6AA9E]'}
                w-full h-full
                 rounded-full py-4 px-8
                border-[7px] 
                `} >

                <div className='cursor-pointer'>
                    <span className='text-xl  capitalize'>{option}</span>
                    <ul className='flex space-x-2 text-sm'>
                        {option === 'master'
                            ? <span>All Pokemon,</span>
                            : <span>{random ? 'Random' : 'Pokedex Order'},</span>
                        }

                        <span>{shape ? 'Silhouette' : 'No Silhouette'}, </span>
                        <span>{cry ? '' : 'No Cry'}</span>
                    </ul>

                </div>
            </div>
        </div>

    )

}
function Options({ handleCheck, difficulty }) {
    const rankingHeaderColors = ["bg-green-500", "bg-yellow-500", "bg-red-500", "bg-blue-500", "bg-purple-500"]
    return (
        <div className='flex flex-col space-y-5 '>
            {Object.entries(DIFFICULTY).map((item, idx) => (
                <SingleOption
                    key={item[0]}
                    accent={rankingHeaderColors[idx]}
                    option={item[0]}
                    difficulty={difficulty}
                    random={item[1].random}
                    cry={item[1].cry}
                    shape={item[1].shape}
                    handleCheck={handleCheck}
                />
            ))}
        </div>


    )
}

export default Options