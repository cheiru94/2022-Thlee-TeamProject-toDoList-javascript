const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('../views/helloworld', {
    title: "kimchi",
    body: "oishii"
  });
});

module.exports = router;
