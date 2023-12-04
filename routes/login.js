const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const {sequelize} = require('../model/bd');
const UserService = require('../model/Usuario');
const IsAdmin = require('../helpers/IsAdmin');
const Auth = require('../helpers/Auth');
const Validadores = require('../helpers/Validadores');

//altera os dados do usuario
router.put('/', Auth.validaAcesso, Validadores.validaAlteracao, async(req, res) => {
    try{
        await UserService.alteraUser(req.body, req.user.id);
        const novoToken = jwt.sign({
            id: req.user.id,
            email: req.user.email,
            usuario: req.user.usuario,
            isAdmin: req.user.isAdmin || false
        }, process.env.SECRET);
        return res.status(200).json({mensagem: 'Alteração feita com sucesso! Acesse esse é seu novo token: ', token: novoToken});
    } catch(e){
        return res.status(400).json({mensagem: 'Falha ao alterar usuario!'});
    }
});

//administrador altera dados dos usuários não administradores
router.put('/:id', IsAdmin.isAdmin, Validadores.validaAlteracao, async(req, res) =>{
    try{
        let user = await UserService.buscaPorID(req.params.id);
        if(user.isAdmin){
            return res.status(400).json({mensagem: 'Um administrador nãoo pode alterar dados de outro administrador!'});
        }else{
            await UserService.alteraUser(req.body, req.params.id);
            const novoToken = jwt.sign({
                id: user.id,
                email: user.email,
                usuario: user.usuario,
                isAdmin: user.isAdmin || false
            }, process.env.SECRET);
            return res.status(200).json({mensagem: 'Alteração feita com sucesso! Informe ao usuário seu novo token: ', token: novoToken});
        }
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao alterar os dados do usuario!'});
    }
});

//torna um usuário administrador
router.put('/admin/:id', IsAdmin.isAdmin, async(req, res) => {
    try{
        return res.status(200).json({admin: await UserService.tornarAdmin(req.params.id)});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao tornar o usuario administrador!'});
    }
});

//cria um usuario
router.post('/registrar', Validadores.validaCadastro, async (req, res) => {
    try{
        const user = await UserService.addUser(req.body);
        console.log(user);
        return res.status(200).json({mensagem: 'Usuario registrado com sucesso! Faça o login para acessar as rotas.', user: user});
    }catch(e){
        return res.status(400).json({mensagem: 'Erro ao cadastrar usuario!'});
    }
});

//fazer login e receber o token
router.post('/', async (req, res) => {
    const {usuario, senha} = req.body;
    try{
        const user = await UserService.buscaPorDados({usuario, senha});
        if(!user){
            return res.status(400).json({mensagem: 'O usuario não existe! Tente novamente.'});
        }else{
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                usuario: user.usuario,
                isAdmin: user.isAdmin || false
            }, process.env.SECRET);
            return res.status(200).json({mensagem:'Autenticação realizada com sucesso!', token});
        }
    }catch (e){
        return res.status(400).json({mensagem: 'Erro! Falha ao criar o Token.'});
    }
});

//deleta um usuario, apenas administradores podem deletar
router.delete('/:id', IsAdmin.isAdmin, async (req, res) => {
    let userBusca = await UserService.buscaPorID(req.params.id);
    if (!userBusca) {
        return res.status(400).json({mensagem: 'Usuário não encontrado!' });
    }
    if(userBusca.isAdmin){
        return res.status(400).json({mensagem: 'Um administrador não pode excluir outro admnistrador!'});
    }else{
        let userExcluido = await UserService.deleta(req.params.id);
        return res.status(200).json({usuario: userExcluido});
    }
});

module.exports = router;