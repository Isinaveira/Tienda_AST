const mongoose= require('mongoose');
const { Schema } = mongoose;

const CompraSchema= new Schema({
    id_producto:{type: mongoose.Schema.Types.ObjectId, ref:'productos', required: true},
    producto:{type: String, required: true},
    quantity:{type: Number, required: true},
    price:{type: Number, required: true},
    name: {type: String, required: true},
    direction:{ type: String, required : true},
    id_user:{type: mongoose.Schema.Types.ObjectId, ref:'users', required: true},
    date: {type: Date, required: true},
    total:{type: Number, required: true},
},{
    versionKey:false,
    timestamps: true
});

module.exports= mongoose.model('Compra', CompraSchema);