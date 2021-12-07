const mysql = require('mysql');

//创建数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    timezone: '09:00',      //解决日期格式问题
    database: 'students system',
});
db.connect( (err) => {
    if(err) {
        throw err;
    }else {
        console.log('数据库连接成功......');
    }
});

module.exports = db;