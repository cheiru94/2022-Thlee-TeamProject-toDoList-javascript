const express = require('express');
const router = express.Router();

const homeRouter = require('./home');
const todoRouter = require('./todo');
const loginRouter = require('./login');
const registerRouter = require('./register');
const helloRouter = require('./helloworld');
const { alertMove } = require('../util/alertMove');

const Auth = (req, res, next) => {
  const { member } = req.session;
  if (member != undefined) {
    next();
  } else {
    res.send(alertMove('Please sign-in first', '/login'));
  }
};

router.use('/', homeRouter);
router.use('/todo', Auth, todoRouter);
router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/helloworld', helloRouter);

module.exports = router;

// 이 방법을 쓰면 확실히 라우팅하는데 있어서 간편하게 사용할 수는 있다. 같은 레벨의 경로에서는
// 그러나 항상 같은 레벨의 경로에서만 쓰이는 것이 아니라서, 쓰지 않는다.
// 특히 이 프로젝트 처럼 라우팅하는 경로가 많지 않으면, 쓰지 않는 편이 좋을 것 같다.
// 특수한 경우 쓰는 것이 좋을 것 같다.

/*
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();

const routes = [];
const dir = path.join(__dirname);
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.js') && file !== 'index.js') {
    routes.push({ path: '/' + file.slice(0, -3), router: require(`./${file}`) });
  }
});


router.use('/', require('./home'));
routes.forEach(route => {
  router.use(route.path, route.router);
});

module.exports = router;
*/