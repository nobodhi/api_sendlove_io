// partController
'use strict';
var mongoose = require('mongoose');
var util = require('util');
// tbd
//var bodyParser = require('body-parser');
//var Verify = require('./verify'); // TODO 

var Parts = require('../../models/parts');


// Exports all the functions to perform on the db
module.exports = {
  getPart, getPartsArray, addPart
};

function renderOne (req, res, id, fieldlist) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404)
        .json("Oh noes! That doesn't appear to be a valid id.");
  }
  else {
    Things.findById(
      id
      , fieldlist 
      , function(err, obj) {
        if (err) throw err;
        if (obj) {
          console.log(obj);
          res.json(obj);
        }
        else {
          res.status(404)
            .json("Crikey! That doesn't appear to be a valid id.")
        }
      } 
    );
  }
}

function renderArray (req, res, queryParams, fieldList) {
  if (!true) {
      res.status(404)
        .json("Oh noes! That doesn't appear to be a valid search.");
  }
  else {
    // console.log(JSON.stringify(queryParams));
    Parts.find(
      queryParams // build a query object e.g. {colName: {$in: arrayNames}}
      , fieldList 
      , function(err, obj) {
        if (err) throw err;
        if (obj) {
          // console.log(obj);
          res.json(obj);
        }
        else {
          res.status(404)
            .json("Crikey! I can't find a thing.")
        }
      } 
    ).sort( { _id: 1 } );
  }
}

/*
  get a part by id
*/
function getPart(req, res) {
  var id = req.swagger.params.id.value; //req.swagger contains the path parameters
  renderOne(req, res, id, "'id name description thingId personId latitude longitude image category altId partType nValue sValue'");
}

/*
  get an array of parts, by thingId
*/
function getPartsArray(req, res) {
  var queryString = {};
  if (req.swagger.params.thingId != undefined) { // TODO loop through each key and value in the querystring.
    queryString['thingId'] = req.swagger.params.thingId.value; 
  }
  if (req.swagger.params.personId != undefined) { // TODO loop through each key and value in the querystring.
    queryString['personId'] = req.swagger.params.personId.value; 
  }
  if (req.swagger.params.partType != undefined) { // TODO loop through each key and value in the querystring.
    queryString['partType'] = req.swagger.params.partType.value; 
  }

  console.log(queryString['thingId']);    
  console.log(queryString['personId']);    
  renderArray(req, res, queryString, "'id name description thingId personId latitude longitude imagePath category altId partType nValue sValue'");
}

function addPart (req, res) {

  var newPart = JSON.parse(req.body); 
  console.log(req.body);
  Parts.create(newPart, function(err, obj) { 
    if (err) throw err;
      if (obj) {
        console.log(obj);
        var id = obj._id;
        res.json(obj);
      }
      else {
        res.status(500)
          .json("This should not be happening.")
      }
  });

}  
