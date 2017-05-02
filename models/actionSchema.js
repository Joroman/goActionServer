var mongoose    = require ('mongoose');
var Schema      = mongoose.Schema;

var actionSchema= new Schema({
    name                :{type:String,required:true},
    description         :{type:String,required:true},
   _client              :{type:mongoose.Schema.Types.ObjectId,ref:'Client',required:true},
    client_name         :{type:String,required:true},
    start_date          :{type:Date,required:true},
    end_date            :{type:Date,required:true},

    prospection :{
        meeting_date    :{type:Date},
        objective       :{type:String},
        contact         :{type:String}
    },

    request:{
        service_product     :{type:String},
        resources           :{type:String},
        response_date       :{type:Date},
        estimate_budget     :{type:Number}
    },

    response:{
        offer_name              :{type:String},
        offer_document          :{type:String},
        offer_budget            :{type:Number},
        offer_margin            :{type:Number},
        date_send               :{type:Date}
    },

    feedback:{
        offer_win           :{type:Boolean},
        project_start_date  :{type:Date},
        description         :{type:String}
    }
}, {
timestamps:true
});


// the schema is useless so far
// we need to create a model using it
var Actions = mongoose.model('Action', actionSchema);

// make this available to our Node applications
module.exports = Actions;
