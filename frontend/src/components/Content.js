import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap'



import car1 from '../Recursos/carrusel/car1.png'
import car2 from '../Recursos/carrusel/car2.png'
import car3 from '../Recursos/carrusel/car3.png'
import { getRecetasFavoritos } from '../core/apiCore';
import RecetaCard from './Cards/RecetaCard';

function Content() {

    const [recetas, setRecetas] = useState([]);
    const [error, setError] = useState(false);

    const loadRecetas = () => {
        getRecetasFavoritos().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setRecetas(data)
            }
        })
    }
    useEffect(() => {
        loadRecetas();
        console.log(recetas);
    }, []);

    return (
        <>
            <div className='flex flex-col justify-center items-center bg-white py-4'>
                <Link className="py-2 px-6 h-3/4 text-black border-5 rounded-full border-black text-2xl flex items-center hover:bg-black hover:text-white transition duration-300 ease-in-out"
                    to='/recetas'>
                    Conoce las recetas que tenemos para ti
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                </Link>
            </div>
            <div className='container pb-24'>
                <div className="grid md:grid-flow-col">
                    {recetas.map((receta, i) => (
                        <div className="w-96" key={i}>
                            <RecetaCard receta={receta} />
                        </div>
                    ))}

                </div>
            </div>


        </>
    )
}

export default Content
