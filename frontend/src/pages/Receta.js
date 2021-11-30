import React, { useState, useEffect } from 'react'

import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import RecetaCard from '../components/Cards/RecetaCard';
import { getRecetas } from '../core/apiCore';

function Receta() {

    const [recetas, setRecetas] = useState([]);
    const [error, setError] = useState(false);

    const loadRecetas = () => {
        getRecetas().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setRecetas(data);
                console.log(data);
            }
        })
    }

    useEffect(() => {
        loadRecetas();
    }, [])


    return (
        <div>
            <Navigation />

            <div className="grid md:grid-flow-col flex">
                {recetas.map((receta, i) => (
                    <div key={i} className='mx-4 my-4'>
                        <RecetaCard receta={receta} />
                    </div>

                ))}

            </div>

            <Footer />


        </div>
    )
}

export default Receta
