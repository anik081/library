if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

var indexContorller = require('./controllers/index.js');
var authorController = require('./controllers/authors');

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit :'10mb' , extended : false}));

var mongoose = require('mongoose');
//mongoose.connect(process.env.DATABASE_URL, {userNewUrlParser : true });
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,useUnifiedTopology:true });

var db = mongoose.connection;
db.once('open',function (){
  console.log('connected to mongoose');
}).on('error', function(error){
  console.log('error is :', error);
});

app.use('/',indexContorller);
app.use('/authors',authorController);


app.listen(process.env.PORT || 3000);
