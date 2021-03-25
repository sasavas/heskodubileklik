var express = require("express");
var router = express.Router();
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

var checkoutController = require('../controllers/checkoutcontroller')

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/hakkimizda", function (req, res) {
  res.render("hakkimizda");
});

router.get("/checkout/purchase", function (req, res) {
  res.render("checkout/purchase");
});

router.get("/checkout/address", function (req, res) {
  res.render("checkout/address");
});

router.post(
  "/checkout/enteraddress",
  upload.single("hesqrcode"),
  checkoutController.enterAddressInfo
);

router.get("/pages/gizlilikveguvenlik", function (req, res) {
  res.render("pages/gizlilikveguvenlik");
});

router.get("/pages/mesafelisatissozlesmesi", function (req, res) {
  res.render("pages/mesafelisatissozlesmesi");
});

module.exports = router;
