const Order=require('../Models/Order_Relation');
const jwt = require('jsonwebtoken')
const AllOrders=(req,resp)=>{
   const Token= req.params['id'];
   if(!Token){
      resp.send({
         Operation:"Failed",
         data:null,
         message:"Verification Token Not Found"
      })
   }
   else{
      const TokenVerify=jwt.verify(Token,process.env.JwT_Seceret);
      if(TokenVerify.result){
         const Id = TokenVerify.result[0].id;
         const query=`Select * From Orders Where Shop_id="${Id}"`;
         Order.query(query,(err,result)=>{
            if(err){
               resp.send({
                  Operation:"Failed",
                  data:null,
                  message:"Something Went Wrong"
               })
            }
            else{
               if(result.length>0){
                  resp.send({
                     Operation:"Success",
                     data:result,
                     message:"Orders Found "
                  })
               }
               else{
               resp.send({
                  Operation:"Failed",
                  data:null,
                  message:"Something Went Wrong"
               })
            }
         }
         })
      }
   }

}
module.exports={AllOrders}