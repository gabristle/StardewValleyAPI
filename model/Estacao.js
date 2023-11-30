const {EstacaoModel} = require('./bd');

module.exports = {
    addEstacao: async(estacaoData) =>{
        return await EstacaoModel.create(estacaoData);
    },

    alteraEstacao: async(id, estacaoAlterada) => {
        return await EstacaoModel.update(estacaoAlterada, {where: {id: id}});
    },

    listaEstacao: async(pagina, limite) => {
        const offset = (pagina - 1) * limite;
        const estacoes = await EstacaoModel.findAll({
            limit: limite,
            offset: offset
        });
        return estacoes;
    },

    buscaPorID: async (id) => {
        return await EstacaoModel.findByPk(id);
    },

    deleta: async(id) => {
        return await EstacaoModel.destroy({where: {id: id}});
    }
};