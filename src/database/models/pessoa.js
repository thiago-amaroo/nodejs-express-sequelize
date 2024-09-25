const isCpfValido = require('../../utils/validaCpfHelper.js');

'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pessoa extends Model {
    static associate(models) {
      Pessoa.hasMany(models.Curso, {
        foreignKey: 'docente_id',
      });

      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        scope: { status: 'matriculado' },
        as: 'aulasMatriculadas' //apelido - criando mixins - metodo automatico objetoPessoa.getAulasMatriculas de acordo com scope
      });

      Pessoa.hasMany(models.Matricula, {
        foreignKey: 'estudante_id',
        as: 'todasAsMatriculas' 
      });
      
      
    }
  }
  Pessoa.init({
    nome: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 50],
          msg: 'O nome deve ter entre 3 e 50 caracteres'
        }
      }
    },
    //alterei formato para inserir validacao
    email: { 
      type: DataTypes.STRING,  
      validate: {
        isEmail: {
          args: true,
          msg: 'Formato do email invalido'
        }
      } 
    },
    cpf: {
      type: DataTypes.STRING,
      validate: {
        cpfEValido: (cpf) => {
          if(!isCpfValido(cpf)) throw new Error('Cpf invalido');
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
    //adiciono para evitar confundir com modelo Pessoa e nome da tabela do bd pessoas
    tableName: 'pessoas',
    paranoid: true,
    //toda query com model pessoa vai passar pelo filtro desse scope. Assim posso deixar uma funcao geral listando
    //todos os registros em services para todas as entidades. E esse scope filtra pessoas para mim
    defaultScope: {
      where: {
        ativo: true
      }
    },
    //Scope nao é padrao, entao preciso renomear. Esse scope pega todos os usuarios, incluindo ativo=false
    scopes: {
      todosOsRegistros: {
        where: {}
      }
    }
  });
  return Pessoa;
};