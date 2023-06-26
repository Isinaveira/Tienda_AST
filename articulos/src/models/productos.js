const { timeStamp } = require('console');
const mongoose= require('mongoose');
const { Schema} = mongoose;

const ProductoSchema= new Schema({
    name:{ type: String, required : true},
    description:{type: String, required: true},
    quantity:{type: Number, required: true},
    price:{type: Number, required: true},
    image:{type: String, required: true}
},{
    versionKey:false,
});

module.exports= mongoose.model('Producto',ProductoSchema);