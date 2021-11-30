import React, { useState } from 'react'
import { API } from '../../config'
import { agregarACarritoPost, isAuthenticated } from '../../core/apiCore'
import { Link } from 'react-router-dom';

function ProductoCard({ producto }) {

    const { user, token } = isAuthenticated();
    const [cantidad, setCantidad] = useState(1);
    const [error, setError] = useState(false);

    const clickAgregaCarrito = () => {
        agregarACarritoPost(user._id, token, producto._id, { cantidad })
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
            })
    }
    return (
        <>

            <div className="w-full p-2">
                <div className="bg-white shadow-lg hover:shadow-xl rounded-lg ">
                    <div className="bg-gray-400 h-64 rounded-t-lg p-4 bg-no-repeat bg-center bg-cover" style={{ backgroundImage: `url(${API}/producto/photo/${producto._id})` }}>
                        <div className="text-right">
                            {/* <button className="text-gray-300 hover:text-pink-500 p-2 rounded-full" style={{ background: 'rgba(0,0,0,0.3)' }}>
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                                </svg>
                            </button> */}
                        </div>
                    </div>
                    <div className="flex justify-between items-start px-2 pt-2">
                        <div className="p-2 flex-grow">
                            <h1 className="font-medium text-xl font-poppins">{producto.nombre}</h1>
                            <p className="text-gray-500 font-nunito">{producto.descripcion}</p>
                        </div>
                        <div className="p-2 text-right">
                            <div className="text-teal-500 font-semibold text-lg font-poppins">${producto.precio}</div>
                            {/* <div className="text-xs text-gray-500 line-through font-poppins">$50</div> */}
                        </div>
                    </div>
                    <div className="flex justify-center items-center px-2 pb-2">
                        <div className="w-1/2 p-2">

                            <Link className='block w-full bg-white text-center hover:bg-gray-100 text-teal-500 border-2 border-teal-500 px-3 py-2 rounded uppercase font-poppins font-medium' to={`/verproducto/${producto._id}`}>
                                Ver Más
                            </Link>
                            {/* <button className="block w-full bg-white hover:bg-gray-100 text-teal-500 border-2 border-teal-500 px-3 py-2 rounded uppercase font-poppins font-medium">
                                Ver Producto
                            </button> */}
                        </div>

                        <div className="w-1/2 p-2">
                            {isAuthenticated() &&
                                <button
                                    onClick={clickAgregaCarrito}
                                    className="block w-full bg-white hover:bg-gray-100 text-teal-500 border-2 border-teal-500 px-3 py-2 rounded uppercase font-poppins font-medium">
                                    Agregue a carrito
                                </button>
                            }
                            {!isAuthenticated() &&
                                <Link to='/signin'>

                                    <button
                                        className="block w-full bg-white hover:bg-gray-100 text-teal-500 border-2 border-teal-500 px-3 py-2 rounded uppercase font-poppins font-medium">
                                        Inicie sesión
                                    </button>
                                </Link>

                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ProductoCard
