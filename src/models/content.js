'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Content extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Content.init({

    heading1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heading2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heading3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paragraph_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attachment_file:{
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Content',
  });
  return Content;
};