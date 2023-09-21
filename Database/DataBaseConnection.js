const Mysql=require('mysql2');
require('dotenv').config();

const Connection=Mysql.createConnection({
    host     :process.env.HOST ,
    user     :process.env.USER,
    port     :process.env.PORT_DB,
    password :process.env.Password_Db ,
    database : process.env.DATABASE,
})

Connection.connect(function(err){
    if(err){
        console.log('Something Went Worng',err);
    }
    else{
        console.log("DATABASE Connected")
       
    }
});
module.exports=Connection;