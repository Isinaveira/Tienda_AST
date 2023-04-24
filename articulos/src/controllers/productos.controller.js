const Productos = require('../models/productos');
const multer = require('multer');
const path = require('path');
const productoCtrl = {};
const fs = require('fs');

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

function checkFileType(file, cb){
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if( mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error: Solo se aceptan imágenes de tipo JPEG, JPG y PNG');
    }
}

productoCtrl.getProductos = async (req,res) => {
    const productos= await Productos.find();
    res.json(productos);
}

productoCtrl.createProducto = (req,res)=>{
    upload(req, res, (err)=>{
      if(err){
        console.log(err);
        res.json({succes: false, message:'Error al subir la imagen'});
      }else{
        const {name, description, price, quantity} = req.body;
        console.log(req.file);
        const product = new Productos({
            name,
            description,
            price,
            quantity,
            image: req.file.filename
        });

        product.save()
        .then( result =>{
            res.status(201).json({
                message: 'Producto creado correctamente',
                product: result
            });
        })
        .catch( err => {
            res.status(500).json({ err });
        })

      }  
      
      
    });
    
}

productoCtrl.getImagen = async (req,res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../../uploads', imageName);

  const stream = fs.createReadStream(imagePath);
  stream.on('error', err => {
    console.error(err);
    res.status(500).end();
  });

  res.setHeader('Content-Type', 'image/jpeg');
  stream.pipe(res);

}

productoCtrl.getProducto = async (req,res) => {
    const producto= await Productos.findById(req.params.id);
    res.json(producto);
}

productoCtrl.editProducto= async (req,res)=>{
    const {id} = req.params;
    const producto={
        name: req.body.name,
        description:req.body.description,
        quantity:req.body.quantity,
        price:req.body.price
    }
    await Productos.findByIdAndUpdate(id,{$set:producto },{new:true});
    res.json({
        status:'Producto updated'
    })
}

productoCtrl.deleteProducto= async (req,res)=> {
    await Productos.findByIdAndDelete(req.params.id);
    res.json({
        status:'Producto deleted'
    })
}

productoCtrl.getProductosPorNombre= async(req,res)=>{
    
    if(req.params['name']){
        var name= req.params['name'];
       const productos= await Productos.find({name: new RegExp(name,'i')}).populate('name');
        res.json(productos); 
    }
    
}

module.exports = productoCtrl;