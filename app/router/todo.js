// FIXME: 
// 1.
//  request라는 package를 사용하여 api를 호출하는 코드를 짰지만,
// 2.
//  body로 나오긴하나 string이 정상적으로 json화가 되지 않는다.
// 3.
//  express내부로 구현하는 방법이 있을 듯하다.

/* 
const request = require('request');
const options = {
    'method': 'GET',
    'url': 'http://localhost:8080/api/tasks/'
};
let mybody;
request(options, (e, res) => {
    if (e) { 
        console.error(e);
    }
    mybody = JSON.stringify(res.body);
});
console.log(mybody);
*/

// TODO: 
// routes...... 
// reference link => https://velog.io/@tlatjdgh3778/Vanilla-JavaScript%EB%A1%9C-SPA%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0

const express = require('express');
const router = express.Router();


// TODO: 
// DB에 저장되어 있는 tasks를 가져와서 뿌리기
/**
 * req: tasks.params
 * res: task.element {
 *  *completed*
 *  *body*
 * }
 */
// const json = router.get('/', tasksCtrl.list);
// console.log(json.body);

// SOLVED: 자바스크립트 fetch 메소드로 간단히 해결가능했다. 
// 도메인이나 ip주소가 필요없이
// '/'루트로 가능했기 때문에 문제 해결


router.get('/', (req, res) => {
  res.render('../views/todo');
});

module.exports = router;