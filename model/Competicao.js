const {CompeticaoModel} = require('./bd');
const {CompetidorPeixe} = require('./bd');
const {NPCModel} = require('./bd');
const {PeixeModel} = require('./bd');

module.exports = {
    addCompeticao: async(compData) => {
        return await CompeticaoModel.create(compData);
    },

    addCompetidor: async(compData) => {
        return await CompetidorPeixe.create(compData);
    },

    listaCompetidores: async(id) => {
        const competicao = await CompeticaoModel.findByPk(id, {
            include: [
                {
                    model: CompetidorPeixe,
                    include: [
                        { model: NPCModel },
                        { model: PeixeModel },
                    ],
                },
            ],
        });
    
        if (!competicao) {
            return [];
        }
    
        const competidores = competicao.CompetidorPeixes.map((competidorPeixe) => ({
            id: competidorPeixe.id,
            npc: competidorPeixe.NPC,
            peixe: competidorPeixe.Peixe,
        }));
    
        return competidores;
    },

    buscaCompeticao: async(id) => {
        return await CompeticaoModel.findByPk(id);
    },

    excluiCompeticao: async(id) => {
        return await CompeticaoModel.destroy({where: {id: id}});
    },

    excluiCompetidor: async(id) => {
        return await CompetidorPeixe.destroy({where: {id: id}});
    }
};