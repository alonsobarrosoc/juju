const express = require('express');
const { userById } = require('../controller/authController');
const { listaProducto, nuevoProducto, productoById, photos, read } = require('../controller/productoController');

const router = express.Router();

router.get('/listaproducto', listaProducto);
router.get('/photo/:productoId', photos);
router.get('/verproducto/:productoId', read);

router.post('/addproducto/:userId', nuevoProducto);

router.param('productoId', productoById);
router.param('userId', userById)



module.exports = router;