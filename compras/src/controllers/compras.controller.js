const Compra = require('../models/compras');
const compraCtrl = {};

compraCtrl.getCompras = async (req,res) => {
    const compras = await Compra.find({});
    res.json(compras);
}

compraCtrl.getProductos = async (req, res) => {
    const Productos = await Productos.find({});
    res.json(Productos);
}

compraCtrl.editCompra = async (req,res)=>{
    const {id} = req.params;
    const producto={
        direccion: req.body.direccion,
        
    }
    await Productos.findByIdAndUpdate(id,{$set:producto },{new:true});
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
            product: result
        });
    })
    .catch( err => {
        res.status(500).json({ err });
    })
}

compraCtrl.getCompra = async (req,res) => {
    const Compra = await Compras.findById(req.params.id);
    res.json(Compra);
}

compraCtrl.getRole = async (req, res) => {
    const Compra = await Compras.findById(req.params.id);
    res.json(Compra.role);
}

compraCtrl.deleteCompra = async (req,res) => {
    await Compras.findByIdAndDelete(req.params.id);
    res.json({
        status:'Compra deleted'
    })
}

module.exports = compraCtrl;