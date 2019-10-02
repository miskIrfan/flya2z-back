var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//  var Subscribe = mongoose.Subscribe;


 var schema = new Schema({
    email : {type:String}
});


module.exports = mongoose.model('Subscribe', schema );