const {UserModel} = require('./bd');

module.exports = {
    addUser: async(userData) =>{
        const user = await UserModel.create(userData);
        if (userData.isAdmin || (await UserModel.count()) === 1) {
            await user.update({ isAdmin: true });
        }
        return user;
    },

    alteraUser: async(id, userAlterado) => {
        return await UserModel.update(userAlterado, {where: {id: id}});
    },

    listaUser: async(pagina, limite) => {
        const offset = (pagina - 1) * limite;
        const users = await UserModel.findAll({
            limit: limite,
            offset: offset
        });
        return users;
    },
    
    buscaPorID: async (id) => {
        return await UserModel.findByPk(id);
    },

    deleta: async(id) => {
        return await UserModel.destroy({where: {id: id}});
    },

    tornarAdmin: async(id) => {
        const user = UserModel.findByPk(id);
        user.isAdmin = true;
        await user.save();
        return user;
    }
    
};