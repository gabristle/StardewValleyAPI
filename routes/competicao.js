var express = require('express');
var router = express.Router();
const {sequelize, CompetidorPeixe, CompeticaoModel} = require('../model/bd');
const CompeticaoService = require('../model/Competicao');
const limites = [5, 10, 30];
const Auth = require('../helpers/Auth');
const Validadores = require('../helpers/Validadores');

//lista todos os participantes da competição
router.get('/participantes/:id/:pagina/:limite', async (req,res) => {
    try{
        let competidores = await CompeticaoService.listaCompetidores(req.params.id, req.params.pagina, req.params.limite);
        return res.status(200).json({lista: competidores});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao listar participantes'});
    }
});

router.get('/estatisticas/:id', async(req,res) => {
    try {
        const { idCompeticao } = req.params;
    
        // Consulta para encontrar competição específica com todos os participantes
        const competicao = await CompeticaoModel.findOne({
          where: { id: idCompeticao },
          include: [
            {
              model: CompetidorPeixe,
              include: [
                { model: NPCModel },
                { model: PeixeModel }
              ]
            }
          ]
        });
    
        if (!competicao) {
          return res.status(404).json({ mensagem: 'Competição não encontrada' });
        }
    
        // Calcular estatísticas
        const totalPeixesPescados = competicao.CompetidorPeixes.reduce((total, competidorPeixe) => total + competidorPeixe.quantidade, 0);
    
        const competidorMaisPeixes = competicao.CompetidorPeixes.reduce((maior, competidorPeixe) => {
          return competidorPeixe.quantidade > maior.quantidade ? competidorPeixe : maior;
        }, { quantidade: 0 });
    
        const peixeMaisPescado = competicao.CompetidorPeixes.reduce((maisPescado, competidorPeixe) => {
          return competidorPeixe.Peixe && competidorPeixe.quantidade > maisPescado.quantidade ? competidorPeixe : maisPescado;
        }, { quantidade: 0 });
    
        const localMaisPeixes = competicao.CompetidorPeixes.reduce((maisPeixes, competidorPeixe) => {
          return competidorPeixe.NPC && competidorPeixe.quantidade > maisPeixes.quantidade ? competidorPeixe : maisPeixes;
        }, { quantidade: 0 });
    
        // Retornar estatísticas
        res.json({
          totalPeixesPescados,
          competidorMaisPeixes: {
            competidor: competidorMaisPeixes.Competidor,
            quantidade: competidorMaisPeixes.quantidade
          },
          peixeMaisPescado: {
            peixe: peixeMaisPescado.Peixe,
            quantidade: peixeMaisPescado.quantidade
          },
          localMaisPeixes: {
            local: localMaisPeixes.NPC,
            quantidade: localMaisPeixes.quantidade
          }
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
      }
});

//adiciona uma pesca
router.put('/pesca/:id', Auth.validaAcesso, Validadores.validaCompetidor, async(req, res) => {
    try{
        let competidor = await CompeticaoService.addPesca(req.params.id, req.body);
        return res.status(200).json({competidor: competidor});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao adicionar novos peixes!'});
    }
});

//adiciona uma competição
router.post('/competicao', Auth.validaAcesso, Validadores.validaCompeticao, async(req, res) => {
    try{
        let competicao = await CompeticaoService.addCompeticao(req.body);
        return res.status(200).json({competicao: competicao});
    }catch(e){
        return res.status(400).json({mensagem: 'Falha ao adicionar Competição!'});
    }
});

//adiciona um competidor
router.post('/competidor', Auth.validaAcesso, Validadores.validaCompetidor,async(req, res) => {
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