var express = require('express');
var router = express.Router();
const {sequelize, CompetidorPeixe} = require('../model/bd');
const EstacaoService = require('../model/Estacao');
const NPCService = require('../model/NPC');
const PeixeService = require('../model/Peixe');
const CompeticaoService = require('../model/Competicao');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');
const Validadores = require('../helpers/Validadores');

//lista todos os participantes da competição
router.get('/participantes/:id/:pagina/:limite', async (req,res) => {

});

//lista todos as competições e seus participantes
router.get('/participantes/:id/:pagina/:limite', async (req,res) => {

});

//adiciona uma pesca
router.put('/pesca/:id', Auth.validaAcesso,async(req, res) => {
    try{
        let competidor = await CompeticaoService.addPesca(req.params.id, req.body);
        return res.status(200).json({competidor: competidor});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao adicionar novos peixes!'});
    }
});

//adiciona uma competição
router.post('/competicao', Auth.validaAcesso, async(req, res) => {
    try{
        let competicao = await CompeticaoService.addCompeticao(req.body);
        return res.status(200).json({competicao: competicao});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao adicionar Competição!'});
    }
});

//adiciona um participante
router.post('/participante', Auth.validaAcesso, async(req, res) => {
    try{
        let participante = await CompeticaoService.addCompetidor(req.body);
        return res.status(200).json({participante: participante});
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

//exclui uma pesca
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