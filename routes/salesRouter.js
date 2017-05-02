var bodyParser  = require('body-parser');
var express     = require ('express');
var Sales       = require('../models/saleSchema');
var mongoose    = require('mongoose');
var Verify      =require('./verify.js');
salesroute   = express.Router();
//++++++++++++++++SALES+++++++++++++++++++++++++
salesroute.use(bodyParser.json());
salesroute.route('/').
    get(Verify.verifyOrdinaryUser, function(req,res){
      Sales.find({}, function(err, sale){
          if(err) throw err;
          res.json(sale);
      })
    })
    .post(Verify.verifyOrdinaryUser, function(req, res){

      Sales.create(req.body, function (err, sale) {
        if (err) throw err;
        res.json(sale);
    });

});
//++++++++++++++++++SALE ID**********************
salesroute.route('/:saleId').
    get(Verify.verifyOrdinaryUser,function(req,res){

        Sales.findById(req.params.saleId, function(err, sale){
            if(err) throw err;
            res.json(sale);
        });
    })
    .put(Verify.verifyOrdinaryUser,function(req,res){

        Sales.findByIdAndUpdate(req.params.saleId,{$set:req.body},function(err,sale){
            if (err) throw err;
            res.json(sale);
        });

    })
    .delete(Verify.verifyOrdinaryUser,function(req,res){
        Sales.findByIdAndRemove(req.params.saleId, function(err, sale){
            if(err) throw sale;
            res.json(sale);
        });
    });

module.exports= salesroute;
