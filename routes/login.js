const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const {sequelize} = require('../model/bd');
const UserService = require('../model/Usuario');
const IsAdmin = require('../helpers/IsAdmin');
const Auth = require('../helpers/Auth');

//altera os dados do usuario
router.put('/', Auth.validaAcesso, async(req, res) => {
    try{
        let userModificado = await UserService.alteraUser(req.body, req.user.id);
        return res.json({usuario: await UserService.buscaPorID(req.user.id)});
    } catch(e){
        return res.status(400).json({mensagem: 'Falha ao alterar usuario'});
    }
});

//administrador altera dados dos usuários não administradores
router.put('/:id', IsAdmin.isAdmin, async(req, res) =>{
    try{
        let user = await UserService.buscaPorID(req.params.id);
        if(user.isAdmin){
            return res.status(400).json({mensagem: 'Um administrador nao pode alterar dados de outro administrador'});
        }else{
            let userModificado = await UserService.alteraUser(req.body, req.params.id);
            return res.json({usuario: await UserService.buscaPorID(req.params.id)});
        }
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao alterar o user'});
    }
});

//torna um usuário administrador
router.put('/admin/:id', IsAdmin.isAdmin, async(req, res) => {
    try{
        return res.json({admin: await UserService.tornarAdmin(req.params.id)});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao tornar o usuario administrador'});
    }
});

//cria um usuario
router.post('/registrar', async (req, res) => {
    try{
        const user = await UserService.addUser(req.body);
        console.log(user);
        return res.status(200).json({mensagem: "Cadastrado", user: user});
    }catch(e){
        return res.status(400).json({mensagem: "Erro ao cadastrar"});
    }
});

router.post('/', async (req, res) => {
    const {usuario, senha} = req.body;
    try{
        const user = await UserService.buscaPorDados({usuario, senha});
        if(!user){
            return res.status(400).json({msg: 'Usuario nao existe'});
        }else{
            const token = jwt.sign({
                id: user.id,
                usuario: user.usuario,
                isAdmin: user.isAdmin || false
            }, process.env.SECRET);
            return res.status(200).json({msg:"Autenticacao realizada com sucesso", token});
        }
    }catch (e){
        console.log(e);
        return res.status(500).json({msg: "Token não foi criado"});
    }
});

//deleta um usuario, apenas administradores podem deletar
router.delete('/:id', IsAdmin.isAdmin, async (req, res) => {
    let userBusca = await UserService.buscaPorID(req.params.id);
    if (!userBusca) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    if(userBusca.isAdmin){
        return res.status(400).json({mensagem: 'Um administrador nao pode excluir outro admnistrador'});
    }else{
        let userExcluido = await UserService.deleta(req.params.id);
        return res.json({usuario: userExcluido});
    }
});

router.get('/install', async function(req, res, next) {
    await sequelize.sync({force: true});
    return res.json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;