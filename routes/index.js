// ================================================
// Main login page router
// ================================================

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('login', { url: req.url });
});


module.exports = router;
