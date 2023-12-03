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
    res.status(400).json({mensagem: 'Falha ao listar peixes'});
  }else{
    const peixes = await PeixeService.listaPeixe(pagina, limite);
    res.status(200).json({lista: peixes});
  }
});

//listar por local
router.get('/:local', async (req,res) => {
  try{
    res.status(200).json({lista: await PeixeService.listaPorLocal(req.params.local)});
  } catch(e){
    res.status(400).json({mensagem: 'Falha ao listar peixes do local'});
  }
});

//listar por estacao
router.get('/:estacao', async (req,res) => {
  try{
    res.status(200).json({lista: await PeixeService.listaPorEstacao(req.params.estacao)});
  }catch(e){
    res.status(400).json({mensagem: 'Falha ao listar peixes da estação'});
  }
});

//listar um peixe por ID
router.get('/:id', async (req, res) => {
  try{
    res.status(200).json({peixe: await PeixeService.buscaPorID(req.params.id)});
  } catch(e){
    res.status(400).json({mensagem: 'Falha ao listar peixe!'});
  }
});

//inserir novo peixe
router.post('/', Auth.validaAcesso, async(req, res) => {
  try{
    let peixe = await PeixeService.addPeixe(req.body);
    res.status(200).json({peixe: peixe});
  } catch(e){
    res.status(400).json({mensagem: 'Falha ao adicionar o peixe!'});
  }
});

//alterar um peixe
router.put('/:id', Auth.validaAcesso, async (req, res) => {
  try{
    let peixe = await PeixeService.alteraPeixe(req.params.id, req.body);
    res.status(200).json({peixe: peixe});
  } catch(e){
    res.status(400).json({mensagem: 'Falha ao alterar o peixe!'});
  }
});

//excluir um peixe
router.delete('/:id', Auth.validaAcesso, async(req, res) => {
  try{
    res.status(200).json({peixe: await PeixeService.deleta(req.params.id)});
  }catch(e){
    res.status(400).json({mensagem: 'Falha ao deletar peixe!'});
  }
});

/* GET home page. */
router.get('/install', async function(req, res, next){
  await sequelize.sync({force: true});
  res.status(200).json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;