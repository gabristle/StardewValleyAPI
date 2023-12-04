var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const EstacaoService = require('../model/Estacao');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');
const Validadores = require('../helpers/Validadores');

//listar estações
router.get('/:pagina/:limite', async (req,res) => {
    const pagina = parseInt(req.params.pagina);
    const limite = parseInt(req.params.limite);
    if(!limites.includes(limite)){
        return res.status(400).json({mensagem: 'Falha ao listar estações! O limite deve ser 5, 10 ou 30.'});
    }else{
        const estacoes = await EstacaoService.listaEstacao(pagina, limite);
        return res.status(200).json({lista: estacoes});
    }
});

//listar uma estação por ID
router.get('/:id', async (req, res) => {
    try{
        return res.status(200).json({lista: await EstacaoService.buscaPorID(req.params.id)});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao buscar estação por ID!'});
    }
});

//inserir nova estação
router.post('/', Auth.validaAcesso, Validadores.validaEstacao, async (req,res) => {
    try{
        let estacao = await EstacaoService.addEstacao(req.body);
        return res.status(200).json({estacao: estacao});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao adicionar estação!'});
    }
});

//alterar uma estação
router.put('/:id', Auth.validaAcesso, Validadores.validaEstacao, async (req, res) => {
    try{
        let estacao = await EstacaoService.alteraEstacao(req.params.id, req.body);
        return res.status(200).json({estacao: estacao});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao alterar estação!'});
    }
});

//excluir uma estação
router.delete('/:id', Auth.validaAcesso, async (req, res) => {
    try{
        return res.status(200).json({estacao: await EstacaoService.deleta(req.params.id)});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao deletar estação!'});
    }
});

module.exports = router;