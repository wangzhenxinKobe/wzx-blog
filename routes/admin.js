var express = require('express');
var router = express.Router();
var Model = require('../models/User');
var Category = require('../models/Category');
router.use(function(req, res, next) {
    if (!req.userInfo.isAdmin) {
        //如果当前用户是非管理员
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
});

/**
 *
 * 首页
 */
router.get('/', function(req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});
/**
 *
 * 用户
 */
router.get('/user', function(req, res) {
    /*
    * 从数据库中读取所有的用户数据
    *
    * limit(Number) : 限制获取的数据条数
    *
    * skip(2) : 忽略数据的条数
    *
    * 每页显示2条
    * 1 : 1-2 skip:0 -> (当前页-1) * limit
    * 2 : 3-4 skip:2
    * */

    var page = Number(req.query.page || 1);
    var limit = 2;
    var pages = 0;
    Model.count().then(function(count){
        console.log(count)
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page-1)*limit;

        Model.find().limit(limit).skip(skip).then(function(users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,
                count: count,
                limit: limit,
                pages: pages,
                page: page
            });
        })
    })


});


/*
* 分类首页
* */
router.get('/category', function(req, res) {
    res.render('admin/category_index', {
        userInfo: req.userInfo
    })
});

/*
* 分类的添加
* */
router.get('/category/add', function(req, res) {
    res.render('admin/category_add', {
        userInfo: req.userInfo
    });
});

/*
* 分类的保存
* */
router.post('/category/add', function(req, res) {
    console.log(req.body)
});

module.exports =  router;