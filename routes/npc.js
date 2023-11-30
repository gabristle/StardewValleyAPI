var express = require('express');
var router = express.Router();
const {sequelize} = require('../model/bd');
const NPCService = require('../model/NPC');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');

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

router.get('/:id', async (req, res) => {
    try{
      res.json({NPC: await NPCService.buscaPorID(req.params.id)});
    } catch(e){
      res.status(400).json({mensagem: "Falha ao listar NPC"});
    }
});

router.post('/', Auth.validaAcesso, async(req, res) => {
    try{
      let NPC = await NPCService.addNPC(req.body);
      res.json({NPC: NPC});
    } catch(e){
      res.status(400).json({mensagem: "Falha ao salvar o NPC"});
    }
});

router.put('/:id', Auth.validaAcesso, async (req, res) =>{
    try{
      let NPC = await NPCService.alteraNPC(req.params.id, req.body);
      res.json({NPC: NPC});
    } catch(e){
      res.status(400).json({mensagem: "Falha ao alterar o NPC"});
    }
  });
  
router.delete('/:id', Auth.validaAcesso, async(req, res) =>{
    res.json({NPC: await NPCService.deleta(req.params.id)});
});

module.exports = router;