const AdminUser = require('../Database/DataBaseConnection');

const CreateadminTable = 'create table if not exists AdminUsers (id varchar(255) Primary key ,Name varchar(200) Not Null,UserName varchar(200) Not Null ,email varchar(200) Not null unique,password varchar(255) Not null);'

AdminUser.query(CreateadminTable, (err, result) => {
    if (err) {
        console.log(" Admin not Created ");
    }
    else {
        console.log("Admin Table created")
    }
})

module.exports = AdminUser;