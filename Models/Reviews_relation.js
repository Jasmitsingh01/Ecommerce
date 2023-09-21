const Reviews=require('../Database/DataBaseConnection')

const reviews='create table if not exists Reviews(id varchar(255) Primary key , message varchar(300) , Rating int unsigned ,Product_id varchar(255) not null ,user_id varchar(255) not null , FOREIGN KEY (Product_id) REFERENCES Products(id),FOREIGN KEY (user_id) REFERENCES users(id));'

Reviews.query(reviews,(err,result)=>{
    if(err){
    console.log("Reviews Table Not Created",err);
    }
    else{
        console.log("Reviews Table Created");
    }
})

module.exports=Reviews;