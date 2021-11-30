const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dberrorHandler');

// SESION______________________________________________________________
exports.signup = (req, res) => {

  console.log('req.body', req.body);  //"name" : "Alonso Barroso", "email":"test@test.com", "ppassword": "test123"
  const user = new User(req.body);

  user.save((error, user) => {
    console.log("reached signup endpoint")
    if (error) {
      return res.status(400).json({
        error: "Please check field, an error occurred"
      })
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user })
  })
}

exports.signin = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(401).json({
        error: 'User with that email does not exist'
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: 'Email and password do not macth'
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.cookie('t', token, { expire: new Date() + 9999 })
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, email, name, role } })
  });
}

exports.signout = (req, res) => {
  res.clearCookie('t')
  res.json({ message: "Signout success" });
}

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    req.profile = user;
    next();
  });
}

exports.listaProductos = (req, res) => {


  User.findById(req.params.userId)
    .exec((err, user) => {
      if (err) {
        return res.status(400).json({
          error: "User not found"
        });
      }
      res.json(user.carrito);
    })

}


// CARRITO ____________________________________________________________
exports.carritoById = (req, res, next, id) => {
  User.find({
    '_id': {
      $in: [
        id
      ]
    }
  })
    .exec((err, prod) => {
      if (err || !prod) {
        return res.status(400).json({
          error: 'Product not found'
        });
      }
      req.profile = prod;
      next();
    })
}
exports.pushCarritoCant = (req, res, next) => {
  User.findByIdAndUpdate(
    {
      _id: req.params.userId
    }, {
    $push: {
      carrito: {
        producto: req.params.productoId,
        cantidad: req.body.cantidad
      },
    }
  }, (err, result) => {
    if (err) {
      return res.status(401).json({
        error: errorHandler(err)
      })
    }
    res.send(result);
  })

}
exports.pullCarrito = (req, res) => {
  User.findByIdAndUpdate(
    {
      _id: req.params.userId
    }, {
    $pull: {
      carrito: {
        _id: req.params.carritoIdProd
      },
    }
  }, (err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.send(result)
  })
}

// TOTAL____________________________________
