const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

const Orden = require('../models/Orden');
const{errorHandler} = require('../helpers/dberrorHandler');


exports.nuevaOrden = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err, fields) => {
        if(err){
            return res.status(400).json({
                error: "An error occurred"
            })
        }
        const{
            user,
            productos,
            direccion
        } = fields;
        let orden = Orden(fields);
        orden.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(result);
        })

    })
}


exports.listaOrden = (req, res) => {
    Orden.find()
        .exec((err, ordenes) => {
            if(err) {
                return res.status(400).json({
                    error: 'An error occurred'
                })
            }
            res.json(ordenes);
        })
}


//orden By User