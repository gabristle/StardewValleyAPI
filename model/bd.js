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
    evento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    minigame: {
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
    },
    diaAniversario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vencedor: {
        type: DataTypes.INTEGER,
        allowNull: true
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
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
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

const CompeticaoModel = sequelize.define('Competicao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    participantes: {
        type: DataTypes.JSON,
        allowNull: false
    },
    vencedor: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

const CompetidorPeixe = sequelize.define('CompetidorPeixe', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});

CompeticaoModel.belongsTo(EstacaoModel);
NPCModel.belongsToMany(PeixeModel, { through: CompetidorPeixe });
PeixeModel.belongsToMany(NPCModel, { through: CompetidorPeixe });

module.exports = {
    sequelize: sequelize,
    PeixeModel: PeixeModel,
    UserModel: UserModel,
    EstacaoModel: EstacaoModel,
    NPCModel: NPCModel,
    CompeticaoModel: CompeticaoModel,
    CompetidorPeixe: CompetidorPeixe
};