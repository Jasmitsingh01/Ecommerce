const Express = require('express');
const ProductUserRouter = Express.Router();
const { MainProduct, Catogaries, TotalNoPages, HomeProdut } = require('../Controller/Product')
const { Singup, LogIn } = require('../Controller/User');
const { SaveDeatils, GetDetalis } = require('../Controller/UserDeatils');
const { Checkout, Verification } = require('../Controller/PaymentController');
ProductUserRouter.get('/HomeProdut', HomeProdut);
ProductUserRouter.post('/singup', Singup);
ProductUserRouter.post('/Login', LogIn);
ProductUserRouter.get("/MainProduct/:id", MainProduct)
ProductUserRouter.get('/Catogaries/:id', Catogaries);
ProductUserRouter.get('/totalPages', TotalNoPages);
ProductUserRouter.post("/SaveData", SaveDeatils);
ProductUserRouter.get("/GetDetalis/:id", GetDetalis);
ProductUserRouter.post('/Checkout', Checkout);
ProductUserRouter.post("/paymentVeriFication", Verification)

module.exports = ProductUserRouter;
