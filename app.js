const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');


Handlebars.registerHelper('ifDateCompare', function(dt1,tm1, options) {

  var date1 = new Date(dt1+" "+tm1);
  var date2 = new Date();

  if(date1.getTime() >= date2.getTime()){

    return options.fn(this);
  }
  return options.inverse(this);
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
  app.use(async (req, res, next) => { 

      //console.log("["+new Date().toUTCString()+"]: "+req.method+" "+req.originalUrl);
next();
  });
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);
app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');



configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});