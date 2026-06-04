'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    judul: { type: DataTypes.STRING(255), allowNull: false,
             validate: { notEmpty: { msg: 'Judul tidak boleh kosong'}}
    },
    deskripsi : { type: DataTypes.TEXT },
    teknologi : { type: DataTypes.STRING(255) },
    url_github: { type: DataTypes.STRING (500) },
    url_demo  : { type: DataTypes.STRING (500) },
    gambar    : { type: DataTypes.STRING (500) },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};