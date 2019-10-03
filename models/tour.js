var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    tourName : {type:String, require:true},
    imageUrl: {type:String, require:true},
    price:{type:String, require:true},
    continent:{type:String, require:true},
    creation_dt:{type:Date, require:true}
});

schema.statics.getTours = function() {
    return new Promise((resolve, reject) => {
      this.find((err, docs) => {
        if(err) {
          console.error(err)
          return reject(err)
        }
        
        resolve(docs)
      })
    })
  }



module.exports = mongoose.model('addTour',schema);