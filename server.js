var express = require("express");
var expressLayouts = require('express-ejs-layouts');
var bodyParser =  require("body-parser");
var cookieParser = require('cookie-parser');


var app = express();
app.use(cookieParser());

app.use(bodyParser());



//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/index.js'));

app.use(express.static(__dirname + '/main'));

app.listen(3000, function(){
    console.log('Listing at 3000')
});