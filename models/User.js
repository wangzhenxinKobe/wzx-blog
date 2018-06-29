var mongoose = require('mongoose');
var userSchema = require('../schemas/users')
mongoose.connect('mongodb://localhost:27017/wzx-blog',function (err) {
    if(!err){
        console.log("数据库连接成功");
    }else {
        console.log("数据库连接失败");
    }
});
module.exports = mongoose.model('User', userSchema)