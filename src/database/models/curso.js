'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      Curso.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id'
      });

      //Um curso pertence a um docente (pessoa)
      Curso.belongsTo(models.Pessoa, {
        foreignKey: 'docente_id'
      });

      Curso.hasMany(models.Matricula, {
        foreignKey: 'curso_id',
        //pegando todas as matriculas do curso com status matriculado
        scope: { status: 'matriculado' }, //posso deixar sem scope, apenas com 'as'. aí vai buscar todas as matriculas do curso, sem nenhum filtro
        as: 'MatriculasDoCurso' //usar: getMatriculasDoCurso - MIXINS
      });

    }
  }
  Curso.init({
    titulo: DataTypes.STRING,
    descricao: DataTypes.STRING,
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos',
    paranoid: true
  });
  return Curso;
};