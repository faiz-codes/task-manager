'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Board);
    }
  }
  Task.init({
    title: DataTypes.STRING,
    notes: DataTypes.TEXT,
    duedate: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
    completedBy: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};