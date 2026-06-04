'use strict';
const { Model } = require('sequelize');
const bcrypt    = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    } 
    async comparePassword(inputPassword) {
      return bcrypt.compare(inputPassword, this.password) ;
    }
  }
  user.init({
    nama: { type: DataTypes.STRING(100), allowNull: false, validate: { notEmpty: { msg: 'nama tidak boleh kosong' } } },
    email: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: { msg: 'format email tidak valid' } } },
    password: { type:  DataTypes.STRING(255), allowNull: false, validate: { len: { args: [6,255], msg: 'Password minimal 6 karakter' } } },
    role : { type: DataTypes.ENUM('admin','user'), allowNull: false, defaultValue: 'user'},
  }, {
    sequelize, modelName: 'user',
    hooks: {
      //otomatis hash password sebelum data baru disimpan 
      beforeCreate: async (user) => {
        if (user.password) {
          const salt    = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      // hash ulang hanya jika field password berubah
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt    = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });
  return user;
};