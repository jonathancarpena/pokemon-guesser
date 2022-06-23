import React from 'react'

// Components
import Layout from '../components/Layout'

// Router
import { Link } from 'react-router-dom'

// Icons
import { FaHome } from 'react-icons/fa'

function NotFound() {
    return (
        <Layout>

            <div className='flex flex-col space-y-3 items-center'>
                <h1 className='text-6xl font-bold'>Not Found</h1>

                <Link to='/'>
                    <div className='flex space-x-2 text-3xl items-center'>
                        <FaHome />
                        <span>
                            Go Home
                        </span>
                    </div>
                </Link>
            </div>




        </Layout >
    )
}

export default NotFound