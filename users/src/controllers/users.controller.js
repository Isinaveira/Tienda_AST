const Users = require('../models/users');
const userCtrl = {};

userCtrl.getUsers = async (req,res) =>{
    const users = await Users.find({});
    res.json(users);
}

userCtrl.createUser = async (req,res)=> {
    const new_user = new Users(req.body);

    Users.findOne({username: req.body.username})
    .then( user =>{
        if(user === null){
            new_user.save();
            res.json('user created');
        }else{
            res.status(500).send('introduce otro nombre, ya existe un usuario con ese username.');
        }
    });
}

userCtrl.getUser = async (req,res) => {
    const user = await Users.findById(req.params.id);
    res.json(user);
}

userCtrl.getRole = async (req, res) =>{
    const user = await Users.findById(req.params.id);
    res.json(user.role);
}

userCtrl.deleteUser = async (req,res) => {
    await Users.findByIdAndDelete(req.params.id);
    res.json({
        status:'user deleted'
    })
}

module.exports = userCtrl;