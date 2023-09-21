const ProductModel=require('../Database/DataBaseConnection');

const CreateTable='create table if not exists Products(id  varchar(255)  primary KEY ,Product_Name varchar(50) not null,Product_Price int unsigned not null,Product_Qunatity int unsigned ,Product_Size varchar(100),Product_Color varchar(50),Product_Catogaries varchar(100),Product_Discription varchar(300),Product_Main_Image LONGBLOB,Product_1_Image LONGBLOB,Product_2_Image LONGBLOB,Product_3_Image LONGBLOB, User_id varchar(255) not null, FOREIGN KEY (User_id) REFERENCES AdminUsers(id));';

ProductModel.query(CreateTable,(err,result)=>{
    if(err){
        console.log("Product Table Not Created ");
    }
    else{
        console.log('Product Table Created');
    }
});

module.exports=ProductModel;