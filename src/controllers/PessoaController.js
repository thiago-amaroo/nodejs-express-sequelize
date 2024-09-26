const Controller = require('./Controller.js');
const PessoaServices = require('../services/PessoaServices.js');
const paginar = require('../utils/paginar.js');

const pessoaServices = new PessoaServices();

class PessoaController extends Controller {
  constructor () {
    super(pessoaServices);
  }

  //metodo proprio de Pessoa para exibir todas as matriculas de uma pessoa
  async pegaMatriculasAtivas (req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaMatriculasAtivasPorEstudante( Number(estudante_id));
      res.status(200).json(listaMatriculas);
    } catch(erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }

  async pegaTodasAsMatriculas (req, res) {
    const { estudante_id } = req.params;
    try {
      const listaMatriculas = await pessoaServices.pegaTodasAsMatriculasPorEstudante( Number(estudante_id));
      res.status(200).json(listaMatriculas);
    } catch(erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }


  //essa funcao, quando chamada usa metodo pegaRegistroPorEscopo de services, passando o nome do escopo que foi definido
  //em model Pessoa.js. O escopo contem o filtro para aplicar na busca, ou seja, mostrar inclusive pessoas com ativo=false
  //pq por padrao, coloquei scopeDefault que sempre que buscar pessoas com model Pessoa só traz pessoas com ativo = true
  //Essa funcao possibilita pegar inclusive pessoas ativo = false e tambem passa valores para paginacao
  async pegaTodasAsPessoas (req, res) {
    const paginacao = paginar(req);

    try {
      const listaTodasAsPessoas = await pessoaServices.pegaRegistrosPorEscopo( 'todosOsRegistros', paginacao.pular,  paginacao.limite );
      return res.status(200).json(listaTodasAsPessoas);

    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }
}

module.exports = PessoaController;











