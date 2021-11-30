import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import { signup } from '../core/apiCore'
import logo from '../Recursos/SVG/jujunegro.svg'


function Signup() {

    let history = useHistory();

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })
    const {
        name,
        email,
        password,
        error,
        success
    } = values

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }
    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
        history.push('/signin');
    }

    const signupForm = () => (
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
                <label htmlFor="" className="text-sm font-bold text-gray-600 block">Email</label>
                <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    onChange={handleChange('email')}
                    value={email}
                />
            </div>
            <div>
                <label htmlFor="" className="text-sm font-bold text-gray-600 block">Contraseña</label>
                <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    onChange={handleChange('password')}
                    value={password}
                />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-300 rounded" />
                    <label htmlFor="" className="ml-2 text-gray-600">Remember me</label>
                </div>
                <div>
                    <a href="" className="font-medium text-sm text-blue-500">Olvidaste tu contraseña?</a>
                </div>
            </div>
            <div>
                <button onClick={clickSubmit} to='/' className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Crear Cuenta</button>
            </div>
        </form>
    )

    return (
        <>
            <Navigation />
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
                <div className="max-w-md w-full mx-auto">
                    <div className="text-center font-medium text-xl">

                        <img
                            src={logo}
                            width="150"
                            height="150"
                            className="d-inline-block align-top ms-4"
                            alt="JuJu Coffee"
                        />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
                        Crear una Cuenta
                    </div>
                </div>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border-gray-300 items-center">
                    {signupForm()}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup
