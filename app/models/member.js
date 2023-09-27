const bcrypt = require('bcrypt');

const db = require('../lib');
const { DataTypes } = require('sequelize');


const Member = db.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  thoughtCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, { hooks: {
  beforeCreate: async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(user.password, salt);
    user.password = hashed;
  }
}});

(async () => {
  await Member.sync(/*{alter: true, force: false }*/);
})();
console.log("[TABLE] Member model was just (re)created!");

module.exports = Member;