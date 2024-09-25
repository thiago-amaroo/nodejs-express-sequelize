const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js');
const MatriculaController = require('../controllers/MatriculaController.js');


const router = Router();

const pessoaController  = new PessoaController();
const matriculaController = new MatriculaController();

//Quando o método do controlador é static, so passo nome do controlador.metodo, sem parametros req res
//Quando metodos do controlador nao sao statics, precisam ser instanciados em um objeto, preciso usar funcao callback passando req e res

router.get('/pessoas', (req, res) => pessoaController.pegaTodos(req, res) );

//rota usando scope do modelo Pessoa para listar todas as pessoas, inclusive ativo = false
//Isso pq no modelo Pessoa usei scopeDefault ativo=true, entao toda vez que buscar pelo modelo ele filtra e traz apenas ativo = true
router.get('/pessoas/todos', (req, res) => pessoaController.pegaTodasAsPessoas(req, res) );

router.get('/pessoas/:id', (req, res) => pessoaController.pegaUmPorId(req, res));
router.post('/pessoas', (req, res) => pessoaController.criaNovo(req, res));
router.put('/pessoas/:id', (req, res) => pessoaController.atualiza(req, res));
router.delete('/pessoas/:id', (req, res) => pessoaController.excluir(req, res));

//Para exibir matriculas de uma pessoa uso controlador da pessoa
router.get('/pessoas/:estudanteId/matriculas', (req, res) => pessoaController.pegaMatriculasAtivas(req, res));
router.get('/pessoas/:estudanteId/matriculas/todos', (req, res) => pessoaController.pegaTodasAsMatriculas(req, res));

//Matriculas nao acessa sozinha. Tem que ser matriculas de um estudante
router.post('/pessoas/:estudanteId/matriculas', (req, res) => matriculaController.criaNovo(req, res));

module.exports = router;




// EXEMPLO DE VALIDACOES NA ROTA COM EXPRESS validator

// const { check, validationResult } = require('express-validator');

// router.post('/pessoas/:estudante_id/matriculas', [
//   check('status').isIn(['matriculado', 'cancelado']),
//   check('curso_id').isInt(),
//   check('estudante_id').isInt()
// ], (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   matriculaController.criaNovo(req, res);
// });

























