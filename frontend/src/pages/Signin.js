import React, { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom';


import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { authenticate, isAuthenticated, signin } from '../core/apiCore';
import logo from '../Recursos/SVG/jujunegro.svg'


function Signin() {

    let history = useHistory();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;

    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(
                        data, () => {
                            setValues({
                                ...values,
                                redirectToReferrer: true
                            })
                        }
                    )
                    console.log(data.user.role);
                    if (data.user.role === 0) {
                        history.push('/')
                    }
                    if (data.user.role === 1) {
                        history.push('/dashboard')
                    }
                }

            })
        // console.log(user.role);

        // if (user.role === 0) {
        //     history.push('/')
        // }

    }


    const signinForm = () => (
        <form action="" className="space-y-6">

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
                {/* <div className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-300 rounded" />
                    <label htmlFor="" className="ml-2 text-gray-600">Remember me</label>
                </div>
                <div>
                    <a href="" className="font-medium text-sm text-blue-500">Olvidaste tu contraseña?</a>
                </div> */}
            </div>
            <div>
                <button onClick={clickSubmit} to='/' className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Iniciar Sesión</button>
            </div>
        </form>
    )

    return (
        <div>
            <Navigation />
            <div className="grid md:grid-flow-col">
                <div className="text-center font-medium text-xl">

                    <img
                        src={logo}
                        width="150"
                        height="150"
                        className="d-inline-block align-top ms-4"
                        alt="JuJu Coffee"
                    />
                    <h1 className='text-3xl font-bold text-gray-900 mt-2 text-center'>Iniciar Sesión</h1>


                </div>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border-gray-300 items-center">
                    {signinForm()}
                </div>
            </div>


            <Footer />

        </div>
    )
}


export default Signin;
