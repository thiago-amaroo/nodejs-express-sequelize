const CursoServices = require('../services/CursoServices');
const Controller = require('./Controller');

const cursoServices = new CursoServices();

class CursoController extends Controller {
  constructor() {
    super(cursoServices);
  }

  //Listando todas as matriclas de um curso
  async pegaEstudantesDoCurso (req, res) {
    try {
      const { cursoId } = req.params;

      const listaMatriculas = await cursoServices.pegaEstudantesMatriculadosDoCurso(Number(cursoId));
      return res.status(200).json(listaMatriculas);

    } catch(erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }
}

module.exports = CursoController;