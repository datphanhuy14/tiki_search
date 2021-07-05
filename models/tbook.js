'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  tbook.init({
    ten_sach: DataTypes.TEXT,
    sku: DataTypes.BIGINT,
    gia_bia: DataTypes.BIGINT,
    discount_rate: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbook',
  });
  return tbook;
};