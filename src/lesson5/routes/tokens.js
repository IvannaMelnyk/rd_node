const express = require('express');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

router.get('/', tokenController.getTokenList);
router.post('/', tokenController.createToken);
router.put('/:id', tokenController.updateToken);
router.delete('/:id', tokenController.deleteToken);

module.exports = router;
