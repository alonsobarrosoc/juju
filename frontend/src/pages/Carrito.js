import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import CarritoCard from '../components/Cards/CarritoCard';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getCarrito, isAuthenticated } from '../core/apiCore';

function Carrito(props) {

    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(false);
    const [totProd, setTotProd] = useState(0);

    const { user, token } = isAuthenticated();

    var count = 0;

    const loadProductos = (userId) => {
        getCarrito(userId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductos(data)
            }
        })
    }


    useEffect(() => {
        loadProductos(user._id);
    }, [props])

    const sumaTotal = (p) => {
        count += p;
    }







    return (
        <div>
            <Navigation />
            <h1 className="m-4 lg:text-9xl md:text-8xl sm:text-7xl text-5xl font-black mb-14 text-black uppercase">Ordenar Ahora</h1>
            <div className="grid xl:grid-flow-col flex container w-screen">
                <div className=''>
                    {productos.map((producto, i) => (
                        <div key={i} className='my-4'>
                            <CarritoCard productoId={producto} stateChanger={setTotProd} />
                            {sumaTotal(totProd)}
                        </div>
                    ))}
                    {count > 0 && (
                        <div className='bg-gradient-to-r from-green-400 to-blue-500 container flex rounded-2xl items-center'>
                            <h1 className="m-4 lg:text-4xl md:text-3xl sm:text-2xl text-2xl font-black mb-14 text-white uppercase">Ordenar Ahora</h1>
                            <h1 className="m-4 lg:text-3xl md:text-2xl sm:text-1xl text-1xl font-black mb-14 text-black uppercase">Total: ${count}</h1>
                        </div>
                    )}
                    {count == 0 && (
                        <div className='text-center items-center'>
                            <Link className="py-6 px-10 text-white bg-black rounded-full text-3xl hover:bg-white transition duration-300 ease-in-out flex items-center animate-bounce"
                                to='/shop'>
                                Comprar Ahora!
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 ml-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
                <div>
                </div>

            </div>


            <Footer />

        </div >
    )
}

export default Carrito
