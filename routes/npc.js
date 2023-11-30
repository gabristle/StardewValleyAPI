var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const NPCService = require('../model/NPC');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');

//listar os NPCS
router.get('/:pagina/:limite', async (req, res) => {
    const pagina = parseInt(req.params.pagina);
    const limite = parseInt(req.params.limite);
    if(!limites.includes(limite)){
        res.status(400).json({mensagem: "Falha ao listar NPCs"});
    }else{
        const NPCs = await NPCService.listaNPC(pagina, limite);
        res.json({ lista: NPCs});
    }
});

//listar um NPC por ID
router.get('/:id', async (req, res) => {
    try{
      res.json({NPC: await NPCService.buscaPorID(req.params.id)});
    } catch(e){
      res.status(400).json({mensagem: "Falha ao listar NPC"});
    }
});

//inserir novo NPC
router.post('/', Auth.validaAcesso, async(req, res) => {
    try{
      let NPC = await NPCService.addNPC(req.body);
      res.json({NPC: NPC});
    } catch(e){
      res.status(400).json({mensagem: "Falha ao salvar o NPC"});
    }
});

//alterar um NPC
router.put('/:id', Auth.validaAcesso, async (req, res) =>{
    try{
      let NPC = await NPCService.alteraNPC(req.params.id, req.body);
      res.json({NPC: NPC});
    } catch(e){
      res.status(400).json({mensagem: "Falha ao alterar o NPC"});
    }
});
  
//excluir um NPC
router.delete('/:id', Auth.validaAcesso, async(req, res) =>{
    res.json({NPC: await NPCService.deleta(req.params.id)});
});

router.get('/install', async function(req, res, next) {
  await sequelize.sync({force: true});
  res.json({mensagem: 'Instalado com sucesso!'});
});

module.exports = router;