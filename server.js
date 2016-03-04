var express = require("express");
var cors = require("cors");
var fs = require('fs');
var multer = require('multer')

var app = express();

var image_path = "";

app.set('view engine', 'ejs');
app.use(multer({ dest: '/tmp/'}).array('image'));
app.use(cors());
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
	res.render("index",{
		path: image_path
	});
});

app.post('/image_upload', function(req,res){
	var file = req.files[0];
	console.log(file.path);
	fs.renameSync(file.path,'public/images/'+file.originalname);
	image_path = 'images/'+file.originalname;
	res.redirect('/');
});

app.listen(3000,function() {
	console.log("Server listening 3000");
});
