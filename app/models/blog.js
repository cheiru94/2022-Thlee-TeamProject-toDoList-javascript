const { DataTypes } = require('sequelize');

// Define Connection 'db'
const db = require('../lib');

// Define Schema 'Blog'
const Blog = db.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
  }
});

// sync method는 정의된 모델로 테이블을 새로 만들거나 업데이트를 할 때 쓰인다.
/** alter: true로 되어 있다면, 테이블이 데이터베이스에 존재한다면, 그 테이블은 변경될 것이다.
  *      : false면, 테이블이 미리 존재하면 에러를 반환할 것이다. 
  * force: true로 되어 있다면, 테이블이 미리 존재하고 있다면, 새로운 테이블을 생성하기 전에 삭제될 것이다.
  *      : false면, 테이블이 미리 존재하고 alter가 false면 에러를 반환할 것이다.
  * */
(async () => {
  await Blog.sync(/*{ alter: true, force: false }*/);
})();
console.log("The table for the Blog model was just (re)created!");

module.exports = Blog;