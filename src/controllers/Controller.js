class Controller {
  constructor (entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaTodos (req, res) {
    try {
      const listaRegistros = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaRegistros);
    } catch (erro) {
      //erro
    }
  }
}

module.exports = Controller;