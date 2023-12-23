const f=require("./config");
const express=require('express');
const cors=require('cors')
const app=express();
app.use(cors());
app.use(express.json());
app.post("/signup",(req,resp)=>{
    // const name=req.body.name;
    // const email=req.body.email;
    // const password=req.body.password;

    // const sql=`insert into med_tmp_db(name,email,password) values("${name}","${email}","${password}")`;
    const data=req.body;
    f.con.query("insert into med_tmp_db set ?",data,(err,result)=>{
        if(err) throw err;
        resp.send(result);
    })
})
app.listen(3000);