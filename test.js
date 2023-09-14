const  { v4: uuidv4 }=require('uuid'); 
const jwt = require('jsonwebtoken')
const Decode=jwt.sign("Name:Jasmit","Sumit");
const Data= jwt.verify("eyJhbGciOiJIUzI1NiJ9.TmFtZTpKYXNtaXQ.uWFumhdBM3YfhdgemVTtwvNrdQAsH768rXUJtKFc0So","Sumit");
console.log(Data);