const {Op} = require('sequelize');
const paginar = require('../utils/paginar.js');

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

  //uso variaveis com underline pq o objeto where vai ser usado na busca find.All. Entao precisar ter o nome do campo da tabela
  async pegaCursos(req, res) {
    const { data_inicial, data_final } = req.query;
    const where = {};

    //modelo do objeto where
    // const where = {
    //   data_inicio: {
    //     [Op.gte]: data,
    //     [Op.lte]: data
    //   }
    // };

    //se existirem os params, criar uma prop {}
    data_inicial || data_final ? where.data_inicio = {} : null;
    //se existir data inicial adiciona a propriedade Op.gte com o valor
    data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
    //se existir data final idem
    data_final ? where.data_inicio[Op.lte] = data_final : null;

    //paginar
    const paginacao = paginar(req);
     
    try {
      const listaCursos = await cursoServices.pegaTodosOsRegistros(paginacao.pagina, paginacao.limite, where);
      console.log(where);
      return res.status(200).json(listaCursos);
    } catch (erro) {
      return res.status(500).json({erro: erro.message});
    }
  }
}

module.exports = CursoController;