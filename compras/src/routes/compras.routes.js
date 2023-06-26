const express = require('express');
const router = express.Router();

const compras = require('../controllers/compras.controller');

router.get('/', compras.getCompras);
router.get('/:id',compras.getCompra);
router.get('/filtro/:name', compras.getCompraByName);
router.get('/historial-compras/:id_user', compras.getComprasUser);
router.post('/', compras.createCompra);
router.put('/:id',compras.editCompra);
router.delete('/:id', compras.deleteCompra);


module.exports = router;