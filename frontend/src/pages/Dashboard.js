import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

import Navigation from '../components/Navigation';
import { authenticate, isAuthenticated, signout } from '../core/apiCore';

function Dashboard() {

    const history = useHistory();

    const { user } = isAuthenticated();

    const init = () => {
        if (!isAuthenticated() || user.role !== 1) {
            history.push('/');
        }
    }

    useState(() => {
        init();
    }, [])

    return (
        <>
            <Navigation />
            <div className='grid md:grid-flow-col m-11'>
                <div className="flex items-center bg-white">
                    <Link className='text-center items-center bg-black text-white p-4 rounded-full' to='/verproductosadmin'>Ver Producto</Link>
                </div>
                <div className="flex items-center bg-white">
                    <Link className='text-center items-center bg-black text-white p-4 rounded-full' to='/addproducto'>Agregar Producto</Link>
                </div>
                <div className="flex items-center bg-white">
                    <Link className='text-center items-center bg-black text-white p-4 rounded-full' to='/verrecetaadmin'>Ver Receta</Link>
                </div>
                <div className="flex items-center bg-white">
                    <Link className='text-center items-center bg-black text-white p-4 rounded-full' to='/addreceta'>Agregar Receta</Link>
                </div>

            </div>
        </>
    )
}

export default Dashboard
