const {PeixesModel} = require('./bd');

module.exports = {
    novo: async (peixe) => {
        return await PeixesModel.create(peixe);
    },

    altera: async (peixe, id) => {
        return await PeixesModel.update(peixe, {where: {id: id}});
    },

    lista: async () => {
        return await PeixesModel.findAll();
    },

    listaPorLocal: async(local) => {
        return await PeixesModel.findAll({where: {local: local}});
    },

    buscaPorID: async (id) => {
        return await PeixesModel.findByPk(id);
    },

    deleta: async(id) => {
        return await PeixesModel.drop(id);
    }
};