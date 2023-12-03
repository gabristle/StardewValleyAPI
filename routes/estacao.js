var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const EstacaoService = require('../model/Estacao');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');

//listar estações
router.get('/:pagina/:limite', async (req,res) => {
    const pagina = parseInt(req.params.pagina);
    const limite = parseInt(req.params.limite);
    if(!limites.includes(limite)){
        res.status(400).json({mensagem: 'Falha ao listar estações! O limite deve ser 5, 10 ou 30.'});
    }else{
        const estacoes = await EstacaoService.listaEstacao(pagina, limite);
        res.status(200).json({lista: estacoes});
    }
});

//listar uma estação por ID
router.get('/:id', async (req, res) => {
    try{
        res.status(200).json({lista: await EstacaoService.buscaPorID(req.params.id)});
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao buscar estação por ID!'});
    }
});

//inserir nova estação
router.post('/', Auth.validaAcesso, async (req,res) => {
    try{
        let estacao = await EstacaoService.addEstacao(req.body);
        res.status(200).json({estacao: estacao});
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao adicionar estação!'});
    }
});

//alterar uma estação
router.put('/:id', Auth.validaAcesso, async (req, res) => {
    try{
        let estacao = await EstacaoService.alteraEstacao(req.params.id, req.body);
        res.status(200).json({estacao: estacao});
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao alterar estação!'});
    }
});

//excluir uma estação
router.delete('/:id', Auth.validaAcesso, async (req, res) => {
    try{
        res.status(200).json({estacao: await EstacaoService.deleta(req.params.id)});
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao deletar estação!'});
    }
});

router.get('/install', async function(req, res, next) {
    await sequelize.sync({force: true});
    res.status(200).json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;