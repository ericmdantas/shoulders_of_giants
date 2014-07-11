var configurator = (function()
{
    function configuracaoInicial(application, exp, dir)
    {
        application.use(exp.static(dir + '/public'));
    }

    return {me: configuracaoInicial}

}())

exports.me = configurator.me;