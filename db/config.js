const mysql=require('mysql');

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'tmp_db'
});
con.connect((err)=>{
    if(err)
    {
        console.warn(err,"Error in connection");
    }   
    else
    {
        console.warn("connected sucessfully");
    }
})

module.exports={con};