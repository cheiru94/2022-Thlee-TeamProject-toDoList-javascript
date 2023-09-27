// 예시문으로 posts를 작성하였다.
const express = require('express');
const posts = express.Router();

const postsCtrl = require('./posts.ctrl');


// query문을 입력하라는 것이 아니라. 해당 경로에 그냥 raw로 들어오는 값 자체를 id:에 넣는 것.
/*
http://<ip or domain>/api/posts/<id의 번호>
*/
posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
posts.get('/:id', postsCtrl.read);
posts.delete('/:id', postsCtrl.remove);
posts.patch('/:id', postsCtrl.update);

module.exports = posts;