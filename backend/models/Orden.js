const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const OrdenSchema = new mongoose.Schema(
    {
        user: {
            type: ObjectId,
            require: true,
            ref: "User"

        },
        productos: {
            type: [ObjectId],
            ref: 'Producto'
        },
        direccion: {
            type: String,
            trim: true,
            require: true,
            maxLength: 2000
        }
    }
)


module. exports = mongoose.model('Orden', OrdenSchema);