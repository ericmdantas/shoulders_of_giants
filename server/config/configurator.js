"use strict";

(function(morgan, bodyParser)
{
    function configuracaoInicial(application, exp, dir)
    {
        application.use(exp.static(dir + '/client/dist/'));
        application.use(bodyParser());
        application.use(morgan('dev'));
    }

    exports.me = configuracaoInicial;

}(require('morgan'),
  require('body-parser')))