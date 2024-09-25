'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
    static associate(models) {
      //Uma matricula pertence a um estudante
      Matricula.belongsTo(models.Pessoa, {
        foreignKey: 'estudante_id'
      });

      //Uma matricula pertence a um curso
      Matricula.belongsTo(models.Curso, {
        foreignKey: 'curso_id'
      });
    }
  }
  Matricula.init({
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Matricula',
    tableName: 'matriculas',
    paranoid: true
  });
  return Matricula;
};