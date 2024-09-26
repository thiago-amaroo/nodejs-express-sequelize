const express = require('express');
const CursoController = require('../controllers/CursoController.js');

const router = express.Router();

const cursoController = new CursoController();

//pegaCursos usa rota especifica do controlador cursos pq pode ter filtragem de datas nela. Por isso nao usa o pegaTodos do controler generico
router.get('/cursos', (req, res) => cursoController.pegaCursos(req, res));
router.get('/cursos/:id', (req, res) => cursoController.pegaUmPorId(req,res));

router.get('/cursos/:cursoId/estudantes', (req, res) => cursoController.pegaEstudantesDoCurso(req, res));

router.post('/cursos', (req, res) => cursoController.criaNovo(req, res));
router.put('/cursos/:id', (req, res) => cursoController.atualiza(req, res));
router.delete('/cursos/:id', (req, res) => cursoController.excluir(req,res));

module.exports = router;