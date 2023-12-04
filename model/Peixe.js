const {PeixeModel} = require('./bd');

module.exports = {
    addPeixe: async(peixeData) =>{
        return await PeixeModel.create(peixeData);
    },

    alteraPeixe: async(id, peixeAlterado) => {
        return await PeixeModel.update(peixeAlterado, {where: {id: id}});
    },

    listaPeixe: async(pagina, limite) => {
        const offset = (pagina - 1) * limite;
        const peixes = await PeixeModel.findAll({
            limit: limite,
            offset: offset
        });
        return peixes;
    },

    listaPorLocal: async(local) => {
        return await PeixeModel.findAll({where: {local: local}});
    },

    listaPorEstacao: async(estacao) => {
        return await PeixeModel.findAll({where: {estacaoId: estacao}});
    },

    buscaPorID: async (id) => {
        return await PeixeModel.findByPk(id);
    },

    buscaNome: async (nome) => {
        return await PeixeModel.findOne({where: {nome: nome}});
    },

    deleta: async(id) => {
        return await PeixeModel.destroy({where: {id: id}});
    }
};