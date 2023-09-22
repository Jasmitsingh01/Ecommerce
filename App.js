const Express=require('express');
const Product_User_Routes=require('./Routes/Product_UserSide_Routes');
const Product_Admin_Routes=require('./Routes/Product_AdminSide_Routes')
const App=Express();
const path=require('path');
const bodyParser = require("body-parser");
App.use(Express.json());

App.use(bodyParser.urlencoded({ extended: true }));
App.use(bodyParser.json());
App.use(bodyParser());
App.use('/admin/',Product_Admin_Routes);

App.use('/user',Product_User_Routes);

module.exports=App;
