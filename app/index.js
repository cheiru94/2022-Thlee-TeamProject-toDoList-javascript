// bring Environment Variables
require('dotenv').config();


// Packages
const express = require('express');
const http = require('http');
const nunjucks = require('nunjucks');
const session = require('express-session');
const Memorystore = require('memorystore')(session);


// Instantiation app
const app = express();

// set app's view engine 
app.set('view engine', 'html');
nunjucks.configure('./views', {
  express: app,
});

// session setting
const maxAge = 1000 * 60 * 60 * 24;
const sessionObj = {
  secret: 'thisismyscretkeyasdfasdf777',
  resave: false,
  saveUninitialized: true,
  store: new Memorystore({ checkPeriod: maxAge }),
  cookie: { maxAge: maxAge },
};

app.use(session(sessionObj));

// using static files 나중에 webpack을 시도해 볼 예정
app.use(express.static('public'));

// body-parser <- POST request 때 body로 부터 파라미터를 쉽게 추출하기 위해서 사용하는 것.
// express 업데이트 이후 body-parser 패키지를 굳이 깔아주지 않아도 express에 빌트인 되었다.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const server = http.createServer(app);
const PORT = process.env.PORT || 8080;


// Listening
server.listen(PORT, () => {
  console.log(`Express server is listening to ${PORT}`);
});

// Routing 
const api = require('./api');
const routers = require('./router');

app.use('/api', api);
app.use('/', routers);