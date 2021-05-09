var ID_CONTATO_INC = 3;

var contatos = [
    { _id: 1, nome: 'gustavo', email: 'gustavo@ifsp.edu.br' }, 
    { _id: 2, nome: 'teste', email: 'teste@ifsp.edu.br' }
]

module.exports = function() {
    var controller = {};
    controller.listaContatos = function(req, res) {
        res.json(contatos)
    };
    controller.obtemContato = function(req, res) {
		console.log('Selecionou o contato: ' + req.params.id);
		var idContato = req.params.id;
		var contato = contatos.filter(function(contato){
			return contato._id == idContato;
		})[0];
		contato ? res.json(contato) : res.status(404).send('Contato não encontrado!');
	};
    controller.removeContato = function(req, res) {
        var _id = req.params.id;
        Contato.deleteOne({ "_id": _id}).exec().then(
            function() {
                res.end();
            },
            function(erro) {
                return console.error(erro);
            });

        };
    controller.salvaContato = function(req, res) {
        var contato = req.body;
        contato = contato._id ? atualiza(contato) : adiciona(contato);
        res.json(contato);
    };

    function adiciona(contatoNovo) {
        contatoNovo._id = ++ID_CONTATO_INC;;
        contatos.push(contatoNovo);
        return contatoNovo;
    }

    function atualiza(contatoAlterar) {
        contatos = contatos.map(function(contato) {
            if (contato._id == contatoAlterar._id) {
                contato = contatoAlterar;
            }
            return contato;
        });

        return contatoAlterar;
    }

    return controller;
};