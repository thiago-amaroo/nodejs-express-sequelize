const Controller = require('./Controller.js');
const MatriculaServices = require('../services/MatriculaServices.js');
const Sequelize = require('sequelize');

const matriculaServices = new MatriculaServices();

class MatriculaController extends Controller {
  constructor() {
    super(matriculaServices);
  }

  //pega as matriculas de um estudante e conta
  async pegaMatriculasPorEstudante (req, res) {
    //params vai ser um objeto contendo todos os parametros que estiverem em req
    const { estudante_id } = req.params;
   
    try {
      const listaMatriculasPorEstudante =  await matriculaServices.pegaEContaRegistros( 
        { 
          where: {
      
            estudante_id:  Number(estudante_id),
            status: 'matriculado'
          },
          limit: 2,
          order: [['id', 'DESC']]
        });
        
      return res.status(200).json(listaMatriculasPorEstudante);
      
    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }

  //conta quantas matriculas tem em cada curso
  async pegaCursosLotados (req, res) {
    const lotacaoCursos = 2; //limite de matriculas por curso
    
    try {
      const CursosLotados =  await matriculaServices.pegaEContaRegistros(
        {
          where: {
            status: 'matriculado',
          },
          attributes: ['curso_id'], //pega so coluna curso_id
          group: ['curso_id'],
          having: Sequelize.literal(`count(curso_id) >= ${lotacaoCursos}`)
        }
      );
      return res.status(200).json(CursosLotados.count);
      
    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }
}

module.exports = MatriculaController;