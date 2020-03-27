var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/AuthMiddleware')
/* GET users listing. */
router.get('/',isAuth.isAuth, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
