import { API } from '../config';


//USER
export const signin = user => {
    return fetch(`${API}/auth/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        })
}

export const signup = user => {
    return fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/auth/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
}

export const getCarrito = (userId) => {
    return fetch(`${API}/auth/carrito/${userId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err))
}

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
}


//RECETA --------------------------------
export const nuevaReceta = (userId, token, receta) => {
    return fetch(`${API}/receta/addreceta/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: receta
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
            return (err);
        })
}

export const getRecetas = () => {
    return fetch(`${API}/receta/listareceta`, {
        method: 'GET'
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .catch(err => console.log(err))
}

export const readReceta = (recetaId) => {
    return fetch(`${API}/receta/verreceta/${recetaId}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err)
        // return err;
    });
}

export const addRecetaFav = (userId, token, recetaId) => {
    return fetch(`${API}/receta/addrecetafav/${recetaId}`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err)
    })
}

export const removeRecetaFav = (userId, token, recetaId) => {
    return fetch(`${API}/receta/removerecetafav/${recetaId}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err);
    })
}
// CARRITO __________________________________________________
export const agregarACarrito = (userId, token, productoId) => {
    return fetch(`${API}/auth/addcarrito/${productoId}/${userId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}
export const agregarACarritoPost = (userId, token, productoId, cantidad) => {
    return fetch(`${API}/auth/addcarrito/${productoId}/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(cantidad)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

export const pullCarrito = (userId, token, carritoIdProd,) => {
    return fetch(`${API}/auth/pullcarrito/${carritoIdProd}/${userId}`, {
        method: 'POST'
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}




//PRODUCTOS_______________________________________________________
export const nuevoProducto = (userId, token, receta) => {
    return fetch(`${API}/producto/addproducto/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: receta
    })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .catch(err => console.log(err))
}

export const getProductos = () => {
    return fetch(`${API}/producto/listaproducto`, {
        method: "GET"
    }).then(response => {
        console.log(response);
        return response.json();
    }).catch(err => console.log(err))
}

export const getRecetasFavoritos = () => {
    return fetch(`${API}/receta/listarecetafav`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}


export const readProducto = (productoId) => {
    return fetch(`${API}/producto/verproducto/${productoId}`, {
        method: 'GET'
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err)
        return err;
    });
}