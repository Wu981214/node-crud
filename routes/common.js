const router = require('express').Router();

const multer = require('multer');


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __dirname + '/../public/upload');
    },
    filename: function(req, file, cb) {
      req.filename =
        '/upload/' + file.fieldname + '-' + Date.now() + '-' + file.originalname;
      cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    },
  });
  
  var upload = multer({ storage: storage });

  router.post('/file_upload', upload.single('file'), (req, res) => {
    res.json({
      code: 1,
      info: req.filename,
    });
  });

  module.exports = router;


