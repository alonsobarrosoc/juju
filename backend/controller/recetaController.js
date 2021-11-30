const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Receta = require('../models/Receta');
const { errorHandler } = require('../helpers/dberrorHandler');



exports.nuevaReceta = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }
        const {
            name,
            ingredientes,
            pasos,
            video
        } = fields;
        let receta = new Receta(fields);
        if (files.photo) {
            if (files.photo.size > 100000000) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }
            receta.photo.data = fs.readFileSync(files.photo.path);
            receta.photo.contentType = files.photo.type;
        }
        receta.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })
    })
}


exports.listaReceta = (req, res) => {
    Receta.find()
        .select('-photo')
        .exec((err, recetas) => {
            if (err) {
                return res.status(400).json({
                    error: 'an error occurred'
                })
            }
            res.json(recetas);
        })
}
exports.listaRecetaFav = (req, res) => {
    Receta.find({ fav: true })
        .select('-photo')
        .exec((err, recetas) => {
            if (err) {
                return res.status(400).json({
                    error: 'an error occurred'
                })
            }
            res.json(recetas);
        })
}

exports.recetaById = (req, res, next, id) => {
    Receta.findById(id)
        .exec((err, receta) => {
            if (err || !receta) {
                return res.status(400).json({
                    error: "La receta no existe"
                });
            }
            req.receta = receta;
            next();
        })
}

// exports.photosp = (req, res, next) => {
//     if (req.receta.photo.data) {
//         res.set('Content-Type', req.receta.photo.contentType);
//         return res.send(req.receta.photo.data);
//     }
//     next();
// }
exports.photo = (req, res, next) => {
    if (req.receta.photo.data) {
        res.set('Content-Type', req.receta.photo.contentType);
        return res.send(req.receta.photo.data)
    }
    next();
}

exports.read = (req, res) => {
    req.receta.photo = undefined;
    return res.json(req.receta);
}

exports.addFavoritos = (req, res) => {
    Receta.findByIdAndUpdate(
        {
            _id: req.params.recetaId
        }, {
        fav: true
    }, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Receta added to favs"
        })
    }
    )
}

exports.removeFavoritos = (req, res) => {
    Receta.findByIdAndUpdate(
        {
            _id: req.params.recetaId
        }, {
        fav: false
    }, (err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Receta removed from favs"
        })
    })
}