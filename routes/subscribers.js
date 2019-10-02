var express = require('express');
var router = express.Router();
var Subscribe = require('../models/subscribe');


router.post('/subscribe',  function(req,res,next){
    var data = new Subscribe ({
      email: req.body.email,
      
    });
  
  
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

    const encryptedString = cryptr.encrypt(req.body.email);
    console.log(encryptedString);
   
    // console.log(data);
    data.email = encryptedString;
  
    let promise = data.save();
  
    promise.then(function(doc){
      return res.status(201).json(doc);
    })
  
    promise.catch(function(err){
      return res.status(501).json({message: 'Error registering user.'})
    })
  })




  
router.get('/view_mails', function (req, res) {

  const Cryptr = require('cryptr');
  const cryptr = new Cryptr('myTotalySecretKey');

  // find is used to retrieve data from db
  Subscribe.find({},{email: 1 },function (err, result) {
 // OwnerSchema.findOne(req.query, function (err, result) {
      if (err) {
          res.send('Failed to fetch data');
      }
      else {
          console.log(result);
         
          let alldata=[]
             result.forEach(email => {
          let decryptedString = cryptr.decrypt(email.email);
           console.log(decryptedString + "decrypted string");
           alldata.push(decryptedString)
          // console.log(result);
          //.json(decryptedString[0]);
      });
    res.json(alldata)
      }
  })
  console.log("reached get api");
})



  module.exports = router;