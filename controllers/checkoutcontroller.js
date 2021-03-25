var Jimp = require("jimp");
var fs = require("fs");
var path = require("path");
var QrCode = require("qrcode-reader");
var QRCode = require("qrcode");

exports.enterAddressInfo = function(req, res) {
    let fileName = req.file.filename;
    console.log("fileName: " + fileName);

    console.log(req.body);

    // Read the image and create a buffer
    // (Here req.file.filename is our QR code)
    var buffer = fs.readFileSync(
      path.join(__dirname, "/../uploads/", fileName)
    );

    // Parse the image
    Jimp.read(buffer, function (err, image) {
      if (err) {
        console.error(err);
      }
      let qrcode = new QrCode();
      qrcode.callback = function (err, value) {
        if (err) {
          console.error(err);
        }

        // get the result string
        let qrCodeResult = value.result;
        let hesCode = req.body.hescode;

        // // buffer the result string to a file
        // QRCode.toBuffer(qrCodeResult, function (error, buffer) {
        //   if (error) console.error(error);
        //   console.log("qr code generated buffer with length: " + buffer.length);
        // });

        QRCode.toFile(
          path.join(__dirname, "/../qrcodeimages/", hesCode + fileName + '.png'),
          qrCodeResult,
          (fileError) => {
            console.error(fileError);
          }
        );
      };
      qrcode.decode(image.bitmap);
    });

    res.redirect("/checkout/purchase");
}