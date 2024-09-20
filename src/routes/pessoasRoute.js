const { Router } = require('express');
const PessoaControler = require('../controllers/PessoaController.js');

const router = Router();

const PessoaController = new PessoaControler();

router.get('/pessoas', (req, res) => PessoaController.pegaTodos(req, res));

module.exports = router;