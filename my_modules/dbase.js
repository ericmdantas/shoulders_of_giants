var mongoose = require('mongoose');

var dbase = (function()
{
    var Quote,
        url_banco = 'mongodb://ericmendesdantas:umdoistres123@ds059938.mongolab.com:59938/quotes4you';//'mongodb://localhost/quotes';

    function inicializaBanco()
    {
        mongoose.connect(url_banco);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'deu ruim: '));
        inicializaEstrutura();
    }

    function inicializaEstrutura()
    {
        var authorSchema = mongoose.Schema({quote: String, author: String});
        Quote = mongoose.model('author', authorSchema);
    }

    function pegaFrases(req, res)
    {
        Quote.find({}, function(err, doc)
                        {
                            if (err)
                                res.send(500);

                            res.json({quotes: doc});
                        })
    }

    function adicionaQuotes(req, res)
    {
        Quote({quote: req.params.quote, author: req.params.author_name}).save(function(err, obj){});
        res.end();
    }

    function deletaTudo()
    {
        Quote.remove({},function(err, obj){});
    }

    return {
                initDB: inicializaBanco,
                getQuotes: pegaFrases,
                postQuotes: adicionaQuotes,
                deleteItAll: deletaTudo
           }
}())

exports.initDB = dbase.initDB;
exports.getQuotes = dbase.getQuotes;
exports.postQuotes = dbase.postQuotes;
exports.deleteItAll = dbase.deleteItAll;