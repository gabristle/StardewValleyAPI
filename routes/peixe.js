var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const PeixeService = require('../model/Peixe');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');

//listar os peixes
router.get('/:pagina/:limite', async (req, res) => {
  const pagina = parseInt(req.params.pagina);
  const limite = parseInt(req.params.limite);
  if(!limites.includes(limite)){
    res.status(400).json({mensagem: "Falha ao listar peixes"});
  }else{
      const peixes = await PeixeService.listaPeixe(pagina, limite);
      res.json({ lista: peixes});
  }
});

//listar por local
router.get('/:local', async (req,res) => {
  try{
    res.json({lista: await PeixeService.listaPorLocal(req.params.local)});
  } catch(e){
    res.status(400).json({mensagem: "Falha ao listar peixes do local"});
  }
});

//listar um peixe por ID
router.get('/:id', async (req, res) => {
  try{
    res.json({peixe: await PeixeService.buscaPorID(req.params.id)});
  } catch(e){
    res.status(400).json({mensagem: "Falha ao listar peixe"});
  }
});

//inserir novo peixe
router.post('/', Auth.validaAcesso, async(req, res) => {
  try{
    let peixe = await PeixeService.addPeixe(req.body);
    res.json({peixe: peixe});
  } catch(e){
    res.status(400).json({mensagem: "Falha ao salvar o peixe"});
  }
});

//alterar um peixe
router.put('/:id', Auth.validaAcesso, async (req, res) =>{
  try{
    let peixe = await PeixeService.alteraPeixe(req.params.id, req.body);
    res.json({peixe: peixe});
  } catch(e){
    res.status(400).json({mensagem: "Falha ao alterar o peixe"});
  }
});

router.delete('/:id', Auth.validaAcesso, async(req, res) =>{
  res.json({peixe: await PeixeService.deleta(req.params.id)});
});

/* GET home page. */
router.get('/install', async function(req, res, next) {
  await sequelize.sync({force: true});
  res.json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;