const {NPCModel} = require('./bd');

module.exports = {
    addNPC: async(NPCData) =>{
        return await NPCModel.create(NPCData);
    },

    alteraNPC: async(id, NPCAlterado) => {
        return await NPCModel.update(NPCAlterado, {where: {id: id}});
    },

    listaNPC: async(pagina, limite) => {
        const offset = (pagina - 1) * limite;
        const npcs = await NPCModel.findAll({
            limit: limite,
            offset: offset
        });
        return npcs;
    },

    buscaPorID: async (id) => {
        return await NPCModel.findByPk(id);
    },

    listaNPC: async(estacao, pagina, limite) => {
        const offset = (pagina - 1) * limite;
        const npcs = await PeixeModel.findAll({
            where: {EstacaoId: estacao},
            limit: limite,
            offset: offset
        });
        return npcs;
    },

    buscaNome: async(nome) => {
        return await NPCModel.findOne({where: {nome: nome}});
    },

    deleta: async(id) => {
        return await NPCModel.destroy({where: {id: id}});
    }
};