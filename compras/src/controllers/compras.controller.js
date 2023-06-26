const ObjectId = require('mongoose').Types.ObjectId;
const Compra = require('../models/compras');
const compraCtrl = {};

compraCtrl.getCompras = async (req,res) => {
    const compras = await Compra.find({});
    res.json(compras);
}

compraCtrl.getComprasUser = async (req, res) => {
    const id_user = req.params.id_user;
    if(!ObjectId.isValid(id_user)) {
        return res.status(400).json({message: "El id_user es inválido"});
    }
    try{
        const compras = await Compra.find({id_user: id_user}).exec();
        res.json(compras);
    }catch(error){
        return res.status(500).json({message: 'Error en el servidor'});
    }
}

compraCtrl.getCompraByName = async(req, res)=>{
    if(req.params['name']){
        var name= req.params['name'];
       const compras= await Compra.find({name: new RegExp(name,'i')}).populate('name');
        res.json(compras); 
    }else{
        res.status(500).json("No has indicado un nombre")
    }
}


compraCtrl.editCompra = async (req,res)=>{
    const {id} = req.params.id;
    const compra = {
        direction: req.body.direction,
        name: req.body.name
    }
    await Compra.findByIdAndUpdate(id,{$set:compra },{new:true});
    res.json({
        status:'Producto updated'
    })
}

compraCtrl.createCompra = async (req,res) => {
    const compra = new Compra({
        id_producto: req.body.id_producto,
        producto: req.body.producto,
        quantity: req.body.quantity,
        price: req.body.price,
        name: req.body.name,
        direction: req.body.direction,
        id_user: req.body.id_user,
        date: new Date().toISOString(),
        total: req.body.price * req.body.quantity,
    });
    console.log(compra);
    compra.save()
    .then( result =>{
        res.status(201).json({
            message: 'Compra realizada con exito!',
            compra: result._id
        });
    })
    .catch( err => {
        res.status(500).json({ err });
    })
}

compraCtrl.getCompra = async (req,res) => {
    const compra = await Compra.findById(req.params.id);
    res.json(compra);
}

compraCtrl.getRole = async (req, res) => {
    const compra = await Compra.findById(req.params.id);
    res.json(compra.role);
}


compraCtrl.deleteCompra = async (req,res) => {
    await Compra.findByIdAndDelete(req.params.id);
    res.json({
        status:'Compra deleted'
    })
}

module.exports = compraCtrl;