var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/purchase', function(req, res) {
  res.render('purchase')
})

router.get('/pages/gizlilikveguvenlik', function(req, res) {
  res.render('pages/gizlilikveguvenlik')
})

router.get('/pages/mesafelisatissozlesmesi', function(req, res) {
  res.render('pages/mesafelisatissozlesmesi')
})

router.get('/hakkimizda', function(req, res) {
  res.render('hakkimizda')
})


module.exports = router;
