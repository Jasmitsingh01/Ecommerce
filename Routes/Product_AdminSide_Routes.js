const Express=require('express');
const Admin=Express.Router();

const{login, Singup}=require('../Controller/AdminUSer');

const {AddProduct,AllProduct,UpdateProduct}=require('../Controller/Product')

const {multiUpload}=require('../Middleware/ImageStore');


const { AllOrders } = require('../Controller/Order');


Admin.post('/AddProduct',multiUpload,AddProduct);

Admin.put('/AddProduct',multiUpload,UpdateProduct)
// Get Products
Admin.get('/GetProduct/:id',AllProduct)
//Admin SingUp
Admin.post("/singup",Singup)
//Admin Login
Admin.post("/login",login)
// Get All orders
Admin.get('/Order/:id',AllOrders)




module.exports=Admin;