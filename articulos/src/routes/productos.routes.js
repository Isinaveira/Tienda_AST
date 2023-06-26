const express = require('express');
const router = express.Router();
const productos=  require('../controllers/productos.controller');

router.get('/',productos.getProductos);
router.get('/get-image/:imageName', productos.getImagen);
router.get('/:id',productos.getProducto);
router.get('/filtro/:name?',productos.getProductosPorNombre);
router.post('/',productos.createProducto);
router.put('/:id',productos.editProducto);
router.delete('/:id',productos.deleteProducto);
module.exports= router;