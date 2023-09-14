const relation=require('../Models/AdminUSer_Realtion');
const{v4:uuidv4}=require('uuid')
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const Singup = async (req, resp) => {
    if (req.body) {
        const salt = await bcrypt.genSalt(10)
        const HasHPass = await bcrypt.hash(req.body.Password, salt)
        const id=uuidv4(10);
        const Name = req.body.name;
        const UserName = req.body.User;
        const email = req.body.email;
        const Password = HasHPass
        const DATA = [id,Name, UserName, email, Password];
        
        const InsertQuery = 'INSERT INTO adminusers (id,Name,UserName,email,password) Values(?,?,?,?,?);'
        relation.query(InsertQuery, DATA, (err, result) => {
            if (err) {

                resp.send({
                    token: null,
                    action: "fail",
                    opteration: "false",
                    message:"already User Exists Please Login "
                })
            }
            else {
                const token = jwt.sign({
                    id,
                    Name,
                    email,
                    UserName,
                    Password
                }, process.env.JwT_Seceret)
                resp.send({
                    token: token,
                    action: "success",
                    opteration: "Singup",
                    message: "Sing Up SuccessFully"
                })
            }

        })
    }
    else {
        resp.send({
            token: null,
            action: "fail",
            opteration: "false",
            message: "Cannot Get The Data"
        })
    }
}

const login = (req, resp) => {
if(req.body){
const email=req.body.email;
const Password=req.body.Password;
const findQuery=`Select * from Adminusers where email="${email}"`
relation.query(findQuery,async(err,result)=>{
    if(err){
        resp.send({
        token:null,
        action: "fail",
        opteration: "false",
        message: "Something went wrong"
        })
    }
    else{
        if(result===null){
            resp.send({
                
        token:null,
        action: "failed",
        opteration: "false",
        message: "Cannot find Any User Please Sing In First !!!"
            })
        }
    else{
      const Check= await bcrypt.compare(Password,result[0].password)
       if(Check){
         const token=jwt.sign({result},process.env.JwT_Seceret);
            resp.send({
                token:token,
                action: "success",
                opteration: "True",
                message: "Login SuccessFully"
                
            })
        }
        else{
            resp.send({
                token:null,
                action: "failed",
                opteration: "false",
                message: "Password Incorrect "
            })
        }
    }
    }
})
}
else{
    resp.send({
        token:null,
        action: "failed",
        opteration: "false",
        message: "Cannot Get The data"
    })
}
}
module.exports={Singup,login};