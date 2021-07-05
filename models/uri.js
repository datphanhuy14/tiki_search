'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class uri extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    uri.init({
        full_link: DataTypes.STRING,
        qr_code: DataTypes.TEXT,
        short_link: DataTypes.STRING,
        custom_link: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'uri',
    });
    return uri;
};