"use strict";

(function(morgan)
{
    function configuracaoInicial(application, exp, dir)
    {
        application.use(exp.static(dir + '/dist'));
        application.use(morgan('dev'));
    }

    exports.me = configuracaoInicial;

}(require('morgan')))