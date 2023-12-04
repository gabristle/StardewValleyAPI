var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const EstacaoService = require('../model/Estacao');
const NPCService = require('../model/NPC');
const PeixeService = require('../model/Peixe');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');
const Validadores = require('../helpers/Validadores');

//lista todos os participantes da competição
router.get('/participantes/:id/:pagina/:limite', async (req,res) => {

});

//lista todos os peixes pescados na competição
router.get('/peixes/:id/:pagina/:limite', async(req,res) => {

});

//adiciona uma pesca
router.post('/pesca', async(req, res) => {

});

//adiciona uma competição
router.post('/competicao', async(req, res) => {

});

//adiciona um participante
router.post('/participante', async(req, res) => {

});

//exclui uma competição
router.delete('/competicao', async(req,res) => {

});

//exclui uma pesca
router.delete('/pesca', async(req, res) => {

});


router.get('/install', async function(req, res, next) {
    await sequelize.sync({force: true});
    res.status(200).json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;