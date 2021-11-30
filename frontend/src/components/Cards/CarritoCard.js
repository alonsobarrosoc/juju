import React, { useEffect, useState } from 'react'
import { API } from '../../config';
import { isAuthenticated, pullCarrito, readProducto } from '../../core/apiCore';

function CarritoCard({ productoId, stateChanger }) {
    const [producto, setProducto] = useState([]);
    const [error, setError] = useState(false);
    const [total, setTotal] = useState(0);

    const { user, token } = isAuthenticated();

    const loadProductos = () => {
        readProducto(productoId.producto).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProducto(data)

            }
        })
    }
    const setPTotal = () => {
        // sumaTotal(total + (productoId.cantidad * producto.precio))
        return total + (productoId.cantidad * producto.precio)
    }
    const borrarDeCarrito = () => {
        pullCarrito(user._id, token, productoId._id).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                window.location.reload()
            }
        })

    }
    useEffect(() => {
        loadProductos();

    }, [])

    return (
        <>
            <div className="container flex items-center">

                <div className='container flex bg-black rounded-xl h-52 items-center w-screen'>
                    <img
                        className='rounded h-5/6 m-2'
                        src={`${API}/producto/photo/${productoId.producto}`}
                        alt={productoId.producto} />
                    <div className="container">
                        <h1 className="text-xl font-poppins text-white">Nombre:</h1>
                        <h1 className="font-bold text-xl font-poppins text-white">{producto.nombre}</h1>
                    </div>
                    <div className="container" >
                        <h1 className="text-xl font-poppins text-white">Cantidad:</h1>
                        <h1 className="font-bold text-xl font-poppins text-white">X{productoId.cantidad}</h1>
                    </div>
                    <div className="container w-1/3 flex" >
                        <h1 className="font-bold text-xl font-poppins text-white">Total: ${setPTotal()}</h1>
                    </div>
                    {stateChanger(setPTotal)}



                </div >
                <button onClick={borrarDeCarrito} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 m-4 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </>
    )
}

export default CarritoCard
