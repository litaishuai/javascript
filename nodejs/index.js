const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const bodyParser = require('body-parser');
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
})
app.post('/file_upload', upload.array('avatar', 12), function (req, res, next) {
  console.log(req.body);
  const postInfo = {
    'stuName': req.body.name,
    'stuID': req.body.ID
  }
  const oriName = req.files[0].originalname.split('.');
  const filePath = __dirname + `/public/${postInfo.stuName}_${postInfo.stuID}.${oriName[oriName.length - 1]}`;
  fs.readFile(req.files[0].path, function (err, data) {
    if (err) {
      console.log(err);
    }
    fs.writeFile(filePath, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        const response = {
          message: 'File uploaded successfully',
          fileName: req.files[0].originalname,
          stuName: postInfo.stuName,
          stuID: postInfo.stuID 
        };
        const htmlStr = `<p>student name: ${response.stuName}</p><br><p>student ID: ${response.stuID}</p><br><img src="${filePath}" alt=""/>`;
        fs.writeFile(`${__dirname}/public/${response.stuID}_${response.stuName}.html`, htmlStr, function(err) {
          if (err) {
            console.log(err)
          }
        });
        res.end(JSON.stringify(response));
      }
    })
  });
});
app.get('/images', (req, res, next) => {
  res.sendFile(__dirname + '/images.html');
});
app.get('/imagesResult', (req, res, next) => {
  const info = {
    name: req.query.name,
    ID: req.query.ID
  };
  res.sendFile(`${__dirname}/public/${info.ID}_${info.name}.html`);
});
const server = app.listen('8000', function () {
  const port = server.address().port;
  console.log(`The server is listenning at http://localhost:${port}`);
});