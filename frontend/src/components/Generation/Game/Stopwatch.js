import React, { useEffect } from 'react'


function Timer({ time }) {
    return (
        <div className=' bg-pokemonStorage border-[10px] border-l-[#E0F8A7] border-t-[#E0F8A7] border-r-[#56861E] border-b-[#56861E]  text-white '>
            <div className="text-[4rem] rounded-xl flex justify-center font-arcade ">
                {/* Hour */}
                <span className='font-semibold drop-shadow-text' >
                    {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
                </span>

                {/* Minutes */}
                <span className='font-semibold drop-shadow-text' >
                    {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                </span>

                {/* Seconds */}
                <span className='font-semibold drop-shadow-text'>
                    {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
                </span>

                {/* Milliseconds */}
                {/* <span >
                {("0" + ((time / 10) % 100)).slice(-2)}
            </span> */}
            </div>
        </div>

    )
}
function Stopwatch({ isActive, time, setTime }) {
    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, setTime])

    return (
        <div className='flex-1 border-[10px] border-t-[#9F874F] border-l-[#9F874F] border-r-[#775F27] border-b-[#775F27] rounded-xl'>
            <Timer time={time} />
        </div>
    )
}

export default Stopwatch