const Services = require('./Services');
const PessoaServices = require('./PessoaServices.js');

const estudante = new PessoaServices();

class CursoServices extends Services {
  constructor() {
    super('Curso');
  }

  async pegaEstudantesMatriculadosDoCurso (cursoId) {
    const cursoBuscado = await super.pegaUmRegistroPorId(cursoId);

    //Aqui uso o metodo criado pelo Sequelize getMatriculasDoCurso, de acordo com o scope que criei no modelo Curso
    //ele filtra apenas matriculas = "matriculado". nao traz resultados de matricula = "cancelado"
    const listaMatriculas = await cursoBuscado.getMatriculasDoCurso();
    
    //para usar o map para fazer uma consulta ao bd, precisei usar o await Promise.all antes, se nao ele retorna vazio
    //usando o scope do modelo Pessoa que nao tem restricao e nao usa a restricao ativo = true do scope default
    //Pq se deixasse usar o scope default, ao buscar um usuario que ativo = false ele retornaria registro null no array
    //Assim ele lista todos os estudantes de um curso, independente se ativo = true ou false
    const listaEstudantes = await Promise.all(listaMatriculas.map(async (elemento) => await estudante.pegaRegistrosPorEscopoEId('todosOsRegistros', elemento.estudante_id )));


    return listaEstudantes;
  }

}

module.exports = CursoServices;