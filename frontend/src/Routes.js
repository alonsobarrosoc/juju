import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/about';
import Shop from './pages/shop';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Dashboard';
import AddReceta from './pages/AddReceta';
import AddProducto from './pages/AddProducto';
import Receta from './pages/Receta';
import VerReceta from './pages/VerReceta';
import VerProducto from './pages/VerProducto';
import Carrito from './pages/Carrito';
import RecetasAdmin from './pages/RecetasAdmin';
import ProductosAdmin from './pages/ProductosAdmin';

const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/about' exact component={About} />
                    <Route path='/shop' exact component={Shop} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/signin' exact component={Signin} />
                    <Route path='/dashboard' exact component={Dashboard} />
                    <Route path='/addreceta' exact component={AddReceta} />
                    <Route path='/addproducto' exact component={AddProducto} />
                    <Route path='/recetas' exact component={Receta} />
                    <Route path='/verreceta/:recetaId' exact component={VerReceta} />
                    <Route path='/verproducto/:productoId' exact component={VerProducto} />
                    <Route path='/verproducto/:productoId' exact component={VerProducto} />
                    <Route path='/carrito/:userId' exact component={Carrito} />
                    <Route path='/verrecetaadmin' exact component={RecetasAdmin} />
                    <Route path='/verproductoadmin' exact component={ProductosAdmin} />
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default Routes;