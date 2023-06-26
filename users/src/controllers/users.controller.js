const Users = require('../models/users');
const userCtrl = {};

userCtrl.getUsers = async (req,res) =>{
    const users = await Users.find({});
    res.json(users);
}

userCtrl.createUser = async (req,res)=> {
    console.log(req.body);
    const new_user = new Users({
        role: req.body.role});
    console.log(new_user);
    await new_user.save()
    .then(result => {
        res.status(201).json({ 
            message: 'user created',
            id: result._id
        })
    })
    .catch(error => {
        res.status(500).json({error})
    })
}
        


    // Users.findOne({username: req.body.username})
    // .then( user =>{
    //     if(user === null){
    //         new_user.save();
    //         res.json('user created');
    //     }else{
    //         res.status(500).send('introduce otro nombre, ya existe un usuario con ese username.');
    //     }
    // });


userCtrl.getUser = async (req,res) => {
    Users.findById(req.params.id)
    .then((user) => { 
        if(!user){
            res.status(404).json({message:'Usuario no encontrado'});
            return;
        }
        res.status(201).json(user);
    })
    .catch((error) => {
        res.status(500).json({message: 'Error interno del servidor'});
     });
}

userCtrl.getUsersByRole = async (req, res) => {
    const users = await Users.find({role: req.params.role})
    .then((users) => { 
        if(!users){
            res.status(404).json({message: `No hay usuarios de tipo ${req.params.role}`});
            return;
        }
        res.status(201).json(users);
    })
    .catch((error) => {
        res.status(500).json({message: 'Error interno del servidor'});
     });
}

userCtrl.getUserByUsername = async (req, res) =>{
    try {
        const user = await Users.findOne({ username: req.params.username });
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
}

userCtrl.getRole = async (req, res) =>{
    Users.findById(req.params.id)
    .then( (user) => {
        if(!user){
            res.status(404).json({message: 'Cliente no encontrado'});
            return;
        }
        res.status(201).json(user.role);
    })
    .catch(err => res.status(500).json(err));
}

userCtrl.deleteUser = async (req,res) => {
    await Users.findByIdAndDelete(req.params.id);
    res.json({
        status:'user deleted'
    })
}

module.exports = userCtrl;