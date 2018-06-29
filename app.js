var createError = require('http-errors');
var express = require('express');

// 加载模板模块处理
var swig = require('swig');

//加载body-parser,用来处理POST请求
var bodyParser = require('body-parser');
//加载cookie
var Cookies = require('cookies')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
var Model = require('./models/User');
// view engine setup
// 定义模板引擎
app.engine('html', swig.renderFile);
// 设置模板文件存放的目录
app.set('views', 'views');
//注册使用的模板引擎
app.set('view engine', 'html');

// 消除缓存
swig.setDefaults({cache: false});


app.use(logger('dev'));
app.use(express.json());
//bodyparser配置
app.use(bodyParser.urlencoded({ extended: true }));
//cookies设置
app.use(function(req, res, next) {
    req.cookies = new Cookies(req, res);
    //解析登录用户的cookie信息
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            Model.findById(req.userInfo._id).then(function(userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })

        }catch(e){
            next();
        }
    }else{
        next();
    }
});
app.use(cookieParser());
//静态文件的处理
app.use('/public',express.static(__dirname+'/public'));

// 根据不同的功能划分模块
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));
app.use('/', require('./routes/main'));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
