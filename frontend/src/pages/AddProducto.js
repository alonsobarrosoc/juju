import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

import Navigation from '../components/Navigation'
import Footer from '../components/Footer';

import { isAuthenticated, nuevaReceta, nuevoProducto } from '../core/apiCore';



function AddProducto() {

    const history = useHistory;



    const init = () => {
        if (!isAuthenticated() || user.role !== 1) {
            history.push('/');
        }
    }

    const [values, setValues] = useState({
        nombre: '',
        descripcion: '',
        photo: '',
        precio: '',

        loading: false,
        error: '',
        productoCreado: '',
        formData: '',
    })
    const {
        nombre,
        descripcion,
        photo,
        precio,

        loading,
        error,
        productoCreado,
        formData,
    } = values;

    const { user, token } = isAuthenticated();
    useEffect(() => {
        setValues({ formData: new FormData() })
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true })
        nuevoProducto(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        nombre: '',
                        descripcion: '',
                        photo: '',
                        precio: '',
                        loading: false,
                        productoCreado: data.nombre

                    })
                }
            })
    }

    const addProductoForm = () => (
        <form action="" className="space-y-6">

            <div>
                <label htmlFor="" className="text-sm font-bold text-gray-600 block">Nombre</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    onChange={handleChange('nombre')}
                    value={nombre}
                />
            </div>
            <div>
                <label htmlFor="" className="text-sm font-bold text-gray-600 block">Precio</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    onChange={handleChange('precio')}
                    value={precio}
                />
            </div>
            <div>
                <label htmlFor="" className="text-sm font-bold text-gray-600 block">Descripcion</label>
                <textarea
                    className='w-full p-2 border border-gray-300 rounded mt-1'
                    cols='40'
                    rows='5'
                    type="text"
                    onChange={handleChange('descripcion')}
                    value={descripcion}
                ></textarea>
                <div className='form-group'>
                    <label className='w-full p-2 border bg-gray-300 rounded mt-1'>
                        <input
                            onChange={handleChange('photo')}
                            type='file'
                            name='photo'
                            accept='image/*'
                        />
                    </label>
                </div>
                <div>
                    <button onClick={clickSubmit} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Iniciar Sesión</button>
                </div>
            </div>
        </form>
    )



    return (
        <div>
            <Navigation />
            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border-gray-300 items-center">
                {addProductoForm()}
            </div>
            <Footer />

        </div>
    )
}

export default AddProducto
