const express = require('express');
const morgan = require('morgan');
const cors=require('cors')
const app= express();
const multer = require('multer');
const bodyParser = require('body-parser');
//variables de entorno
app.set('port',process.env.PORT || 3000); 
//middlewares
app.use(morgan('dev'));
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));
app.use(cors())
//Rutas
app.use('/api/productos',require('./routes/productos.routes'));
app.use('/api/productos/uploads', express.static('uploads'));
module.exports= app;