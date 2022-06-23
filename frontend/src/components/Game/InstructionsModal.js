import React, { useEffect, useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
export default function InstructionsModal({ setGameState, difficulty, num }) {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(false)
    const [count, setCount] = useState(3)
    const levels = {
        'very-easy': 'In Order, Pokemon Silhouette, Pokemon Cry',
        'easy': 'In Order, Pokemon Silhouette, No Pokemon Cry',
        'medium': 'In Order, Pokemon Cry, No Pokemon Silhouette',
        'hard': 'In Order, No Pokemon Silhouette, No Pokemon Cry',
        'very-hard': 'Random, Pokemon Silhouette, Pokemon Cry',
        'expert': 'Random, Pokemon Silhouette, No Pokemon Cry',
        'insane': 'Random, Pokemon Cry, No Pokemon Silhouette',
        'master': 'Random, No Silhouette, No Pokemon Cry'
    }

    useEffect(() => {
        if (countdown && count !== 0) {
            setTimeout(() => {
                setCount((prevState) => prevState - 1)
            }, [1000])
        }

        if (count === 0) {
            setTimeout(() => {
                setGameState('progress')
            }, [700])
        }
    }, [countdown, count, setGameState])

    return (
        <>
            <div className={`left-[50%] -translate-x-[50%] bottom-[50%] translate-y-[45%]  fixed z-[100] h-[400px] w-[300px]  rounded-lg drop-shadow-xl  flex flex-col justify-between bg-white`}>

                {!countdown
                    ? <>
                        {/* Header */}
                        <div className="text-center p-5 border-b border-solid border-slate-200 ">
                            <h3 className="text-3xl font-semibold">
                                Rules
                            </h3>
                        </div>

                        {/* Body */}
                        <div className="relative p-6">
                            <h4 className="text-xl mb-3">Difficulty:
                                <span className="capitalize ml-2 font-semibold underline underline-offset-4">{difficulty.replace('-', ' ')}</span>
                            </h4>

                            <ul className="flex flex-col">
                                {levels[difficulty].split(',').map((item) => (
                                    <li key={item} className="list-disc ml-5 text-lg">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-evenly p-4 border-t border-solid border-slate-200 ">
                            <button
                                className="text-red-500  font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => navigate(`/generation/${num}/difficulty`)}
                            >
                                Go Back
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setCountdown(true)}
                            >
                                Begin
                            </button>
                        </div>
                    </>
                    : <>
                        <div className="flex items-center justify-center h-full">
                            <div className=" relative w-[200px] h-[200px]  overflow-hidden flex items-center justify-center">

                                <>
                                    {count !== 0 &&
                                        <AiOutlineLoading3Quarters className={"animate-spin absolute text-[7rem]"} />
                                    }

                                    <h3 className={`
                                        ${count === 0 ? 'text-transparent' : ''}
                                        ${count === 1 ? 'translate-y-0' : ''}
                                        ${count === 2 ? '-translate-y-[115%] ' : ''}
                                        ${count === 3 ? '-translate-y-[115%] ' : ''} 
                                        text-[5rem]  absolute transition-transform ease-in-out duration-200
                                    `}>
                                        {count}
                                    </h3>
                                    <h3 className={`
                                     ${count === 0 ? 'text-transparent' : ''}
                                        ${count === 1 ? 'translate-y-[115%] ' : ''}
                                        ${count === 2 ? 'translate-y-0' : ''}
                                        ${count === 3 ? '-translate-y-[115%] ' : ''} 
                                        text-[5rem]  absolute  transition-transform ease-in-out duration-200
                                    `}>
                                        {count}
                                    </h3>
                                    <h3 className={`
                                     ${count === 0 ? 'text-transparent' : ''}
                                        ${count === 1 ? 'translate-y-[115%] ' : ''}
                                        ${count === 2 ? 'translate-y-[115%] ' : ''}
                                        ${count === 3 ? 'translate-y-0' : ''} 
                                        text-[5rem]  absolute transition-transform ease-in-out duration-200
                                    `}>
                                        {count}
                                    </h3>
                                </>
                                <h3 className={`${count === 0 ? 'scale-100' : 'scale-125 text-transparent'} text-[4rem] transition-all ease-in-out duration-300`}>
                                    BEGIN!
                                </h3>


                            </div>

                        </div>
                    </>}


            </div>

            <div className={`${count === 0 ? 'opacity-25' : 'opacity-0'} transition-all ease-in-out fixed -top-10 bottom-0 left-0 right-0 h-screen z-[90] bg-white`}></div>
        </>
    );
}