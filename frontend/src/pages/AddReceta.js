import React, { useEffect, useState } from 'react'

import Navigation from '../components/Navigation'
import Footer from '../components/Footer';
import { isAuthenticated, nuevaReceta } from '../core/apiCore';
import { useHistory } from 'react-router-dom';

function AddReceta() {
    const history = useHistory;

    const init = () => {
        if (!isAuthenticated() || user.role !== 1) {
            history.push('/');
        }
    }

    const [values, setValues] = useState({
        name: '',
        ingredientes: '',
        pasos: '',
        video: '',
        photo: '',
        loading: false,
        error: '',
        recetaCreada: '',
        formData: ''
    })
    const {
        name,
        ingredientes,
        pasos,
        video,
        photo,
        loading,
        error,
        recetaCreada,
        formData
    } = values;

    const { user, token } = isAuthenticated();

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = (event) => {
        event.preventDefault(); setValues({ ...values, error: '', loading: true })
        nuevaReceta(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        ingredientes: '',
                        pasos: '',
                        video: '',
                        photo: '',
                        loading: false,
                        recetaCreada: data.name
                    })
                }
            })
        console.log(user);

    }


    const addRecetaForm = () => (
        <form action="" className="space-y-6">

            <div>
                <label htmlFor="" className="text-sm font-bold text-gray-600 block">Nombre</label>
                <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    onChange={handleChange('name')}
                    value={name}
                />
            </div>
            <div>
                <label htmlFor="" className="text-sm font-bold text-gray-600 block">Ingredientes</label>
                <textarea
                    className='w-full p-2 border border-gray-300 rounded mt-1'
                    cols='40'
                    rows='5'
                    type="text"
                    onChange={handleChange('ingredientes')}
                    value={ingredientes}
                ></textarea>
                {/* <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    onChange={handleChange('ingredientes')}
                    value={ingredientes}
                /> */}
            </div>
            <div>
                <label htmlFor="" className="text-sm font-bold text-gray-600 block">Pasos</label>
                <textarea
                    className='w-full p-2 border border-gray-300 rounded mt-1'
                    cols='40'
                    rows='5'
                    type="text"
                    onChange={handleChange('pasos')}
                    value={pasos}
                ></textarea>

            </div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">Video</label>
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded mt-1"
                onChange={handleChange('video')}
                value={video}
            />
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
        </form>
    )
    return (
        <div>
            <Navigation />
            <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border-gray-300 items-center">
                {addRecetaForm()}
            </div>



            <Footer />

        </div>
    )
}

export default AddReceta
