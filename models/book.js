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
    ma_sach: DataTypes.BIGINT,
    ten_sach: DataTypes.TEXT,
    gia_bia: DataTypes.BIGINT,
    phan_loai: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'book',
  });
  return book;
};