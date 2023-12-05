const {CompeticaoModel} = require('./bd');
const {CompetidorPeixe} = require('./bd');

module.exports = {
    addCompeticao: async(compData) => {
        return await CompeticaoModel.create(compData);
    },

    addCompetidor: async(compData) => {
        return await CompetidorPeixe.create(compData);
    },

    listaCompetidores: async(id, pagina, limite) => {
        const competidores = await CompeticaoModel.findOne({
            where: { id: id },
            include: [
              {
                model: CompetidorPeixe,
                include: [
                  { model: NPCModel },
                  { model: PeixeModel }
                ]
              }
            ],
            offset: (pagina - 1) * limite,
            limit: limite
        });
        return competidores;
    },

    buscaCompeticao: async(id) => {
        return await CompeticaoModel.findByPk(id);
    },

    addPesca: async(npc, peixes) => {
        const competidor = await CompetidorPeixe.findOne({where: {NPCId: npc}});
        return await competidor.update({ peixes: peixes });
    },

    excluiCompeticao: async(id) => {
        return await CompeticaoModel.destroy({where: {id: id}});
    },

    excluiCompetidor: async(id) => {
        return await CompetidorPeixe.destroy({where: {id: id}});
    }
};