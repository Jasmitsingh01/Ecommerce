const Db=require('../Database/DataBaseConnection');
const createuserTable='create table if not exists Users (id varchar(255)   Primary key ,Name varchar(200) Not Null,UserName varchar(200) Not Null ,email varchar(200) Not null unique,Phone_Number varchar(13) ,Address varchar(255),password varchar(255) Not null);'
Db.query(createuserTable,(err,result)=>{
    if(err ){
        console.log("User Table Cannot Created",err)
    }
    else{
        console.log("user Table Created")
    }
})
module.exports=Db;