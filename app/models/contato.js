var mongoose = require('mongoose');
module.exports = function() {
    var schema = mongoose.Schema({
        nome: {type: String, required: true},
        email: {type: String, required: true, index: { unique: null} }
    });
    return mongoose.model('Contato', schema);
};