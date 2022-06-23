import React, { useEffect } from 'react'


function Timer({ time }) {
    return (
        <div className="text-[4.5rem] bg-white rounded-xl px-5">
            {/* Hour */}
            <span className='font-semibold' >
                {("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:
            </span>

            {/* Minutes */}
            <span className='font-semibold' >
                {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
            </span>

            {/* Seconds */}
            <span className='font-semibold'>
                {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
            </span>

            {/* Milliseconds */}
            <span >
                {("0" + ((time / 10) % 100)).slice(-2)}
            </span>
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
        <div>
            <Timer time={time} />
        </div>
    )
}

export default Stopwatch