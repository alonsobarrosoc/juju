import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { agregarACarrito, agregarACarritoPost, isAuthenticated, readProducto } from '../core/apiCore';
import { API } from '../config';
import { Link } from 'react-router-dom';

function VerProducto(props) {

    const [producto, setProducto] = useState({});
    const [cantidad, setCantidad] = useState(1);
    const [error, setError] = useState(false);

    const { user, token } = isAuthenticated();

    const handleChange = name => event => {
        setCantidad(event.target.value)
    }


    const loadUnProducto = productoId => {
        readProducto(productoId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducto(data)
            }
        })
    }

    useEffect(() => {
        const productoId = props.match.params.productoId;
        loadUnProducto(productoId);
    }, [props]);

    // const agregarACarritoClick = () => {
    //     // setValues({ ...values, error: false, loading: true })


    //     agregarACarrito(user._id, token, producto._id)
    //         .then(data => {
    //             if (data.error) {
    //                 setError(data.error)
    //             } else {
    //                 // setValues({
    //                 //     ...values,
    //                 //     cantidad: 0
    //                 // })
    //                 console.log(data);
    //             }
    //         })


    // }
    const agregarACarritoClickPost = () => {
        // setValues({ ...values, error: false, loading: true })

        agregarACarritoPost(user._id, token, producto._id, { cantidad })
            .then(data => {
                if (data.error) {
                    setError(data.error)
                } else {
                    // setValues({
                    //     ...values,
                    //     cantidad: 0
                    // })
                    console.log(data);
                }
            })



    }

    return (
        <div>
            <Navigation />
            <div className="grid xl:grid-flow-col flex container m-5">
                <div className='bg-black rounded-2xl m-3'>

                    <h1 className="m-4 lg:text-9xl md:text-8xl sm:text-7xl text-5xl font-black mb-14 text-white uppercase">{producto.nombre}</h1>
                    <div className="bg-white rounded-2xl m-4 p-1">
                        <h1 className="m-4 lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-black mb-14 text-black uppercase">Descripción</h1>
                        <h1 className="m-4 lg:text-3xl md:text-2xl sm:text-1xl text-2xl font-bold mb-14 text-bold ">{producto.descripcion}</h1>

                    </div>
                    {isAuthenticated() &&
                        <div className="flex container">

                            <form className='flex container'>


                                <button className="m-4 py-2 px-6 text-black bg-yellow-600 rounded-full text-2xl flex items-center hover:bg-black hover:text-white transition duration-300 ease-in-out flex items-center"
                                    onClick={agregarACarritoClickPost}>
                                    Agregar a carrito
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </button>
                                <h1 className='m-4 lg:text-3xl md:text-2xl sm:text-1xl text-2xl font-bold mb-14 text-bold text-white items-center'>Cantidad:</h1>
                                <select

                                    onChange={handleChange('cantidad')}
                                    type='text'
                                    className='m-4 w-10 rounded-xl'
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                    <option>11</option>
                                    <option>12</option>
                                    <option>13</option>
                                    <option>14</option>
                                    <option>15</option>
                                    <option>16</option>
                                    <option>17</option>
                                    <option>18</option>
                                    <option>19</option>
                                    <option>20</option>
                                </select>
                            </form>

                        </div>

                    }
                    {!isAuthenticated() &&
                        <Link className="m-4 py-2 px-6 text-black bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-2xl flex items-center hover:text-white transition duration-300 ease-in-out flex items-center"
                            to='/signin'>
                            Iniciar Sesión

                        </Link>
                    }

                </div>
                <img
                    // src={`${API}/receta/photo/${receta._id}`}
                    src={`${API}/producto/photo/${props.match.params.productoId}`}
                    alt={producto.nombre}
                    className="m-3 img-cont rounded-lg"
                // style={{ maxHeight: "600px", maxWidth: "300px" }} 
                />

            </div>

            <Footer />

        </div>
    )
}

export default VerProducto
