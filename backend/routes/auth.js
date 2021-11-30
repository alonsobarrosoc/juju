const express = require("express");
const router = express.Router();

const { signup, signin, signout, userById, pushCarritoCant, listaProductos, pullCarrito, carritoById } = require("../controller/authController");
const { productoById } = require("../controller/productoController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/addcarrito/:productoId/:userId", pushCarritoCant);
router.post("/pullCarrito/:carritoIdProd/:userId", pullCarrito);

router.get('/carrito/:userId', listaProductos);

router.param('productoId', productoById);
router.param('userId', userById);
router.param('carritoIdProd', carritoById)


module.exports = router;
