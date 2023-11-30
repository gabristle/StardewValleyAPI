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
        res.status(400).json({mensagem: 'Falha ao listar estacoes'});
    }else{
        const estacoes = await EstacaoService.listaEstacao(pagina, limite);
        res.json({lista: estacoes});
    }
});

//listar uma estação por ID
router.get('/:id', async (req, res) => {
    try{
        res.json({lista: await EstacaoService.buscaPorID(req.params.id)});
    }catch(e){
        res.status(400).jsson({mensagem: 'Falha ao buscar estacao por ID'});
    }
});

//inserir nova estação
router.post('/', Auth.validaAcesso, async (req,res) => {
    try{
        let estacao = await EstacaoService.addEstacao(req.body);
        res.json({estacao: estacao});
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao salvar estacao'});
    }
});

//alterar uma estação
router.put('/:id', Auth.validaAcesso, async (req, res) => {
    try{
        let estacao = await EstacaoService.alteraEstacao(req.params.id, req.body);
        res.json({estacao: estacao});
    }catch(e){
        res.status(400).json({mensagem: 'Falha a alterar estacao'});
    }
});

//excluir uma estação
router.delete('/:id', Auth.validaAcesso, async (req, res) => {
    try{
        res.json({estacao: await EstacaoService.deleta(req.params.id)});
    }catch(e){
        res.status(400).json({mensagem: 'Falha ao deletar estacao'});
    }
});

module.exports = router;