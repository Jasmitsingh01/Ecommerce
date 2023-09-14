const ProductModel=require('../Database/DataBaseConnection');

const CreateTable=process.env.Product_Schema;

ProductModel.query(CreateTable,(err,result)=>{
    if(err){
        console.log("Product Table Not Created Please Refresh",err);
    }
    else{
        console.log('Product Table Created');
    }
});

module.exports=ProductModel;