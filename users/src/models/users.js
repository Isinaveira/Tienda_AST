const mongoose= require('mongoose');
const { Schema } = mongoose;

const UserSchema= new Schema({
    role:{type: String, required: true},
},{
    versionKey:false //esto quita el --v de la bbdd q crea mongo
    //timestamps: true, serviria pal tiempo en el q se crea
});

module.exports= mongoose.model('User', UserSchema);