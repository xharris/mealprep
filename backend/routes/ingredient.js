var express = require('express');
var router = express.Router();

router.get('/api/ingredient', (req, res) => main.getIngredient(req, res, db))
router.post('/api/ingredient', (req, res) => main.postIngredient(req, res, db))

module.exports = router;