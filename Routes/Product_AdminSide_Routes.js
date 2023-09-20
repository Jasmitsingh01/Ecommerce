const Express = require("express");
const Admin = Express.Router();

const { login, Singup, GetUser } = require("../Controller/AdminUSer");

const {
  AddProduct,
  AllProduct,
  UpdateProduct,
  DeleteProduct,
} = require("../Controller/Product");

const { multiUpload } = require("../Middleware/ImageStore");

const { AllOrders, DispacthProduct } = require("../Controller/Order");
const { AllDetails } = require("../Controller/Other");

Admin.post("/AddProduct", multiUpload, AddProduct);

Admin.put("/AddProduct", UpdateProduct);

Admin.post("/DeleteProduct", DeleteProduct);
// Get Products
Admin.get("/GetProduct/:id", AllProduct);
//Admin SingUp
Admin.post("/singup", Singup);
//Admin Login
Admin.post("/login", login);
// Get All orders
Admin.get("/Order/:id", AllOrders);
Admin.post("/Dispacth", DispacthProduct);
Admin.post("/user", GetUser);

Admin.get("/AllValues", AllDetails);

module.exports = Admin;
