const express = require('express');
const app= express();
const db = require('./mysql');
const cors = require('cors')

app.use(cors({
    origin:['http://localhost:8080'],  //指定接收的地址
    methods:['GET','POST'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))

//注册中间件
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//监听端口开启服务器
app.listen(8070, () => {
    console.log('服务器开启在8070端口......');
});

module.exports = app;





//菜单列表管理
app.get("/menulist", (req, res) => {
    let sql = `select * from menu`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            let parents = result.filter(element => element.menunameid == 0);
            let children = result.filter(element => element.menunameid !== 0);
            parents.forEach(parentsitem => {
                console.log(parentsitem);
                parentsitem.children = [];
                children.forEach((childrenitem) => {
                    if(childrenitem.menunameid == parentsitem.menuid) {
                        parentsitem.children.push(childrenitem)
                    }
                })
            })
            console.log(parents);
            res.send(parents);
        }
    })
})



//课程管理

app.get("/course/search", (req, res) => {
    //let sql = `select * from course where name like '%${req.query.name}%';`;
    let current = parseInt(req.query.current);
    let size = parseInt(req.query.size);
    let records = `select * from course where name like '%${req.query.name}%' limit ?, ?`;
    db.query(records,  [(current-1)*size, size], (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
})

app.post("/course/add", (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Headers', 'Content-type');
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");

    let sql = `insert into course(name, type) values('${req.body.name}','${req.body.type}')`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
    console.log(req.body);
    console.log('增加');
})

app.post("/course/updata", (req, res) => {

    let sql = `update course set name='${req.body.name}', type='${req.body.type}' where id=${req.body.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.get("/course/remove", (req, res) => {
    let sql = `delete from course where id = ${req.query.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.get("/course/count", (req, res) => {
    let sql = `select count(*) as total from course`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            let total = JSON.parse(JSON.stringify(result));
            res.send(total);
        }
    })
})



//学生信息管理
app.get("/studentsinformation/search", (req, res) => {
    let current = parseInt(req.query.current);
    let size = parseInt(req.query.size);
    let records = `select * from studentinformation where studentid like '%${req.query.studentid}%' and name like '%${req.query.name}%' limit ?, ?`;
    db.query(records, [(current-1)*size, size], (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    });
})

app.post("/studentsinformation/add", (req, res) => {
    let sql = `insert into studentinformation(studentid, name, IDcard, sex, educationalBackground, major, politicCountenance, familyaddress) values('${req.body.studentid}','${req.body.name}','${req.body.IDcard}','${req.body.sex}','${req.body.educationalBackground}','${req.body.major}','${req.body.politicCountenance}','${req.body.familyaddress}')`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.post("/studentsinformation/updata", (req, res) => {

    let sql = `update studentinformation set studentid='${req.body.studentid}', name='${req.body.name}', IDcard='${req.body.IDcard}', sex='${req.body.sex}', educationalBackground='${req.body.educationalBackground}', major='${req.body.major}', politicCountenance='${req.body.politicCountenance}', familyaddress='${req.body.familyaddress}' where id=${req.body.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.get("/studentsinformation/remove", (req, res) => {

    let sql = `delete from studentinformation where id = ${req.query.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            res.send(result);
        }
    })
})

app.get("/studentsinformation/count", (req, res) => {
    let sql = `select count(*) as total from studentinformation`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
        }else {
            let total = JSON.parse(JSON.stringify(result));
            res.send(total);
        }
    })
})









