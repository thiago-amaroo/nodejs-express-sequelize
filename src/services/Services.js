//datasource = Objeto que contem models nas propriedades = index do model criado pelo sequelize
const datasource = require('../database/models');

class Services {
  constructor (nomeDoModel) {
    this.nomeDoModel = nomeDoModel;
  }
  //Se receber nao receber where, busca tudo, se receber um where com filtros usa. Ex: pegaCursos para filtrar cursos por data de inicio
  async pegaTodosOsRegistros(pular, limite, where = {}) {
    return datasource[this.nomeDoModel].findAll( { offset: pular, limit: limite, where: { ...where } } );
  }

  //metodo esta usando os escopos (filtros nas buscas) criados nos arquivos de modelos. E paginacao
  async pegaRegistrosPorEscopo (escopo, pular, limite) {
    return datasource[this.nomeDoModel].scope(escopo).findAll({ offset: pular, limit: limite });
  }

  async pegaRegistrosPorEscopoEId (escopo, id) {
    return datasource[this.nomeDoModel].scope(escopo).findByPk(id);
  }

  async pegaUmRegistroPorId(id) {
    return datasource[this.nomeDoModel].findByPk(id);
  }

  async pegaUmRegistro(where) {
    return datasource[this.nomeDoModel].findOne( { where: { ...where }} );
  }

  async pegaEContaRegistros(options) {
    return datasource[this.nomeDoModel].findAndCountAll( {...options} );
  }
  

  async criaRegistro(dadosDoRegistro) {
    return datasource[this.nomeDoModel].create(dadosDoRegistro);
  }

  //Sequelize retorna um array de um unico elemento com a quantidade de registros que foram atualizados
  async atualizaRegistro(dadosAtualizados, where, transacao = {}) {
    const listaDeRegistrosAtualizados = await datasource[this.nomeDoModel]
      .update( dadosAtualizados, { 
        where: { ...where } ,
        transaction: transacao 
      });

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