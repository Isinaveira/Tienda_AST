const express = require('express');
const router = express.Router();

const compras = require('../controllers/compras.controller');

router.get('/', compras.getCompras);
router.get('/productos', compras.getProductos);
router.post('/', compras.createCompra);
router.put('/:id',compras.editCompra);
router.delete('/:id', compras.deleteCompra);

module.exports = router;