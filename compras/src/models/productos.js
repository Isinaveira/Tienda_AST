const mongoose= require('mongoose');
const { Schema } = mongoose;

const ProductoSchema= new Schema({
    name:{ type: String, required : true},
    description:{type: String, required: true},
    quantity:{type: Number, required: true},
    price:{type: Number, required: true}
},{
    versionKey:false,
    timestamps: true,
});

module.exports= mongoose.model('Producto',ProductoSchema);