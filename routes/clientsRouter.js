var express = require ('express');
var clients = express.Router();

var Clients = require('../models/clientSchema');
var Verify  = require('./verify');
//+++++++++++++++++++++++CLIENT
clients.route('/').

    get(Verify.verifyOrdinaryUser,function(req, res){

        Clients.find({}, function(err, clients){
            if(err) throw err;
             res.json(clients);
        });
    })
    .post(Verify.verifyOrdinaryUser, function(req, res){
      var comp= req.body;
      Clients.find({company_name:comp.company_name}, function(err,client){
        if(err) throw err;

        console.log(client.length);
        if(client.length<1){
          Clients.create(req.body,function(err, client){
              if(err) throw err;
              res.json(client);
          });
        }

      })


    });

//+++++++++++++++++++++++CLIENT ID++++++++++++++++++
clients.route('/:clientId').
    get(Verify.verifyOrdinaryUser, function(req,res){
        Clients.findById(req.params.clientId,function(err,client){
            if(err) throw err;
            //send in json format
            res.json(client);
        });
    })
    .put(Verify.verifyOrdinaryUser, function(req,res){
        Clients.findByIdAndUpdate(req.params.clientId,{$set:req.body},function(err,client){
            if(err) throw err;
            res.json(client);
        });
    })
    .delete(Verify.verifyOrdinaryUser, function(req,res){
       Clients.findByIdAndRemove(req.params.clientId,function(err,client){
           if(err) throw err;
           res.json(client);
       });
    });

//++++++++++++++++CONTACTS++++++++++++++++++++++++
clients.route('/:clientId/contacts').
    get(Verify.verifyOrdinaryUser, function(req,res){
       Clients.findById(req.params.clientId,function (err, client){
           if (err) throw err;
           res.json(client.contacts);
       });
    })
    .post(Verify.verifyOrdinaryUser, function(req,res){
        var contact = req.body;
        Clients.findById(req.params.clientId,function(err, client){
            if(err) throw err;
            client.contacts.push(contact);
            client.save(function(err, save){
                    if(err) throw err;
                    res.json(save);
            });
            /**Clients.findByIdAndUpdate(req.params.clientId,{$set:client},function(err,update){
                if(err) throw err;
                res.json(update);
            });**/
        });
    });

//++++++++++++++++CONTACT ID++++++++++++++++++++++++
clients.route('/:clientId/contacts/:contactId').
    get(Verify.verifyOrdinaryUser, function(req,res){
        Clients.findById(req.params.clientId,function(err,client){
            if(err) throw err;
            var contact = client.contacts.id(req.params.contactId);
            res.json(contact);
        });
    })
    .put(Verify.verifyOrdinaryUser, function(req,res){
        Clients.findById(req.params.clientId, function(err,client){
            if(err) throw err;
            var contact = client.contacts.id(req.params.contactId).remove();
            client.contacts.push(req.body);
            client.save(client, function (err, clients){
                if(err) throw err;
                res.json(clients);
            });

        })
    })
    .delete(Verify.verifyOrdinaryUser, function(req, res){
       Clients.findById(req.params.clientId,function(err, client){
           if(err) throw err;
           client.contacts.id(req.params.contactId).remove();
           client.save(function(err, save){
               if(err) throw err;
               res.json(save);
           })
       });
    });



module.exports= clients;
