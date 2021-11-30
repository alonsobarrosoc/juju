import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation';

import Footer from '../components/Footer';
import { getProductos } from '../core/apiCore';
import ProductoCard from '../components/Cards/ProductoCard';

const Shop = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(false);

    const loadProductos = () => {
        getProductos().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductos(data)
                console.log(data);
            }
        })
    }
    useEffect(() => {
        loadProductos();
    }, []);
    return (
        <div>
            <Navigation />
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">

                    {productos.map((producto, i) => (
                        <div key={i} className='mx-4 my-4'>
                            <ProductoCard producto={producto} />
                        </div>

                    ))}

                </div>

            </div>


            <Footer />

        </div>
    )
}

export default Shop
