const instance = require('../Middleware/RazorpayIntergation');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const order = require('../Models/Order_Relation');
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const Checkout = async (req, resp) => {

   const options = {
      amount: Number(req.body.Price * 100), 
      currency: "INR",
      receipt: "order_rcptid_11"
   };
   const Order = await instance.orders.create(options);

   resp.send({
      Checkout: Order,
      amount: Order.amount,
      key: process.env.key_id,
      operation: "True"
   })
}

const Verification = (req, resp) => {
   const { razorpay_order_id, razorpay_payment_id, razorpay_signature, Product, token, Address, Shop_Id } = req.body;

   const Verify = validatePaymentVerification({ order_id: razorpay_order_id, payment_id: razorpay_payment_id }, razorpay_signature, process.env.key_secret);

   if (Verify) {
      if (Product.length > 0 && token && Address && Shop_Id.length > 0) {
         const VerifyToken = jwt.verify(token, process.env.JwT_Seceret);
         if (VerifyToken) {
            const User_id = VerifyToken.result[0].id;
            Product.map((Product) => {

               Shop_Id.map((Shop) => {
                  const id = uuidv4(10);
                  const DataQ = [id, Address, Product.id, Shop.User_id, User_id]
                  const Query = `INSERT INTO orders (id,Delveriy_Address,Product_id,Shop_id,Buyer_id) values (?,?,?,?,?)`
                  order.query(Query, DataQ, (err, resul) => {
                     if (err) {
                        resp.send({
                           operation: 'Failed',
                           message: "Something went wrong"
                        })
                     }
                     else {
                        resp.send({
                           operation: "Success",
                           message: "Order Palced SuccessFuly"
                        })
                     }
                  })
               })
            })
         }
         else {
            resp.send({
               operation: "Failed",
               message: "Cannot Invaild Token"
            })
         }
      }
      else {

         resp.send({
            operation: "Failed",
            message: "Cannot get Data"
         })
      }
   }
   else {
      resp.send({
         operation: "failed",
         payload: false,
         message: "Payment failed"
      })
   }


}
module.exports = { Checkout, Verification }