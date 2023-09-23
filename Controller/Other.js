const Db=require('../Database/DataBaseConnection');

const AllDetails=(req,resp)=>{
    const Query="select count(id) as Count From Products  union all select count(id) as Count From orders  union all select Quntatity_of_Products * ProductPrice from orders";
    Db.query(Query,(err,result)=>{
        if(err){
        resp.send({
            operation:"Failed",
            message:"Internal Server Error"
        })
        }
        else{
            if(result[0]!==undefined && result[1]!==undefined && result[2]!==undefined){
                resp.send({
                    operation:"Success",
                    Total_Product:result[0].Count,
                    Total_Orders:result[1].Count,
                    Total_Profit:result[2].Count
                      
                })}   
            
            else if(result[0]!==undefined && result[1]!==undefined &&result[2]===undefined){
                resp.send({
                    operation:"Success",
                    Total_Product:result[0].Count,
                    Total_Orders:result[1].Count,
                    Total_Profit:0

                      
                })}
            
            else if(result[0]!==undefined && result[1]===undefined &&result[2]!==undefined){
                resp.send({
                    operation:"Success",
                    Total_Product:result[0].Count,
                    Total_Profit:result[2].Count,
                    Total_Orders:0,

                      
                })}
            
            else if(result[0]===undefined && result[1]!==undefined &&result[2]!==undefined){
                resp.send({
                    operation:"Success",
                    Total_Orders:result[1].Count,
                    Total_Profit:result[2].Count,
                    Total_Product:0,

                      
                })}
            
            else{
                resp.send({
                    operation:"failed",
                    Total_Product:0,
                    Total_Orders:0,
                    Total_Profit:0
                      
                })}
        }
         
    })
}

module.exports={AllDetails}