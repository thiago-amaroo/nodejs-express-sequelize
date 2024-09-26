const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  //pega as matriculas de um estudante e conta
  async pegaMatriculasPorEstudante (req, res) {
    //params vai ser um objeto contendo todos os parametros que estiverem em req
    const { estudante_id } = req.params;
    const where = {
      estudante_id:  Number(estudante_id),
      status: 'matriculado'
    };
    try {
      const listaMatriculasPorEstudante =  await matriculaServices.pegaEContaRegistros(where);
      return res.status(200).json(listaMatriculasPorEstudante);
      
    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }

  async pegaCursosLotados (req, res) {
    const lotacaoCursos = 2; //limite de matriculas por curso
    const where = {
      status: 'matriculado'
    };
    try {
      const CursosLotados =  await matriculaServices.pegaEContaRegistros(where);
      return res.status(200).json(CursosLotados);
      
    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }
}

module.exports = MatriculaController;