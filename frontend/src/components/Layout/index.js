import React from 'react'

// Router
import { Link, useLocation } from 'react-router-dom'

// Icons
import { FaHome } from 'react-icons/fa'

// Components 
import { AnimatePresence } from 'framer-motion'

function Layout({ children }) {
    const { pathname } = useLocation()
    return (
        <AnimatePresence>
            <div className={` text-black relative  flex items-center justify-center  bg-gray-200 min-h-screen mx-auto`}>

                {pathname.includes('') &&
                    <Link to='/'>
                        <div className='flex space-x-2 items-center fixed top-10 left-10 text-black'>
                            <FaHome className='' />
                            <span>Home</span>
                        </div>
                    </Link>
                }
                {children}
            </div>
        </AnimatePresence>
    )
}

export default Layout