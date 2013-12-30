var configurator = (function()
{
    function configuracaoInicial(application, exp, dir)
    {
        application.use(exp.favicon());
        application.use(exp.logger());
        application.use(exp.static(dir + '/public'));
    }

    return {me: configuracaoInicial}

}())

exports.me = configurator.me;