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
        const offset = (pagina-1) * limite;
        const competidores = await CompetidorPeixe.findAll({
            where: {Competicaoid: id},
            limit: limite,
            offset: offset
        });
        return competidores;
    },

    addPesca: async(npc, peixes) => {
        const competidor = await CompetidorPeixe.findOne({where: {NpcId: npc}});
        return await competidor.update({ peixes: peixes });
    },

    excluiCompeticao: async(id) => {
        return await CompeticaoModel.destroy({where: {id: id}});
    },

    excluiCompetidor: async(id) => {
        return await CompetidorPeixe.destroy({where: {id: id}});
    }
};