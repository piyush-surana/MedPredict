const f = require("./config");
const express = require('express');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());
app.post("/signup", (req, resp) => {
    const data = req.body;
    f.con.query("select * from med_tmp_db where email=?", [data.email], (err, result, fields) => {
        if (err) {
            console.warn(err);
            throw err;
        }
        if (result.length > 0) {
            resp.status(409).send({
                status: 409,
                message: "User already exists"
            })
        }
        else {
            let sql = "insert into med_tmp_db set ?";
            f.con.query(sql, data, (err, result) => {
                if (err) throw err;
                resp.send("User Added Successfully");
                console.log(result);
            })
        }

    })
})
app.post("/login", (req, resp) => {
    const data = req.body;
    // const email=req.body.email
    f.con.query("select * from med_tmp_db where email=?", [data.email], (err, result, fields) => {
        if (err) {
            console.warn(err);
            throw err;
        }
        if (result.length == 0) {
            console.log("User Not Found");
            return resp.status(401).send({
                status: 401,
                message: "user does not exist"
            });
        }
        if (result[0].password != req.body.password) {
            return resp.status(403).send({
                status: 403,
                message: "unauthorized access"
            })
        }
        resp.send(result);
    });

})
app.listen(3000);
