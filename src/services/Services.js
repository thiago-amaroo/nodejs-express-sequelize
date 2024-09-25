//datasource = Objeto que contem models nas propriedades = index do model criado pelo sequelize
const datasource = require('../database/models');

class Services {
  constructor (nomeDoModel) {
    this.nomeDoModel = nomeDoModel;
  }
  async pegaTodosOsRegistros(pagina, limite) {
    //paginar
    const pular = (pagina - 1) * limite;

    return datasource[this.nomeDoModel].findAll( { offset: pular, limit: limite } );
  }

  //metodo esta usando os escopos (filtros nas buscas) criados nos arquivos de modelos
  async pegaRegistrosPorEscopo (escopo) {
    return datasource[this.nomeDoModel].scope(escopo).findAll();
  }

  async pegaRegistrosPorEscopoEId (escopo, id) {
    return datasource[this.nomeDoModel].scope(escopo).findByPk(id);
  }

  async pegaUmRegistroPorId(id) {
    return datasource[this.nomeDoModel].findByOne(where);
  }

  async pegaUmRegistro(where) {
    return datasource[this.nomeDoModel].findByPk(id);
  }

  async criaRegistro(dadosDoRegistro) {
    return datasource[this.nomeDoModel].create(dadosDoRegistro);
  }

  //Sequelize retorna um array de um unico elemento com a quantidade de registros que foram atualizados
  async atualizaRegistro(dadosAtualizados, id) {
    const listaDeRegistrosAtualizados = await datasource[this.nomeDoModel].update( dadosAtualizados, { where: { id: id } } );

    if ( listaDeRegistrosAtualizados[0] === 0 ) {
      return false;
    } else {
      return true;  
    }
  }

  async excluiRegistro(id) {
    return datasource[this.nomeDoModel].destroy( { where: {id: id} } );
  }
}

module.exports = Services;








































// //Dentro de models (criado pelo sequelize) tem um index que esta sendo chamado automaticamente aqui em datasource
// //Datasource é um objeto que tem cada propriedade sendo um model. Ex: datasource[this.model] = datasource.Pessoas = model Pessoas
// const datasource = require('../models');

// //nao vai ser metodos statics.. preciso instanciar com constructor
// class Services  {
//   constructor(nomeDoModel) {
//     this.model = nomeDoModel;
//   }

//   async pegaTodosOsRegistros () {
//     return datasource[this.model].findAll();
//   }
// }

// module.exports = Services;