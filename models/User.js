var mongoose = require('mongoose');
var userSchema = require('../schemas/users')
mongoose.connect('mongodb://localhost:27017/wzx-blog',function (err) {
    if(!err){
        console.log("数据库连接成功");
    }else {
        console.log("数据库连接失败");
    }
});



//用户的表结构
// var userSchema = new mongoose.Schema({
//
//     //用户名
//     username: String,
//     //密码
//     password: String,
//     //是否是管理员
//     // isAdmin: {
//     //     type: Boolean,
//     //     default: false
//     // }
//
// });

// var Model = {
//     User: mongoose.model('User', userSchema)
// };

module.exports = mongoose.model('User', userSchema)