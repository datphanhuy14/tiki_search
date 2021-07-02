'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  book.init({
    ma_sach: DataTypes.STRING,
    ten_sach: DataTypes.TEXT,
    gia_bia: DataTypes.STRING,
    phan_loai: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};