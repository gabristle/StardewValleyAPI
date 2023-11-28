const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const UserService = require('../model/Usuario');
const limites = [5, 10, 30];
const IsAdmin = require('../helpers/IsAdmin');

router.put('/:id', IsAdmin.isAdmin, async(req, res) =>{
    try{
        let user = await UserService.alteraUser(req.params.id);
        res.json({user: user});
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao alterar o user'});
    }
});

router.post('/', async (req, res) => {
    let {usuario, senha} = req.body;
    if(usuario != "" && senha != ""){
        let token = jwt.sign({usuario: usuario}, '123!@#', {expiresIn: '10 min'});
        let user = await UserService.addUser(req.body);
        res.json({logged: true, token: token, user:user});
    }else{
        res.status(400).json({logged:false, mensagem: 'Usuario e senha invalidos'})
    }
});

router.delete('/:id', IsAdmin.isAdmin, async (req, res) => {
    res.json({user: await UserService.deleta(req.params.id)});
});

module.exports = router;