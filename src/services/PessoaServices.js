const Services = require('./Services.js');

class PessoaServices extends Services {
  constructor() {
    super('Pessoa');
  }

  //metodo para pegar matriculas de um estudante (pessoa)
  async pegaMatriculasAtivasPorEstudante (estudanteId) {
    //Posso pegar o metodo da superclasse usando super. Ja usa o metodo da superclasse com o nome do model Pessoa
    const estudante = await super.pegaUmRegistroPorId(estudanteId);

    //Estudante é um objeto do modelo Pessoa. Lá no model Pessoa.js, em associate, coloquei o seguinte:
    // Pessoa.hasMany(models.Matricula, {
    //   foreignKey: 'estudante_id',
    //   scope: { status: 'matriculado' },
    //   as: 'aulasMatriculadas' //apelido
    // });
    //Nessa associacao, entre Pessoa e Matricula, coloquei scope matriculado e apelido aulasMatriculas. Se eu tenho um objeto 
    //instancia de Pessoa, nesse caso estudante, tenho acesso  ao metodo aulasMatriculas que criei, que vai na foreignKey na tabela 
    //matricula que ele tem relacao, procura todas as matriculas com o id do estudante e status matriculado
    //Se eu remover o scope, vai trazer todas as matriculas do estudante, nao só as "matriculado"
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }
  //É um jeito difernte de buscar. Poderia usar o modelo Matriculas e buscar where estudante_id = estudanteId
  //Mas nesse caso, peguei o objeto pessoa na const estudante, e esse objeto automaticamente tem acesso ao metodo
  //getAulasMatriculas que criei em associate no modelo Pessoa e vai buscar todas as matriculas com status matriculado desse estudante
  //que executei o metodo


  async pegaTodasAsMatriculasPorEstudante (estudanteId) {
    const estudante = await super.pegaUmRegistroPorId(estudanteId);
    const listaMatriculas = await estudante.getTodasAsMatriculas(); //scope de associacao = mixins
    return listaMatriculas;
  }


 
  
}




module.exports = PessoaServices;
















































// const Services = require('./Services.js');

// class PessoaServices extends Services {
//   constructor() {
//     super('Pessoa');
//   }
// }

// module.exports = PessoaServices;