const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
require('dotenv').config();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

mongoose
    .connect(process.env.DATABASE, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Base de datos conectada");
    });

app.get('/', (req, res) => {
    res.send("Server")
});

app.use("/jujucoffee/producto", require('./routes/productos'));
app.use('/jujucoffee/order', require('./routes/ordenes'));
app.use('/jujucoffee/order', require('./routes/auth'));
app.use('/jujucoffee/receta', require('./routes/receta'));
app.use('/jujucoffee/auth', require('./routes/auth'));



// lfsil


const port = process.env.PORT;
app.listen(port, () => {
    console.log(
        `Servidor MERN conectado en el puerto '${port}'`
    );
});
