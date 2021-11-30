const express = require ('express');
const { nuevaOrden, listaOrden } = require('../controller/ordenController');
const router = express.Router();

router.post('/addorden', nuevaOrden);

router.get('/listaorden', listaOrden);


module.exports = router;