const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const {sequelize} = require('../model/bd');
const UserService = require('../model/Usuario');
const IsAdmin = require('../helpers/IsAdmin');
const Auth = require('../helpers/Auth');

//altera os dados do usuario, não funciona
router.put('/', Auth.validaAcesso, async(req, res) => {
    try{
        let userModificado = await UserService.alteraUser(req.usuario.id, req.body);
        res.json({user: userModificado});
    } catch(e){
        res.status(400).json({mensagem: 'Falha ao alterar usuario'});
    }
});

//administrador altera dados dos usuários não administradores
router.put('/:id', Auth.validaAcesso, async(req, res) =>{
    try{
        let userModificado = await UserService.buscaPorID(req.params.id);
        if(userModificado.isAdmin){
            return res.status(400).json({mensagem: 'Um administrador nao pode alterar dados de outro administrador'});
        }else{
            await UserService.alteraUser(req.params.id, req.body);
            res.json({user: userModificado});
        }
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao alterar o user'});
    }
});

//torna um usuário administrador, n funciona
router.put('/admin/:id', Auth.validaAcesso, async(req, res) => {
    try{
        let user = req.params.id;
        res.json({admin: await UserService.tornarAdmin(user)});
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao tornar o usuario administrador'});
    }
});

//cria um usuario
router.post('/', async (req, res) => {
    let {usuario, senha} = req.body;
    if(usuario != "" && senha != ""){
        let token = jwt.sign({usuario: usuario}, '123!@#', {expiresIn: '10 min'});
        let user = await UserService.addUser(req.body);
        res.json({logged: true, token: token, user:user});
    }else{
        res.status(400).json({logged:false, mensagem: 'Usuario e senha invalidos'});
    }
});

//deleta um usuario, apenas administradores podem deletar
router.delete('/:id', Auth.validaAcesso, async (req, res) => {
    let userExcluido = req.params.id;
    if(userExcluido.isAdmin){
        res.status(400).json({mensagem: 'Um administrador nao pode excluir outro admnistrador'});
    }else{
        res.json({user: await UserService.deleta(userExcluido)});
    }
});

router.get('/install', async function(req, res, next) {
    await sequelize.sync({force: true});
    res.json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;