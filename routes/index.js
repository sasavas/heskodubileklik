var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hakkimizda', function(req, res) {
  res.render('hakkimizda')
})

router.get('/checkout/purchase', function(req, res) {
  res.render('checkout/purchase')
})

router.get('/checkout/address', function(req, res) {
  res.render('checkout/address')
})

router.get('/pages/gizlilikveguvenlik', function(req, res) {
  res.render('pages/gizlilikveguvenlik')
})

router.get('/pages/mesafelisatissozlesmesi', function(req, res) {
  res.render('pages/mesafelisatissozlesmesi')
})

router.post('/checkout/enteraddress', function (req, res) {
  console.log('post method received by enter address post router')
  res.redirect('checkout/purchase')
})



module.exports = router;
