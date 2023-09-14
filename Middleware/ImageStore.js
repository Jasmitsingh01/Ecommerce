const multer=require('multer');
let Storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"Public");
    },
    filename:(req,file,cb)=>{
    cb(null,file.originalname);
    }
})

const upload=multer({
    storage:Storage,
});


const multiUpload=upload.fields([{name:'ProductImg',maxCount:4}]);

module.exports={multiUpload}

