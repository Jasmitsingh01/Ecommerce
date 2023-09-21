const reviews =require('../Models/Reviews_relation')
const User = require('../Models/User_relation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const{v4:uuidv4}=require('uuid')
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
        const InsertQuery = 'INSERT INTO Users (id,Name,UserName,email,password) Values(?,?,?,?,?);'
        User.query(InsertQuery, DATA, (err, result) => {
            if (err) {

                resp.send({
                    token: null,
                    action: "fail",
                    opteration: "false",
                    message: "Please try Aagin"
                })
            }
            else {
                const token = jwt.sign({
                    id,
                    Name,
                    email,
                    UserName,
                    Password,
                }, process.env.JwT_Seceret)
                resp.send({
                    token: token,
                    action: "success",
                    opteration: "Singup",
                    message: "Sing Up SuccessFully",
                    Data:{
                        id,
                        Name,
                        email,
                        UserName}
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

const LogIn = (req, resp) => {
if(req.body){
const email=req.body.email;
const Password=req.body.Password;
const findQuery=`Select * from Users where email="${email}"`
User.query(findQuery,async(err,result)=>{
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
                message: "Login SuccessFully",
                Data:result[0]
                
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
module.exports = {
    Singup, LogIn
}