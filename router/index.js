// ================================================
// Main login page router
// ================================================

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { url: req.url });
});


module.exports = router;
