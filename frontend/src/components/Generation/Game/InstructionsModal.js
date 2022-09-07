import React, { useEffect, useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Icons
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

// Constants
import { DIFFICULTY, GEN_SLICE } from "../../../lib/constants";

// Components
import { motion, useAnimation, AnimatePresence } from "framer-motion";

const containerVariant = {
    initial: { originX: 0, opacity: 0, x: 0, y: 200 },
    animate: {
        originX: 0, opacity: 1, x: 0, y: 0,
    },
    exit: {
        opacity: 0, y: 200,
        transition: {
            ease: "easeInOut"
        }
    }
}

function InstructionsModal({ show, setGameState, difficulty, generation }) {
    const navigate = useNavigate()
    const [countdown, setCountdown] = useState(false)
    const [count, setCount] = useState(3)
    const controls = useAnimation();

    useEffect(() => {
        if (countdown && count !== 0) {
            setTimeout(() => {
                setCount((prevState) => prevState - 1)
            }, [1000])
        }

        if (count === 0) {
            setTimeout(() => {
                controls.start("exit")
                setGameState('progress')
            }, [700])
        }
    }, [countdown, count, setGameState, controls])

    return (
        <>
            <AnimatePresence >
                {show && (
                    <>
                        <div
                            className={`fixed w-screen h-screen inset-0 z-[100]  flex flex-col justify-center items-center bg-transparent`}>
                            <motion.div
                                variants={containerVariant}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className={`select-none h-[550px] w-[400px]  rounded-lg drop-shadow-xl  flex flex-col  bg-white`}
                            >
                                {!countdown
                                    ? <>
                                        {/* Header */}
                                        <div className="text-center p-5 border-b border-solid border-slate-200 bg-stone-500 text-white">
                                            <h3 className="text-3xl font-semibold">
                                                Rules & Info
                                            </h3>
                                        </div>

                                        {/* Body */}
                                        <div className="relative p-6 flex-1 flex flex-col space-y-5 bg-gray-100">


                                            {/* Difficulty Level */}
                                            <h4 className="text-2xl ">Game Difficulty:
                                                <span className="capitalize ml-2 font-semibold underline underline-offset-4">{difficulty}</span>
                                            </h4>

                                            {/* Generation */}
                                            <h4 className="text-2xl flex items-end space-x-3">Generation:
                                                <span className="capitalize ml-2 font-semibold underline underline-offset-4">{generation}</span>
                                                <span className="ml-2 text-base">{`(#${GEN_SLICE[generation].start + 1} - ${GEN_SLICE[generation].end + 1})`}</span>
                                            </h4>

                                            {/* Conditions */}
                                            <div>
                                                <h4 className="text-2xl">
                                                    Conditions:
                                                </h4>
                                                <ul className='flex space-x-2 text-sm'>
                                                    {difficulty === 'master'
                                                        ? <>
                                                            <span>All Pokemon,</span>
                                                            <span className="line-through">Pokemon Silhouette,</span>
                                                            <span className="line-through">Pokemon Cries</span>
                                                        </>
                                                        : <>
                                                            <span>{DIFFICULTY[difficulty].random ? 'Random Order' : 'Pokedex ID Order'},</span>
                                                            <span className={`${DIFFICULTY[difficulty].shape ? '' : 'line-through'}`}>Pokemon Silhouette,</span>
                                                            <span className={`${DIFFICULTY[difficulty].cry ? '' : 'line-through'}`}>Pokemon Cry</span>
                                                        </>
                                                    }

                                                </ul>
                                            </div>

                                            {/* Instructions */}
                                            <div>
                                                <h4 className="text-2xl">
                                                    Info:
                                                </h4>

                                                <p>
                                                    {difficulty === "master"
                                                        ? `All Pokemon are taken from the Generation ${generation} Pokedex. You will be timed on how fast you can guess all the Pokemons. Good Luck!`
                                                        : `A random slice of 30 Pokemon are taken from the Generation ${generation} Pokedex (E.g. Gen1: 1-30, 60-90). You will be timed on how fast you can guess all 30 Pokemons. Good Luck!`
                                                    }
                                                </p>
                                            </div>



                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-around p-6 border-t text-xl border-solid border-slate-200 ">
                                            <button
                                                className=" active:scale-90 bg-white text-red-500 active:bg-red-600 active:text-white active:ring-red-600 font-bold uppercase  px-6 py-3 rounded   outline-none focus:outline-none ring-[6px] hover:bg-red-500 hover:ring-red-500 hover:text-white ring-white ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => navigate(`/generation/${generation}/difficulty`)}
                                            >
                                                Go Back
                                            </button>
                                            <button
                                                className=" animate-pulse active:animate-none active:scale-90 bg-emerald-500 text-white active:bg-emerald-600 active:ring-emerald-600 font-bold uppercase  px-6 py-3 rounded shadow  outline-none focus:outline-none ring-[6px] ring-emerald-500 ease-linear transition-all duration-150"
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

                            </motion.div>
                        </div>

                        <div className={`${count === 0 ? 'opacity-25' : 'opacity-0'} transition-all ease-in-out fixed -top-10 bottom-0 left-0 right-0 h-screen z-[90] bg-white`}></div>
                    </>
                )}
            </AnimatePresence>

        </>
    );
}

export default InstructionsModal