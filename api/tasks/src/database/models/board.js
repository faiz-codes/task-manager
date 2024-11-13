'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    static associate(models) {
      Board.hasMany(models.Task);
    }
  }
  Board.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    color: DataTypes.STRING,
    users: DataTypes.ARRAY(DataTypes.TEXT),
    private: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};