import React, { useState, useEffect } from 'react'

// Router
import { useLocation } from 'react-router-dom'

// Icons
import HomeButton from './HomeButton'
import MobileAlert from './MobileAlert';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

function Layout({ children }) {
    const { pathname } = useLocation()
    const { width } = useWindowDimensions()


    const homeButtonPages = ['rankings', 'difficulty', 'incomplete', 'results']

    function isVisible() {
        let visible;
        const split = pathname.split('/')
        const page = split[split.length - 1]
        if (homeButtonPages.includes(page)) {
            visible = true
        } else {
            visible = false
        }
        return visible
    }
    return (

        <div className={` text-black relative  flex items-center justify-center  bg-gray-200 min-h-screen mx-auto`}>
            {width >= 1980
                ?
                <>
                    <HomeButton isVisible={isVisible()} />
                    {children}
                </>
                : <MobileAlert />
            }

        </div>

    )
}

export default Layout