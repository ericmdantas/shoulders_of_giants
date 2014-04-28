var configurator = (function()
{
    function configuracaoInicial(application, exp, dir)
    {
        application.use(exp.static(dir + '/public'));
        application.use(exp.logger());
    }

    return {me: configuracaoInicial}

}())

exports.me = configurator.me;