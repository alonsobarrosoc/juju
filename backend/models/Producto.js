const mongoose = require('mongoose');


const ProductoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            require: true,
            maxLength: 32
        },
        descripcion: {
            type: String,
            trim: true,
            require: true,
            maxLength: 2000
        },
        disponible: {
            type: Boolean,
            default: true
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        precio: {
            type: Number,
            require: true
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("Producto", ProductoSchema);