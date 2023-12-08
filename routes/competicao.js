var express = require('express');
var router = express.Router();
const {sequelize, CompetidorPeixe, CompeticaoModel, NPCModel, PeixeModel} = require('../model/bd');
const CompeticaoService = require('../model/Competicao');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');
const Validadores = require('../helpers/Validadores');

//lista todos os dados da competição
router.get('/:id', async (req,res) => {
    try{
        let competidores = await CompeticaoService.listaCompetidores(req.params.id);
        return res.status(200).json({competidores: competidores});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao listar participantes'});
    }
});

//adiciona uma competição
router.post('/competicao', Auth.validaAcesso, Validadores.validaCompeticao, async(req, res) => {
    try{
        let competicao = await CompeticaoService.addCompeticao(req.body);
        return res.status(200).json({competicao: competicao});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao adicionar Competição!'});
    }
});

//adiciona um competidor
router.post('/competidor', Auth.validaAcesso, Validadores.validaCompetidor, async(req, res) => {
    try{
        let participante = await CompeticaoService.addCompetidor(req.body);
        return res.status(200).json({competidor: competidor});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao adicionar Competidor!'});
    }
});

//exclui uma competição
router.delete('/competicao', Auth.validaAcesso, async(req,res) => {
    try{
        return res.status(200).json({estacao: await CompeticaoService.excluiCompeticao(req.params.id)});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao deletar competição!'});
    }
});

//exclui um competidor
router.delete('/competidor', Auth.validaAcesso, async(req, res) => {
    try{
        return res.status(200).json({estacao: await CompeticaoService.excluiCompetidor(req.params.id)});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao deletar competidor!'});
    }
});


router.get('/install', async function(req, res, next) {
    await sequelize.sync({force: true});
    res.status(200).json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;