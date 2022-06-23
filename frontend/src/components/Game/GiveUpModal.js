import React from "react";

export default function GiveUpModal({ giveUp, setGiveUp, handleGiveUp }) {

    return (
        <>
            <div className={`${giveUp ? 'bottom-[50%] translate-y-[45%]' : 'translate-y-full'} left-[50%] -translate-x-[50%]   fixed z-[100] h-[250px] w-[550px]  rounded-lg drop-shadow-xl  flex flex-col justify-evenly bg-white transition-transform ease-linear duration-200`}>


                {/* Body */}
                <div className="relative p-6 flex flex-col space-y-3 items-center justify-center">
                    <h4 className="text-3xl font-semibold text-center">Are you sure you want to give up?</h4>
                    <p className="font-semibold text-center">You will lose all your progress so far.</p>
                </div>

                {/* Footer */}
                <div className="flex  justify-evenly    ">
                    <button
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xl px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleGiveUp}
                    >
                        Give Up
                    </button>

                    <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xl px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setGiveUp(false)}
                    >
                        Keep Going
                    </button>

                </div>


            </div>

            <div className={`opacity-25 transition-all ease-in-out fixed -top-10 bottom-0 left-0 right-0 h-screen z-[90] bg-white`}></div>
        </>
    );
}