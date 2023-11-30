const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});//obj de conexao

const PeixeModel = sequelize.define('Peixe', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    xp: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const EstacaoModel = sequelize.define('Estacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eventos: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const NPCModel = sequelize.define('NPC', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

PeixeModel.belongsTo(EstacaoModel);
NPCModel.belongsTo(EstacaoModel);

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = {
    sequelize: sequelize,
    PeixeModel: PeixeModel,
    UserModel: UserModel,
    EstacaoModel: EstacaoModel,
    NPCModel: NPCModel
};