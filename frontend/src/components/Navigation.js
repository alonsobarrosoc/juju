import React, { Fragment, useState, useEffect } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../core/apiCore';

import logo from '../Recursos/SVG/jujunegro.svg'
import Dropdown from './Dropdown';


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}
const Navigation = ({ history }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    const { user } = isAuthenticated();
    useEffect(() => {
        const hideMenu = () => {
            if (window.innerWidth > 768 && isOpen) {
                setIsOpen(false);
                console.log('resize');
            }
        }
        window.addEventListener('resize', hideMenu);
        return () => {
            window.removeEventListener('resize', hideMenu);
        };
    })



    return (
        <>
            <nav className='flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-sans'
                role='navigation'>
                <Link to='/' className='pl-8'>

                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top ms-4"
                        alt="JuJu Coffee"
                    />
                </Link>
                <div className="px-4 cursor-pointer md:hidden"
                    onClick={toggle}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>
                <div className="pr-8 md:block hidden">
                    <Link className="p-4" to='/'>Inicio</Link>
                    <Link className="p-4" to='/shop'>Tienda</Link>
                    <Link className="p-4" to='/about'>¿Quiénes somos?</Link>
                    <Link className="p-4" to='/recetas'>Recetas</Link>
                    {!isAuthenticated() && (
                        <>
                            <Link className="text-black bg-white rounded-full border-2 p-2 m-2"
                                to='/signin'>
                                Iniciar Sesión
                            </Link>
                            <Link className="text-white bg-gray-600 rounded-full p-2 border-2"
                                to='/signup'>
                                Crear Cuenta
                            </Link>
                        </>
                    )}
                    {isAuthenticated() && (
                        <>
                            <Link className='d-inline-block align-top mx-4' to={`/carrito/${user._id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </Link>
                            <Link className="text-white bg-red-600 rounded-full p-2 mx-4"
                                to='/'
                                onClick={() =>
                                    signout(() => {
                                        history.push("/");
                                    })}
                            >Salir de Sesión</Link>



                        </>
                    )}
                </div>
            </nav>
            <Dropdown isOpen={isOpen} toggle={toggle} />
        </>
    )
}

export default withRouter(Navigation);