var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const NPCService = require('../model/NPC');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');
const Validadores = require('../helpers/Validadores');

//listar os NPCS
router.get('/:pagina/:limite', async (req, res) => {
  const pagina = parseInt(req.params.pagina);
  const limite = parseInt(req.params.limite);
  if(!limites.includes(limite)){
    return res.status(400).json({mensagem: 'Falha ao listar os NPCs! O limite deve ser 5, 10 ou 30'});
  }else{
    const NPCs = await NPCService.listaNPC(pagina, limite);
    return res.status(200).json({lista: NPCs});
  }
});

//listar os NPCS por estação
router.get('/:estacao/:pagina/:limite', async (req, res) => {
  const pagina = parseInt(req.params.pagina);
  const limite = parseInt(req.params.limite);
  const estacao = parseInt(req.params.estacao);
  if(!limites.includes(limite)){
    return res.status(400).json({mensagem: 'Falha ao listar os NPCs! O limite deve ser 5, 10 ou 30'});
  }else{
    const NPCs = await NPCService.listaPorEstacao(estacao, pagina, limite);
    return res.status(200).json({lista: NPCs});
  }
});

//listar um NPC por ID
router.get('/:id', async (req, res) => {
  try{
    return res.status(200).json({NPC: await NPCService.buscaPorID(req.params.id)});
    } catch(e){
    return res.status(400).json({mensagem: 'Falha ao listar o NPC!'});
  }
});

//inserir novo NPC
router.post('/', Auth.validaAcesso, Validadores.validaNPC, async(req, res) => {
  try{
    let NPC = await NPCService.addNPC(req.body);
    return res.status(200).json({NPC: NPC});
  } catch(e){
    return res.status(400).json({mensagem: 'Falha ao adicionar o NPC!'});
  }
});

//alterar um NPC
router.put('/:id', Auth.validaAcesso, Validadores.validaNPC, async (req, res) =>{
  try{
    let NPC = await NPCService.alteraNPC(req.params.id, req.body);
    return res.status(200).json({NPC: NPC});
  } catch(e){
    return res.status(400).json({mensagem: 'Falha ao alterar o NPC!'});
  }
});
  
//excluir um NPC
router.delete('/:id', Auth.validaAcesso, async(req, res) =>{
  try{
    return res.status(200).json({NPC: await NPCService.deleta(req.params.id)});
  }catch(e){
    return res.status(400).json({mensagem: 'Falha ao excluir o NPC'});
  }
});

module.exports = router;