
var express     =require('express');
var mongoose    =require('mongoose');
var bodyParser  =require('body-parser');
var Actions     =require('../models/actionSchema');
var Verify      =require('./verify.js');

// middleware that is specific to this router
//actionsalesRouter.use(bodyParser.json());
var actionsRouter = express.Router();
actionsRouter.use(bodyParser.json());
//+++++++++++++++++ACTIONS+++++++++++++++++++++++
actionsRouter.route('/').
//when the get request comes in first the verifyOrdinaryUser
//is donde and if it pass continue to the next medaleware
//the Verify.verifyOrdinaryUser is a middleware that's apply before
    get(Verify.verifyOrdinaryUser,function (req, res) {
        Actions.find({}, function(err, actions){
            if(err) throw err;

            res.json(actions);
         });

    })
    .post(Verify.verifyOrdinaryUser,function (req, res) {
        Actions.create(req.body,function(err,action){
            if(err) throw err;
            res.json(action);
        })
    });

actionsRouter.route('/:actionId').
    get(Verify.verifyOrdinaryUser,function(req,res){
        //actionId is the _id of the action Object that you want to search.
       Actions.findById(req.params.actionId, function(err, action){
            console.log(action)
             if(err) throw err;

            res.json(action);
       })
    })
    .put(Verify.verifyOrdinaryUser,function(req,res){
        Actions.findByIdAndUpdate(req.params.actionId,{$set:req.body },{new:true},
        function(err, action){
            console.log(action)
             if(err) throw err;

            res.json(action);

       })
    })
    .delete(Verify.verifyOrdinaryUser,function(req,res){
        Actions.findByIdAndRemove(req.params.actionId, function (err,action){
            if(err) throw err;
            //retunrs de object remove
            res.json(action);
        });
    });


module.exports = actionsRouter;
