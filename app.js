var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose  = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var { Admin } = require('./models');
var app = express();

mongoose.connect('mongodb://localhost/shopping').then(res => {
   
    console.log("连接成功")
}).catch(err => {
    console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login',(req,res)=>{
  res.render('login');
});


app.post('/login',async(req,res)=>{
  // Admin.find().then(data=>{
  //   res.json(data);
  // });
  try {
  
    let user =await Admin.findOne({username:req.body.username});
    if(user){
      if(user.password==req.body.psw){
        res.cookie('userId',Date.now());
        res.json({
          code:1,
          message:'登录成功'
        });
      }else{
        res.json({
          code:0,
          message:'密码错误'
        });
      }
    }else{
      res.json({
        code:0,
        message:'用户不存在'
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.all("/*",(req,res,next)=>{
  if (req.cookies.userId) {
    next();
  } else {
    // res.send('请登录');
    res.redirect('/login');
  }
})




app.use('/users', usersRouter);
app.use("/",require('./routes/mian'));
app.use('/category',require("./routes/category/dategory"))
app.use('/product',require("./routes/product/product"))
app.use('/show',require("./routes/show/show"))
app.use('/common/upload',require('./routes/common/upload'));
app.use('/',require('./routes/common'));

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
