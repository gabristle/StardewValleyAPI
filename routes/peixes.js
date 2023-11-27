var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const PeixesService = require('../model/Peixes');

//listar os peixes
router.get('/', (req, res) => {
  res.json({lista: PeixesService.lista()});
});

//listar por local
router.get('/:local', async (req,res) => {
  res.json({lista: await PeixesService.listaPorLocal(req.params.local)});
});

//listar um peixe por ID
router.get('/view/:id', async (req, res) => {
  res.json({peixe: await PeixesService.buscaPorID(req.params.id)});
});

//inserir novo peixe
router.post('/', async (req, res) => {
  try{
    let peixe = await PeixesService.novo(req.body);
    res.json({peixe: peixe});
  } catch(e){
    res.status(400).json({mensagem: "Falha ao salvar o peixe"});
  }
});

//alterar um peixe
router.put('/:id', async (req, res) =>{
  try{
    let peixe = await PeixesService.altera(req.body, req.params.id);
    res.json({peixe: peixe});
  } catch(e){
    res.status(400).json({mensagem: "Falha ao salvar o peixe"});
  }
})

/* GET home page. */
router.get('/install', async function(req, res, next) {
  await sequelize.sync({force: true});

  res.json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;
