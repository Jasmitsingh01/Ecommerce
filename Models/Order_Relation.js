const Order_Relation=require('../Database/DataBaseConnection');


const CreatedTableQuery=`create table  if not exists orders(id  varchar(255)Primary key,Delveriy_Address varchar(255) not null  ,Delvered varchar(50) not Null default 'false',Status varchar(100) not null default 'not Dispacthed yet',Product_id varchar(255) not null , Shop_id varchar(255) not null,Buyer_id Varchar(255) not Null,Product_name varchar(255),Buyer_Name varchar(255),Quntatity_of_Products Varchar(20),ProductPrice varchar(20),FOREIGN KEY (Product_id) REFERENCES Products(id),FOREIGN KEY (Shop_id) REFERENCES AdminUsers(id),FOREIGN KEY (Buyer_id) REFERENCES Users(id));`;


Order_Relation.query(CreatedTableQuery,(err,result)=>{
    if(err){
    console.log("Order Table not created");
    }
    else{
      console.log("Order Table Created");
    }
})
module.exports=Order_Relation;