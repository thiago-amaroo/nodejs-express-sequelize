class Controller {
  constructor (entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
    try {
      //paginar
      let { pagina = 1, limite = 5 } = req.query;

      const listaRegistros = await this.entidadeService.pegaTodosOsRegistros(pagina, limite);
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
    const { id } = req.params;
    //OBS: Nao preciso atualizar todos os campos. Sequeliza deixa atualizar campos de acordo com o que passar no body
    const dadosAtualizados = req.body;

    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id));

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













































