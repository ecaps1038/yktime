var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var webpack = require('webpack');

// 引入history模块
//var history = require('connect-history-api-fallback')

// 正式环境时，下面两个模块不需要引入
//import webpackDevMiddleware from 'webpack-dev-middleware'
//import webpackHotMiddleware from 'webpack-hot-middleware'

//import config from '../../build/webpack.dev.conf'
//添加凭证文件
var credentials = require('./config/credentials');


const app = express()

//跨域测试块
app.all('*', function(req, res, next) {
  //允许访问ip *为所有
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
        //这段仅仅为了方便返回json而已
    res.header("Content-Type", "application/json;charset=utf-8");
    if(req.method == 'OPTIONS') {
        //让options请求快速返回
        res.sendStatus(200); 
    } else { 
        next(); 
    }
});

// 引入history模式让浏览器进行前端路由页面跳转
//app.use(history())

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(express.static(__dirname + '/data'));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// const compiler = webpack(config)
// //webpack 中间件
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath,
//   stats: { colors: true }
// }))

// app.use(webpackHotMiddleware(compiler))

app.use(express.static(path.join(__dirname, 'views')))
app.get('/', function (req, res) {
  res.sendFile('./views/index.html');
})

//处理附件内容字节数太大
//var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

//添加cookie中间件和session
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
  name: 'yike',
  secret: 'abdef',
  resave: true,
  //cookie: {maxAge:60*1000,httpOnly:true}
}));

//引入后台路由
require('./router/index.js')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  console.log(err)
  res.send(err.message)
})



// 设置监听端口
const SERVER_PORT = 4040
app.listen(SERVER_PORT, () => {
  console.info(`服务已经启动了了了，监听端口${SERVER_PORT}`)
})

//export default app
