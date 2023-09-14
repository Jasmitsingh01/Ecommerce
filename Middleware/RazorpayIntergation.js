 const Razorpay=require('razorpay'); 
var instance = new Razorpay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret,
  });


module.exports=instance;