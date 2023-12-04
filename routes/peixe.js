var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const PeixeService = require('../model/Peixe');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');
const Validadores = require('../helpers/Validadores');

//listar os peixes
router.get('/:pagina/:limite', async (req, res) => {
  const pagina = parseInt(req.params.pagina);
  const limite = parseInt(req.params.limite);
  if(!limites.includes(limite)){
    return res.status(400).json({mensagem: 'Falha ao listar peixes'});
  }else{
    const peixes = await PeixeService.listaPeixe(pagina, limite);
    return res.status(200).json({lista: peixes});
  }
});

//listar por estacao
router.get('/:estacao/:pagina/:limite', async (req,res) => {
  const pagina = parseInt(req.params.pagina);
  const limite = parseInt(req.params.limite);
  const estacao = parseInt(req.params.estacao);
  try{
    if(!limites.includes(limite)){
      return res.status(400).json({mensagem: 'Falha ao listar peixes'});
    }else{
      return res.status(200).json({lista: await PeixeService.listaPorEstacao(estacao , pagina, limite)});
    }
  }catch(e){
    return res.status(400).json({mensagem: 'Falha ao listar peixes da estação'});
  }
});

//listar um peixe por ID
router.get('/:id', async (req, res) => {
  try{
    return res.status(200).json({peixe: await PeixeService.buscaPorID(req.params.id)});
  } catch(e){
    return res.status(400).json({mensagem: 'Falha ao listar peixe!'});
  }
});

//inserir novo peixe
router.post('/', Auth.validaAcesso, Validadores.validaPeixe, async(req, res) => {
  try{
    let peixe = await PeixeService.addPeixe(req.body);
    return res.status(200).json({peixe: peixe});
  } catch(e){
    return res.status(400).json({mensagem: 'Falha ao adicionar o peixe!'});
  }
});

//alterar um peixe
router.put('/:id', Auth.validaAcesso, Validadores.validaPeixe, async (req, res) => {
  try{
    let peixe = await PeixeService.alteraPeixe(req.params.id, req.body);
    return res.status(200).json({peixe: peixe});
  } catch(e){
    return res.status(400).json({mensagem: 'Falha ao alterar o peixe!'});
  }
});

//excluir um peixe
router.delete('/:id', Auth.validaAcesso, async(req, res) => {
  try{
    return res.status(200).json({peixe: await PeixeService.deleta(req.params.id)});
  }catch(e){
    return res.status(400).json({mensagem: 'Falha ao deletar peixe!'});
  }
});

module.exports = router;