var fs      = require('fs');

var routes = (function()
{
    function paginaPrincipal(req, res)
    {
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('views/index.html', function(err, obj)
        {
            if (err) res.send(500);

            res.send(obj);
        })
    }

    function redireciona(req, res)
    {
        res.redirect('/');
    }

    return {
                indexPage: paginaPrincipal,
                redirectPage: redireciona
           };
}())

exports.indexPage = routes.indexPage;
exports.redirectPage = routes.redirectPage;