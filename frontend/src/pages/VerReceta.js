import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ReactPlayer from 'react-player';

import { Link } from 'react-router-dom';

import { readReceta } from '../core/apiCore';

import { API } from '../config';


const VerReceta = (props) => {

    const [receta, setReceta] = useState({});
    const [error, setError] = useState(false);

    // const recetaDisp = '';


    const loadUnaReceta = recetaId => {
        readReceta(recetaId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                // console.log(data);
                setReceta(data);
            }
        })

    }


    useEffect(() => {
        const recetaId = props.match.params.recetaId;

        loadUnaReceta(recetaId);


    }, [props])

    return (
        <div>
            <Navigation />
            {/* sm:grid-flow-col md:grid-flow-col */}

            <div className="grid xl:grid-flow-col flex container m-5">
                <div className='rounded-lg'>
                    <div className="container">
                        <h1 className="m-4 lg:text-9xl md:text-8xl sm:text-7xl text-5xl font-black mb-14 text-white bg-black uppercase rounded-2xl">{receta.name}</h1>
                        <img
                            // src={`${API}/receta/photo/${receta._id}`}
                            src={`${API}/receta/photo/${props.match.params.recetaId}`}
                            alt={receta.name}
                            className="m-3 img-cont rounded-lg"
                        // style={{ maxHeight: "600px", maxWidth: "300px" }} 
                        />
                        <ReactPlayer
                            url={receta.video}
                            className='m-3'
                        // style={{ maxWidth: '300px' }}
                        />
                    </div>

                </div>
                <div className='text-center items-center'>
                    <Link className="m-4 py-2 px-6 text-black bg-yellow-600 rounded-full text-2xl flex items-center hover:bg-black hover:text-white transition duration-300 ease-in-out flex items-center animate-pulse"
                        to='/shop'>
                        Comprar JUJU COFFEE
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </Link>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-3xl uppercase font-bold text-bold m-4 text-start' >Ingredientes</h1>
                    <div className="bg-black m-6 rounded-lg text-white text-2xl p-4 text-left">
                        {receta.ingredientes}
                        {/* {receta.ingredientes.split('#').map((step, i) => (
                            <div key={i}>
                                <h2>{step}{"\n"}</h2>
                            </div>
                        ))} */}
                    </div>
                    <h1 className='lg:text-5xl md:text-4xl sm:text-3xl text-3xl uppercase font-bold text-black m-4 text-start' >receta</h1>
                    <div className="bg-black m-6 rounded-lg text-white text-2xl p-4 text-left">
                        {receta.pasos}
                        {/* {receta.pasos.split('#').map((step, i) => (
                            <div key={i}>
                                <h2>{step}{"\n"}</h2>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>


            <Footer />

        </div>
    )
}

export default VerReceta;
