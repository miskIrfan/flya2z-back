var express = require('express');
var router = express.Router();
var addTour = require('../models/tour');
var jwt = require('jsonwebtoken');

router.post('/addTour',  function(req,res,next){
  var addtour = new addTour({
    tourName: req.body.tourName,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    continent:req.body.continent,
    componentLink:req.body.componentLink,
    tourDescription:req.body.tourDescription,
    creation_dt: Date.now()
  });

  let promise = addtour.save();

  promise.then(function(doc){
    return res.status(201).json(doc);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user.'})
  })
});

//update Tour
router.post('/updateTour',  function(req,res,next){
  let tourObj = new addTour({
    tourName: req.body.tourName,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    continent:req.body.continent,
    componentLink:req.body.componentLink,
    tourDescription:req.body.tourDescription,
    creation_dt: Date.now()
  }); 

  addTour.updateTour(tourObj, req.body._id)
  .then(docs => {
      return res.status(201).json(docs);
 //console.log(docs)
})
.catch(err => {
   return res.status(501).json({message: 'Error Getting All Tours. Please try again!.'})
})
});


router.get('/getTours', function(req,res,next){
    addTour.getTours()
       .then(docs => {
           return res.status(201).json(docs);
      //console.log(docs)
    })
    .catch(err => {
        return res.status(501).json({message: 'Error Updating your Tour. Please try again!.'})
    })
    //return res.status(200).json(decodedToken.username);
  })






module.exports = router;