const Product_Relation = require('../Models/Product_Relation');
const fs = require('fs')
const jwt = require('jsonwebtoken');

const { v4: uuid4 } = require('uuid');

const AllProduct = (req, resp) => {
    if (!req.params['id']) {
        resp.send({
            error: "Something went worng"
        })
    }
    else {
        const Token = req.params['id'];
        const verifytoken = jwt.verify(Token, process.env.JwT_Seceret);
        
        if(verifytoken.result===undefined){
            const id = verifytoken.id;
            const Query = `select * from Products where User_id="${id}"`;
        Product_Relation.query(Query, (err, result) => {
            if (err) {
                resp.send({
                    error: "Something went worng"
                }
                );
            }
            else {
                if (result.length > 0) {
                    resp.send({
                        Products: result
                    })
                }
                else {
                    resp.send({
                        error: "NO Products !!!"
                    })
                }
            }
        })
        }
        else{
            const id = verifytoken.result[0].id;
            const Query = `select * from Products where User_id="${id}"`;
            Product_Relation.query(Query, (err, result) => {
                if (err) {
                    resp.send({
                        error: "Something went worng"
                    }
                    );
                }
                else {
                    if (result.length > 0) {
                        resp.send({
                            Products: result
                        })
                    }
                    else {
                        resp.send({
                            error: "NO Products !!!"
                        })
                    }
                }
            })
        }
    }

}
const AddProduct = (req, resp) => {
    if (req.body && req.files) {
        if (req.body.token) {
            function Convert(A) {
                let file = fs.readFileSync("Public/" + A);

                return file;
            }
            const verifytoken = jwt.verify(req.body.token, process.env.JwT_Seceret);
            if(verifytoken.result===undefined){
                const User_id = verifytoken.id;
                const id = uuid4(10);
                let Product_Name = req.body.ProductName
                let Product_Price = req.body.ProductPrice
                let Product_Size = req.body.ProductSize
                let Product_Color = req.body.ProductColor
                let Product_Categaries = req.body.CATEGARIES
                let Product_Dis = req.body.Discription
                let Product_Qunatity = req.body.ProductQunatity
                let Img = Convert(req.files.ProductImg[0].filename);
                let Img2 = Convert(req.files.ProductImg[1].filename);
                let Img3 = Convert(req.files.ProductImg[2].filename);
                let Img4 = Convert(req.files.ProductImg[3].filename);
    
                const data = [id, Product_Name, Product_Price, Product_Qunatity, Product_Size, Product_Color, Product_Categaries, Product_Dis, Img, Img2, Img3, Img4, User_id]
                const Query = 'INSERT INTO Products (id,Product_Name,Product_Price,Product_Qunatity,Product_Size,Product_Color,Product_Catogaries,Product_Discription,Product_Main_Image,Product_1_Image,Product_2_Image,Product_3_Image,User_id) Values(?,?,?,?,?,?,?,?,?,?,?,?,?);'
                Product_Relation.query(Query, data, function (err, result) {
                    if (err) {
                        resp.send({
                            error: "Something went Worng Please Try again"
                        })
                    }
                    else {
                        resp.send({
                            Response: "Data Added Successfully "
                        })
                    }
            })
           
            }
            else{
                const User_id = verifytoken.result[0].id;
                const id = uuid4(10);
                let Product_Name = req.body.ProductName
                let Product_Price = req.body.ProductPrice
                let Product_Size = req.body.ProductSize
                let Product_Color = req.body.ProductColor
                let Product_Categaries = req.body.CATEGARIES
                let Product_Dis = req.body.Discription
                let Product_Qunatity = req.body.ProductQunatity
                let Img = Convert(req.files.ProductImg[0].filename);
                let Img2 = Convert(req.files.ProductImg[1].filename);
                let Img3 = Convert(req.files.ProductImg[2].filename);
                let Img4 = Convert(req.files.ProductImg[3].filename);
    
                const data = [id, Product_Name, Product_Price, Product_Qunatity, Product_Size, Product_Color, Product_Categaries, Product_Dis, Img, Img2, Img3, Img4, User_id]
                const Query = 'INSERT INTO Products (id,Product_Name,Product_Price,Product_Qunatity,Product_Size,Product_Color,Product_Catogaries,Product_Discription,Product_Main_Image,Product_1_Image,Product_2_Image,Product_3_Image,User_id) Values(?,?,?,?,?,?,?,?,?,?,?,?,?);'
                Product_Relation.query(Query, data, function (err, result) {
                    if (err) {
                     
                        resp.send({
                            error: "Something went Worng Please Try again"
                        })
                    }
                    else {
                        resp.send({
                            Response: "Data Added Successfully "
                        })
                    }
            })
            }
        }
        else {
            resp.send({
                error: "Something Went worng Please Try Again"

            })
        }

    }
    else {
        resp.send({
            error: "Something Went worng Please Try Again"
        })
    }
}

const MainProduct = (req, resp) => {
    if (req.params['id']) {
        const id = req.params['id'];
        const query = `Select * from Products where id="${id}"`;
        Product_Relation.query(query, (err, result) => {
            if (err) {
                resp.send({
                    operation: "Failed",
                    data: null,
                    message: "Something went wrong"
                })
            }
            else {
                if (result.length > 0) {
                    resp.send({
                        operation: "Success",
                        data: result,
                        message: "Product Found"
                    })
                }
                else {
                    resp.send({
                        operation: "Failed",
                        data: null,
                        message: "No Product Found"
                    })
                }
            }
        })
    }
    else {
        resp.send({
            operation: "failed",
            message: "Something went worng"
        })
    }
}
const HomeProdut = (req, resp) => {
    const Query = 'select * from Products Limit 10 offset 0 ;'
    Product_Relation.query(Query, (err, result) => {
        if (err) {
            console.log('Error')
        }
        else {
            if (result.length === 0) {
                resp.send({
                    operation: 'Failed',
                    Data: null,
                    Message: "No Products"
                })

            }
            else {
                resp.send({
                    operation: 'Success',
                    Data: result,
                    Message: "Products"
                })
            }
        }
    })


}
const Catogaries = (req, resp) => {
    if (req.params['id'] === 'store') {
        const Page = req.query.page;
        const offset = (Page - 1) * req.query.limit;
        const limit = req.query.limit;
        const Query = `select * from Products limit ${limit} offset ${offset}`;
        Product_Relation.query(Query, (err, result) => {
            if (err) {
                resp.send({
                    operation: "Fails",
                    message: "Something went wrong"
                })
            }
            else {
                if (result.length > 0) {
                    resp.send({
                        operation: "success",
                        data: result,
                        message: "All Products"
                    })
                }
                else {
                    resp.send({
                        operation: "fail",
                        data: null,
                        message: "All Products"
                    })
                }
            }
        })
    }
    else if (req.params['id'] === 'men') {
        const Cat = req.params['id'];
        const Page = req.query.page;
        const offset = (Page - 1) * req.query.limit;
        const limit = req.query.limit;
        const Query = `select * from Products where Product_Catogaries="${Cat}" limit ${limit} offset ${offset};`
        Product_Relation.query(Query, (err, result) => {
            if (err) {
                resp.send({
                    operation: "Fails",
                    message: "Something went wrong"
                })
            }
            else {
                if (result.length > 0) {
                    resp.send({
                        operation: "success",
                        data: result,
                        message: "mens Products"
                    })
                }
                else {
                    resp.send({
                        operation: "fail",
                        data: null,
                        message: "mens Products"
                    })
                }
            }
        })
    }
    else if (req.params['id'] === 'women') {
        const Cat = req.params['id'];
        const Page = req.query.page;
        const offset = (Page - 1) * req.query.limit;
        const limit = req.query.limit;
        const Query = `select * from Products where Product_Catogaries="${Cat}" limit ${limit} offset ${offset};`
        Product_Relation.query(Query, (err, result) => {
            if (err) {
                resp.send({
                    operation: "Fails",
                    message: "Something went wrong"
                })
            }
            else {
                if (result.length > 0) {
                    resp.send({
                        operation: "success",
                        data: result,
                        message: "Womens Products"
                    })
                }
                else {
                    resp.send({
                        operation: "fail",
                        data: null,
                        message: "Womens Products"
                    })
                }
            }
        })
    }
    else {
        resp.send({
            error: "Something went worng"
        })
    }

}
const TotalNoPages = (req, resp) => {
    const Query = 'select count(id) as count from Products ;'
    Product_Relation.query(Query, (err, result) => {
        if (err) {
            resp.send({
                data: "Something went wrong"
            })
        }
        else {
            resp.send({
                operation: 'true',
                data: Math.ceil(result[0].count /4)
            })
        }
    })
}


const UpdateProduct=(req,resp)=>{
    const{ProductId,UserId,Qunatity,Catogaries,Size,Color,Discription,Price,Name}=req.body;
    if(ProductId && UserId){
      const VeryUserId=  jwt.verify(UserId,process.env.JwT_Seceret);
      if(VeryUserId.result===undefined){
    
        const Uid=VeryUserId.id
        const Query=`UPDATE Products SET Product_Name  = '${Name}',Product_Discription='${Discription}',Product_Catogaries='${Catogaries}',Product_Color='${Color}',Product_Size='${Size}',Product_Qunatity='${Qunatity}',Product_Price= '${Price}' WHERE id = '${ProductId}' and User_id ='${Uid}';`
       Product_Relation.query(Query,(err,result)=>{
        if(err){
        resp.send({
            
            operation:"Failed",
            message:"Internal Server Error"
        })
        }
        else{
        resp.send({
            operation:"Success",
            message:"Data Update SuccessFully"
        }) 
        }
       })
      }
      else{
       const Uid=VeryUserId.result[0].id
        const Query=`UPDATE Products SET Product_Name  = '${Name}',Product_Discription='${Discription}',Product_Catogaries='${Catogaries}',Product_Color='${Color}',Product_Size='${Size}',Product_Qunatity='${Qunatity}',Product_Price= '${Price}' WHERE id = '${ProductId}' and User_id ='${Uid}';`
       Product_Relation.query(Query,(err,result)=>{
        if(err){
        resp.send({
            
            operation:"Failed",
            message:"Internal Server Error"
        })
        }
        else{
        resp.send({
            operation:"Success",
            message:"Data Update SuccessFully"
        }) 
        }
       })
    }
    }
    else{
        resp.send({
            operation:"Failed",
            message:"Cannot able To get Data"
        })
    }

}
const DeleteProduct=(req,resp)=>{
    const {Uid,Pid}=req.body;
    if (Uid && Pid) {
        const Query=`DELETE FROM Products WHERE id = '${Pid}' and User_id='${Uid}';`
        Product_Relation.query(Query,(err,result)=>{
            if(err){
                resp.send({
                    operation:"Failed",
                    message:"Please Try After Some Time"
                 })
            }
            else{
             resp.send({
                operation:"Success",
                message:"Product SuccessFully Deleted"
             })
            }
        })
    }
    else{
        resp.send({
            operation:"Failed",
            message:"Unable To Get Data"
         })
    }
}
module.exports = { AllProduct, AddProduct, MainProduct, Catogaries, TotalNoPages, HomeProdut ,UpdateProduct,DeleteProduct}
