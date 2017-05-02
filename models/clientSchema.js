var mongoose    = require ('mongoose');
var Schema      = mongoose.Schema; 


var Contacts = new Schema({
        name        :{type:String,required:true},
        category    :String,
        phone       :{type:String,required:true},
        email       :{type:String,required:true}
},{timestamp:true});


var clientSchema = new Schema({
    company_name    :{type:String,required:true},
    direction       :{type:String},
    city            :{type:String},
    country         :{type:String},
    phone           :{type:Number},
    email           :{type:String},
    contacts        :[Contacts]
}
,{timestamp:true});



// the schema is useless so far
// we need to create a model using it
var Clients = mongoose.model('Client',clientSchema);

// make this available to our Node applications
module.exports = Clients;