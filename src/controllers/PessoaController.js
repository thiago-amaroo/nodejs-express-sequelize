const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor () {
    super(pessoaServices);
  }

  //metodo proprio de Pessoa para exibir todas as matriculas de uma pessoa
  async pegaMatriculasAtivas (req, res) {
    const { estudanteId } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante( Number(estudanteId));
      res.status(200).json(listaMatriculas);
    } catch(erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }

  async pegaTodasAsMatriculas (req, res) {
    const { estudanteId } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante( Number(estudanteId));
      res.status(200).json(listaMatriculas);
    } catch(erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }



  async pegaTodasAsPessoas (req, res) {
    try {
      const listaTodasAsPessoas = await pessoaServices.pegaPessoasEscopoTodos();
      return res.status(200).json(listaTodasAsPessoas);

    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }
}

module.exports = PessoaController;











