const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let { member } = req.session;
  res.render('../views/home', {
    member,
  });
});

module.exports = router;