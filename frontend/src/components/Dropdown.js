import React from 'react'
import { Link } from 'react-router-dom';

function Dropdown({ isOpen, toggle }) {



    return (
        <div className={isOpen ? "grid grid-rows-4 text-center items-center bg-black" : 'hidden'}>
            <Link className="p-4 text-white" to='/'>Home</Link>
            <Link className="p-4 text-white" to='/shop'>Shop</Link>
            <Link className="p-4 text-white" to='/about'>About</Link>
            <Link className="p-4 text-white" to='/contact'>Contact</Link>

        </div>
    )
}


export default Dropdown
