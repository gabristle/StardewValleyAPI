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
    res.status(400).json({mensagem: 'Falha ao listar os NPCs! O limite deve ser 5, 10 ou 30'});
  }else{
    const NPCs = await NPCService.listaNPC(pagina, limite);
    res.status(200).json({lista: NPCs});
  }
});

//listar um NPC por ID
router.get('/:id', async (req, res) => {
  try{
    res.status(200).json({NPC: await NPCService.buscaPorID(req.params.id)});
    } catch(e){
    res.status(400).json({mensagem: 'Falha ao listar o NPC!'});
  }
});

//inserir novo NPC
router.post('/', Auth.validaAcesso, Validadores.validaNPC, async(req, res) => {
  try{
    let NPC = await NPCService.addNPC(req.body);
    res.status(200).json({NPC: NPC});
  } catch(e){
    res.status(400).json({mensagem: 'Falha ao adicionar o NPC!'});
  }
});

//alterar um NPC
router.put('/:id', Auth.validaAcesso, Validadores.validaNPC, async (req, res) =>{
  try{
    let NPC = await NPCService.alteraNPC(req.params.id, req.body);
    res.status(200).json({NPC: NPC});
  } catch(e){
    res.status(400).json({mensagem: 'Falha ao alterar o NPC!'});
  }
});
  
//excluir um NPC
router.delete('/:id', Auth.validaAcesso, async(req, res) =>{
  try{
    res.status(200).json({NPC: await NPCService.deleta(req.params.id)});
  }catch(e){
    res.status(400).json({mensagem: 'Falha ao excluir o NPC'});
  }
});

router.get('/install', async function(req, res, next) {
  await sequelize.sync({force: true});
  res.status(200).json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;