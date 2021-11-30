const mongoose = require('mongoose');

const RecetaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    ingredientes: {
        type: String,
        require: true
    },
    pasos: {
        type: String,
        require: true
    },
    video: {
        type: String,
        require: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    fav: {
        type: Boolean,
        default: false
    }
})



module.exports = mongoose.model("Receta", RecetaSchema);