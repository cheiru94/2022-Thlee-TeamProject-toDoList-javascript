const db = require('../lib');
const { DataTypes } = require('sequelize');

const Task = db.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  body: {
    type: DataTypes.STRING,
    allowNull: true
  },
  complete: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});
(async () => {
  await Task.sync(/*{ alter: true, force: false }*/);
})();
console.log("[TABLE] Task model was just (re)created!");

module.exports = Task;