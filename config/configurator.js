var configurator = (function(morgan)
{
    function configuracaoInicial(application, exp, dir)
    {
        application.use(exp.static(dir + '/public'));
        application.use(morgan('dev'));
    }

    return {me: configuracaoInicial}

}(require('morgan')))

exports.me = configurator.me;