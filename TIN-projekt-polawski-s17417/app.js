var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
const patientRouter = require('./routes/patientRoute');
const labTestRouter = require('./routes/LabTestRoute');
const orderRouter = require('./routes/orderRoute');
const loggedUserRouter = require('./routes/loggedUserRoute');
const sequelizeInit = require('./config/sequelize/init');
const patientApiRouter = require('./routes/api/PatientApiRoute');
const labTestApiRouter = require('./routes/api/LabTestApiRoute');
const orderApiRouter = require('./routes/api/OrderApiRoute');
const authUtil=require('./util/authUtils');
var app = express();
const session = require('express-session');
const i18n = require('i18n');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
i18n.configure({
   locales: ['en', 'pl'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik 
   directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
   objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
   cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o 
   //języku aktualnie wybranym przez użytkownika
});
app.use(i18n.init);

app.use((req, res, next) => {
  if(!res.locals.lang) {
      const currentLang = req.cookies['acme-hr-lang'];
      res.locals.lang = currentLang;
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'my_secret_password',
  resave: false
}));
app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
 
  if(!res.locals.loginError) {
      res.locals.loginError = undefined;
  }
  next();
});



app.use('/', indexRouter);
app.use(authUtil.permitAuthenticatedUser);
app.use('/patients', patientRouter);
app.use('/orders', orderRouter);
app.use('/labTests', labTestRouter);
app.use('/api/patients', patientApiRouter);
app.use('/api/labTests', labTestApiRouter);
app.use('/api/orders', orderApiRouter);
app.use(authUtil.permitAuthenticatedAdmin);
app.use('/users/',loggedUserRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('index', {
    navLocation: '',
    loginError: err.message
  })
});

sequelizeInit()
  .catch(err => {
    console.log(err);
  });



module.exports = app;
