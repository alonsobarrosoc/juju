import React,{useEffect, useState} from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import PayPal from '../components/PayPal'



const Pagar = (props) => {

  const [checkout, setCheckout] = useState(false)

  return (
    <div>
      <Navigation/>
      <div className = "mb-12 p-2 container">


        <h2 className = "font-black text-4xl p-2 bg-black text-white rounded-lg" >YA CASI, SOLO NECESITAMOS ESTA INFORMACIÓN</h2>
      </div>


      {checkout ? (

        <PayPal/>
      ) : (

        <button onClick = {() => setCheckout(true)}>Check Out</button>
      )}



      <Footer/>
    </div>
  )
}


export default Pagar;
