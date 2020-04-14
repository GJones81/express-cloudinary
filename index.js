require('dotenv').config()
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
let multer = require('multer')
let upload = multer({dest: './uploads' })
let cloudinary = require('cloudinary')

app.set('view engine', 'ejs');
app.use(ejsLayouts);
cloudinary.config(process.env.CLOUDINARY_URL)
let imgURL = cloudinary.url('mr12jyyrvb9xmdsmjban', {width: 150, height: 150})

app.get('/', function(req, res) {
  res.render('index', {image: imgURL})
});

app.post('/', upload.single('myFile'), (req, res) =>{
	cloudinary.uploader.upload(req.file.path, (result) =>{
		res.redirect('/')
	})
})

app.listen(3000);
