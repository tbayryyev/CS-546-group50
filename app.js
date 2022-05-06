const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');


Handlebars.registerHelper('toString', function(inputString) {
  var transformedString = inputString.toString();
  return new Handlebars.SafeString(transformedString)
});

Handlebars.registerHelper('ifDateCompare', function (dt1, operator, tm1, options) {
  var date1 = new Date(dt1+" "+tm1);
  var date2 = new Date();

  switch (operator) {

      case '>=':
        return (date1.getTime() >= date2.getTime()) ? options.fn(this) : options.inverse(this);
      case '<':
        return (date1.getTime() < date2.getTime()) ? options.fn(this) : options.inverse(this);
      default:
        return options.inverse(this);
  }
});

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
      asJSON: (obj, spacing) => {
        if (typeof spacing === 'number')
          return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

        return new Handlebars.SafeString(JSON.stringify(obj));
      }
    },
    partialsDir: ['views/partials/']
  });

  const rewriteUnsupportedBrowserMethods = (req, res, next) => {

    if (req.body && req.body._method ) {

      console.log("req.method : "+req.method);
      req.method = req.body._method;
      console.log("req.method : "+req.method);
      delete req.body._method;
    }
      // let the next middleware run:
    next();
  };
  

  app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
  }))

app.use(flash());

app.use((req, res, next)=>{
  app.locals.success = req.flash('success')
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}));
app.use(async (req, res, next) => {

  //console.log("req.username in app.js: "+req.session.username);
  
  //console.log("req.session.user : "+CircularJSON.stringify(req))
    console.log("["+new Date().toUTCString()+"]: "+req.method+" "+req.originalUrl);
next();
});

app.use('/appointments/*', (req, res, next) => {

  if (!req.session.username) {
    res.status(403).render('pages/error',{errorMessage:'User not logged in ! Go to home to login'});
    return;
  } else {
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
