var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
    tourName : {type:String, require:true},
    imageUrl: {type:String, require:true},
    price:{type:String, require:true},
    continent:{type:String, require:true},
    componentLink:{type:String, require:false},
    tourDescription:{type:String, require:true},
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

  schema.statics.updateTour = function(tourObj, id) {
    return new Promise((resolve, reject) => {
      let tourid = id;
      let tourObject = tourObj.toObject();
      delete tourObject._id;

      this.update({_id:tourid}, tourObject, {upsert: true}, (err, result) => {
        if(err) {
          console.error(err)
          return reject(err)
        }
        
        resolve(result)
      })
    })
  }


module.exports = mongoose.model('tours',schema);