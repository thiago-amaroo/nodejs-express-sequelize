//Dentro de models (criado pelo sequelize) tem um index que esta sendo chamado automaticamente aqui em datasource
//Datasource é um objeto que tem cada propriedade sendo um model. Ex: datasource[this.model] = datasource.Pessoas = model Pessoas
const datasource = require('../models');

//nao vai ser metodos statics.. preciso instanciar com constructor
class Services  {
  constructor(nomeDoModel) {
    this.model = nomeDoModel;
  }

  async pegaTodosOsRegistros () {
    return datasource[this.model].findAll();
  }
}

module.exports = Services;