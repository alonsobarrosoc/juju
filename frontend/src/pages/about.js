import React from 'react'
import Footer from '../components/Footer'
import Navigation from '../components/Navigation'
import logo from '../Recursos/SVG/jujunegro.svg'

function About() {
    return (
        <>
            <Navigation />
            <div className="container flex items-center">

                <h1 className="text-7xl uppercase font-black text-white bg-black p-4 m-4 rounded-2xl">
                    ¿Quiénes somos?
                </h1>
                <div className="grid md:grid-flow-col">
                    <img
                        className='h-24'
                        src={logo}
                        alt="" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About
