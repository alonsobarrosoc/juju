const express = require('express');
const router = express.Router();
const { listaReceta, nuevaReceta, photo, recetaById, read, listaRecetaFav, addFavoritos, removeFavoritos } = require('../controller/recetaController');
const { userById } = require('../controller/authController');

router.get('/listareceta', listaReceta);
router.get('/listarecetafav', listaRecetaFav);
router.get('/photo/:recetaId', photo);
router.get('/verreceta/:recetaId', read);
router.get('/addrecetafav/:recetaId', addFavoritos);
router.get('/removerecetafav/:recetaId', removeFavoritos);


router.post('/addreceta/:userId', nuevaReceta);

router.param('recetaId', recetaById);
router.param('userId', userById);


module.exports = router;