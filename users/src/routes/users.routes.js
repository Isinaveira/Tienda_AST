const express = require('express');
const router = express.Router();

const users = require('../controllers/users.controller');

router.get('/', users.getUsers);
router.post('/', users.createUser);
router.get('/users/role/:role', users.getUsersByRole);
router.get('/:id', users.getUser);
router.get('/role/:id', users.getRole);
router.delete('/:id', users.deleteUser);

module.exports = router;