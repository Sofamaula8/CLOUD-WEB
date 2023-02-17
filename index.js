const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set storage engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init upload
const upload = multer({
  storage: storage
}).single('file');

// Set static folder
app.use(express.static('./public'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.send('Error uploading file');
    } else {
      if (req.file == undefined) {
        res.send('No file selected');
      } else {
        res.send('File uploaded successfully');
      }
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
