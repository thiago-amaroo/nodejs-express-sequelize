//funcao que converte string id para number id
const converteId = require('../utils/conversorStringHelper.js');
//funcao que controla paginacao
const paginar = require('../utils/paginar.js');

class Controller {
  constructor (entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      //paginar
      const paginacao = paginar(req);
      const listaRegistros = await this.entidadeService.pegaTodosOsRegistros(paginacao.pular, paginacao.limite);
      res.status(200).json(listaRegistros);

    } catch (erro) {
      return res.status(500).json({ erro: erro.message });
    }
  }

  async pegaUmPorId (req, res) {
    const { id } = req.params;
    try {
      const listaPorId = await this.entidadeService.pegaUmRegistroPorId(Number(id));
      res.status(200).json(listaPorId);
      
    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }

  async pegaUm (req, res) {
    //params vai ser um objeto contendo todos os parametros que estiverem em req
    const { ...params } = req.params;
    const where = converteId(params);
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(where);
      return res.status(200).json(umRegistro);
      
    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }

  async criaNovo (req, res) {
    const dadosParaCriacao = req.body;
    try {
      const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
      res.status(200).json(novoRegistroCriado);


    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }

  async atualiza (req, res ) {
    //todas as propriedades de params vai para dentro de um objeto where
    const { ...params } = req.params;

    //convertendo ids com string para number
    const where = converteId(params);

    //OBS: Nao preciso atualizar todos os campos. Sequeliza deixa atualizar campos de acordo com o que passar no body
    const dadosAtualizados = req.body;

    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(where));

      //Service retorna true se conseguiu atualizar e false se nao conseguiu atualizar
      if ( !foiAtualizado ) {
        return res.status(400).json({mensagem: 'Registro não foi atualizado.'});
      } else {
        return res.status(200).json({mensagem: 'Registro foi atualizado.'});
      }
    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }


  async excluir (req, res) {
    const { id } = req.params;
    try {
      await this.entidadeService.excluiRegistro(Number(id));
      res.status(200).json({mensagem: `ID ${id} excluído com sucesso`});
    } catch (erro) {
      return res.status(500).json({mensagem: erro.message});
    }
  }
}

module.exports = Controller;













































