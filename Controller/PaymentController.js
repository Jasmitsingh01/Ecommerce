const instance = require("../Middleware/RazorpayIntergation");
const {
  validatePaymentVerification,
} = require("razorpay/dist/utils/razorpay-utils");
const order = require("../Models/Order_Relation");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const Checkout = async (req, resp) => {
  const options = {
    amount: Number(req.body.Price * 100),
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const Order = await instance.orders.create(options);

  resp.send({
    Checkout: Order,
    amount: Order.amount,
    key: process.env.key_id,
    operation: "True",
  });
};

const Verification = (req, resp) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    Product,
    token,
    Address,
  } = req.body;

  const Verify = validatePaymentVerification(
    { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
    razorpay_signature,
    process.env.key_secret
  );
  if (Verify) {
    if (token !== "") {
      const verifytoken = jwt.verify(token, process.env.JwT_Seceret);
      if (verifytoken.result !== undefined) {
        if (Product.length > 0) {
          Product.map((vlaue, index) => {
            const Query = `Insert into Orders (id,Delveriy_Address,Shop_id,Product_id,Buyer_id,Product_name,Buyer_Name,Quntatity_of_Products,ProductPrice) values (?,?,?,?,?,?,?,?,?)`;
            const id=uuidv4(10);
            const Data=[id,Address,vlaue.User_id,vlaue.id,verifytoken.result[0].id,vlaue.Name,verifytoken.result[0].Name,vlaue.Qunatity,vlaue.Price] ;
            order.query(Query,Data,(err,result)=>{
               if(err){
                  resp.send({
                     operation:"Failed",
                     message:"Interal Server error"
                   })
               }
               else{
                resp.send({
                  operation:"Success",
                  message:"Order Placed SuccessFully"
                })
               }
            })           
         });
        }
        else{
         resp.send({
            operation:"Failed",
            message:"Cannot get The Order Data"
          })
        }
      }
      else{
         resp.send({
            operation:"failed",
            message:"Something went Wrong"
          })
      }
    }
    else{
      resp.send({
         operation:"failed",
         message:"Please Login First"
       })
    }
  }
   else {
   resp.send({
      operation:"failed",
      message:"Please Try Again"
    })
  }
};
module.exports = { Checkout, Verification };
