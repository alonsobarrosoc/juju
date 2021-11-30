import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import RecetaCard from '../components/Cards/RecetaCard';
import RecetaCardAdmin from '../components/Cards/RecetaCardAdmin';

import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import { getRecetas, isAuthenticated } from '../core/apiCore';

function RecetasAdmin() {
    const [recetas, setRecetas] = useState([]);
    const [error, setError] = useState(false);

    const history = useHistory();

    const { user } = isAuthenticated();

    const init = () => {
        if (!isAuthenticated() || user.role !== 1) {
            history.push('/');
        }
    }

    const loadRecetas = () => {
        getRecetas().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setRecetas(data)
            }
        })
    }

    useEffect(() => {
        init();
        loadRecetas();
    }, [])
    return (
        <div>
            <Navigation />
            <div className="grid md:grid-flow-col m-11">
                {recetas.map((receta, i) => (
                    <div key={i} className='w-96'>
                        <RecetaCardAdmin receta={receta} />
                    </div>
                ))}

            </div>

            <Footer />

        </div>
    )
}

export default RecetasAdmin
