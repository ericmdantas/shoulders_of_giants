var express         = require('express'),
    configurator    = require('./config/configurator'),
    db              = require('./config/dbase'),
    routes          = require('./routes/routes'),
    os              = require('os'),
    port            = process.env.PORT || 7777,
    app             = express();

configurator.me(app, express, __dirname);
db.init();
routes.init(app);
app.listen(port);

console.log('up and running @: %s on port: %s', os.hostname(), port);