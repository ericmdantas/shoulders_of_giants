var express         = require('express'),
    configurator    = require('./my_modules/configurator'),
    dbase           = require('./my_modules/dbase'),
    routes          = require('./routes/routes'),
    os              = require('os'),
    app             = express();

app.listen(process.env.PORT || 7777);

configurator.me(app, express, __dirname);
dbase.initDB();

app.get('/', routes.indexPage);
app.post('/postQuotes/:author_name/:quote', dbase.postQuotes);
app.get('/getQuotes', dbase.getQuotes);
app.get('/*', routes.redirectPage);

console.log('up and running @: %s', os.hostname());