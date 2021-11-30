const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Producto = require('../models/Producto');
const { errorHandler } = require('../helpers/dberrorHandler');


exports.nuevoProducto = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        const { nombre, descripcion, precio } = fields;
        let producto = new Producto(fields)
        if (files.photo) {
            if (files.photo.size > 5000000) {
                return res.status(400).json({
                    error: "Imgae should be smaller than 5MB"
                })
            }
            producto.photo.data = fs.readFileSync(files.photo.path);
            producto.photo.contentType = files.photo.type;
        }
        producto.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result)
        })
    })
}

exports.listaProducto = (req, res) => {
    Producto.find()
        .select("-photo")
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    error: 'Empty'
                })
            }
            res.json(productos)
        })
}

exports.photos = (req, res, next) => {
    if (req.producto.photo.data) {
        res.set('Content-Type', req.producto.photo.contentType);
        return res.send(req.producto.photo.data)
    }
    next();
}

exports.productoById = (req, res, next, id) => {
    Producto.findById(id)
        .exec((err, producto) => {
            if (err || !producto) {
                return res.status(400).json({
                    error: "Prodcuto no encontrado"
                });
            }
            req.producto = producto;
            next();
        })
}
exports.read = (req, res, next) => {
    req.producto.photo = undefined;
    return res.json(req.producto);
}