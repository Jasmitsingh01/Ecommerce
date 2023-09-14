const User=require('../Models/User_relation');
const jwt = require('jsonwebtoken')

const SaveDeatils=(req,resp)=>{
if(req.body){
    if(req.body.token){
 const VeryToken=jwt.verify(req.body.token,process.env.JwT_Seceret);
 if(VeryToken.id){
    const id= VeryToken.id;
    const Phone=req.body.Phone;
    const Address=req.body.Address;
    const Query=`UPDATE Users SET Phone_Number = "${Phone}", Address = "${Address}" WHERE id="${id}"`;
    User.query(Query,(err,result)=>{
        if(err){
            resp.send({
                operation:"Failed",
                messaage:"Something went Worng"
            })
        }
        else{

            resp.send({
                operation:"Success",
                messaage:"Values are updated"
            })
        }
    })
}
else{
    resp.send({
        operation:"Failed",
        messaage:"Error In Token Verifycation"
    })
} 
}
else{
    resp.send({
        operation:"Failed",
        messaage:"Token Not Found"
    })
}
}
else{
    resp.send({
        operation:"Failed",
        messaage:"Datas Not Found"
    })
}
}

const GetDetalis=(req,resp)=>{
    if(req.params['id']){
        const Token=req.params['id'];
       const Verify= jwt.verify(Token,process.env.JwT_Seceret);
       if(Verify){
        let id=''
        Verify.result?  id=Verify.result[0].id : id=Verify.id;
       


    const query=`select * From users where id ="${id}"`;
    User.query(query,(err,result)=>{
        if(err){
            
            resp.send({
                operation:"Failed",
                data:null,
                messaage:"something went Wrong"
            })
        }
        else{
            if(result.length>0){
             if(result[0].Phone_Number && result[0].Address){
                resp.send({
                    operation:"Sucess",
                    data:{
                       data:result
                    },
                    messaage:"User Deatils"
                })
             }
             else{
                resp.send({
                    operation:"Failed",
                    data:null,
                    messaage:"User Phone And Address Not Found"
                })
             }
        }
    
        else{
            resp.send({
                operation:"Failed",
                data:null,
                messaage:"No Data Found"
            })
        }
    }
    })
    
}
else{
    resp.send({
        operation:"Failed",
        data:null,
        messaage:"Token error"
    })
}
}
else{
    resp.send({
        operation:"Failed",
        data:null,
        messaage:"Unable To Get Token"
    })
}
}




module.exports={SaveDeatils,GetDetalis};