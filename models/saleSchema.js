var mongoose    = require ('mongoose');
var Schema      = mongoose.Schema;

var saleSchema = Schema({
    _client             :{type:String, required:true},
    contact             :{type:String, required:true},
    _action             :{type:mongoose.Schema.Types.ObjectId,ref:'Action',required:true},
    project_price       :{type:Number, reuqired:true},
    project_margin      :{type:Number, required:true},
    sales_date          :{type:Date, required:true}
},{timestamp:true});

// the schema is useless so far
// we need to create a model using it
var Sales = mongoose.model('Sale', saleSchema);

// make this available to our Node applications
module.exports = Sales;