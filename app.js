const express = require('express');
const multer = require("multer");
const cors = require('cors');

// Init app
const app = express();

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: "./client/public",
  filename: (req, file, cb) => {
    cb(null, `${ Date.now() }-${ file.originalname }`);
  }
});

// Init Upload up to MB file
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: (req, file, cb) => {
    // reject a file
    if (file.mimetype === "image/jpeg" || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }
}).single('selectedFile');

// Public Folder
app.use(express.static('./client/public'));
app.use(cors({
  origin: 'http://localhost:3000/upload',
  credentials: true
}));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    if(err){
      return res.status(400).json(err);
    } else {
      if(req.file === undefined){
        return res.status(400).json({error: 'specify image'});
      } else {
        return res.json({
          msg: 'File Uploaded!',
          file: `${req.file.filename}`
        });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));