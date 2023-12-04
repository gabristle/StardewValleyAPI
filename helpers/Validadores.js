const UserService = require('../model/Usuario');
const EstacaoService = require('../model/Estacao');
const NPCService = require('../model/NPC');
const PeixeService = require('../model/Peixe');

module.exports = {
    validaCadastro: async (req, res, next) => {
        const {nome, email, usuario, senha} = req.body;
        if(email){
            const userEmail = await UserService.buscaPorEmail(email);
            if(userEmail){
                return res.status(400).json({mensagem: 'Usuario com esse email já existe! Tente novamente com outro.'});
            }
        }
        if(!email){
            return res.status(400).json({mensagem: 'Email não fornecido! Tente novamente com um email válido.'});
        }
        if(!email.includes('@') || !email.includes('.')){
            return res.status(400).json({mensagem: 'Email inválido! Tente novamente com um endereço de email válido.'});
        }
        if(!nome){
            return res.status(400).json({mensagem: 'O nome não foi informado! Insira um nome válido.'});
        }
        if(nome.length < 3){
            return res.status(400).json(({mensagem: 'Nome inválido! Precisa ter pelo menos 3 caracteres.'}));
        }
        if(usuario){
            const usuarioBusca = await UserService.buscaPorUser(usuario);
            if(usuarioBusca){
                return res.status(400).json({mensagem: 'O nome de usuario informado já existe! Digite outro.'});
            }
        }
        if(!usuario){
            return res.status(400).json({mensagem: 'Nome de usuário não informado! Insira um nome de usuario válido.'});
        }
        if(usuario.length < 5){
            return res.status(400).json({mensagem: 'Nome de usuario inválido! Precisa ter pelo menos 5 caracteres.'});
        }
        if(!senha){
            return res.status(400).json({mensagem: 'Senha não informada! Insira uma senha válida!.'});
        }
        if(senha.length < 8){
            return res.status(400).json({mensagem: 'Senha inválida! A senha precisa ter pelo menos 8 caracteres.'});
        }

        let maiuscula = false;
        let numero = false;
        let caractere = false;

        for(let i = 0; i < senha.length; i++){
            if(senha[i] >= 'A' && senha[i] <= 'Z'){
                maiuscula = true;
            } else if(senha[i] >= '0' && senha[i] <= '9'){
                numero = true;
            }else if('!@#$%&'.includes(senha[i])){
                caractere = true;
            }
        }
        
        if (!(maiuscula && numero && caractere)) {
            return res.status(400).json({mensagem: 'Senha inválida! A senha deve conter pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.'});
        }

        next();
    },

    validaAlteracao: async (req, res, next) => {
        const {nome, email, usuario, senha} = req.body;
        let maiuscula = false;
        let numero = false;
        let caractere = false;

        if(nome < 3){
            return res.status(400).json(({mensagem: 'Nome inválido! Precisa ter pelo menos 3 caracteres.'}));
        }
        if(senha.length < 8){
            return res.status(400).json({mensagem: 'Senha inválida! A senha precisa ter pelo menos 8 caracteres.'});
        }
        for(let i = 0; i < senha.length; i++){
            if(senha[i] >= 'A' && senha[i] <= 'Z'){
                maiuscula = true;
            } else if(senha[i] >= '0' && senha[i] <= '9'){
                numero = true;
            }else if('!@#$%&'.includes(senha[i])){
                caractere = true;
            }
        }
        if (!(maiuscula && numero && caractere)) {
            return res.status(400).json({mensagem: 'Senha inválida! A senha deve conter pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.'});
        }
        if(!email.includes('@') || !email.includes('.')){
            return res.status(400).json({mensagem: 'Email inválido! Tente novamente com um endereço de email válido.'});
        }
        if (email != req.user.email) {
            const emailExiste = await UserService.buscaPorEmail(email);
            if (emailExiste) {
                return res.status(400).json({mensagem: 'E-mail já cadastrado por outro usuário.' });
            }
        }
        if(usuario.length < 5){
            return res.status(400).json({mensagem: 'Nome de usuario inválido! Precisa ter pelo menos 5 caracteres.'});
        }
        if (usuario != req.user.usuario) {
            const usuarioExiste = await UserService.buscaPorUser(usuario);
            if (usuarioExiste) {
                return res.status(400).json({mensagem: 'Nome de usuário já cadastrado por outro usuário.' });
            }
        }

        next();
    },

    validaEstacao: (req, res, next) => {
        const {nome, evento, minigame} = req.body;
        if(!nome){
            res.status(400).json({mensagem: 'A estação precisa ter um nome! Digite um nome.'});
        }
        let buscaNome = EstacaoService.buscaNome(nome);
        if(buscaNome){
            res.status(400).json({mensagem: 'Uma estação com esse nome já existe! Digite outro.'});
        }
        if(nome.length <= 2 || nome.length >= 16){
            res.status(400).json({mensagem: 'Tamanho do nome inválido! Digite um nome entre 3 e 15 caracteres.'});
        }
        if(!evento){
            res.status(400).json({mensagem: 'A estação precisa ter um evento! Digite um evento.'});
        }
        if(evento.length <= 4 || evento.length >= 26){
            res.status(400).json({mensagem: 'Tamanho do evento inválido! Digite um evento entre 5 e 25 caracteres.'});
        }
        if(!minigame){
            res.status(400).json({mensagem: 'A estação precisa ter um minigame! Digite um minigame.'});
        }
        if(minigame.length <= 4 || minigame.length >= 26){
            res.status(400).json({mensagem: 'Tamanho do minigame inválido! Digite um minigame entre 5 e 25 caracteres.'});
        }
        next();
    },

    validaPeixe: (req, res, next) => {
        const {nome, local, xp, EstacaoId} = req.body;
        if(!nome){
            res.status(400).json({mensagem: 'O peixe precisa ter um nome! Digite um nome.'});
        }
        let buscaNome = PeixeService.buscaNome(nome);
        if(buscaNome){
            res.status(400).json({mensagem: 'Um peixe com esse nome já existe! Digite outro.'});
        }
        if(nome.length <= 2 || nome.length >= 16){
            res.status(400).json({mensagem: 'Tamanho do nome inválido! Digite um nome entre 3 e 15 caracteres.'});
        }
        if(!local){
            res.status(400).json({mensagem: 'O peixe precisa ter um local! Digite um local.'});
        }
        if(local.length <= 4 || local.length >= 26){
            res.status(400).json({mensagem: 'Tamanho do local inválido! Digite um local entre 5 e 25 caracteres.'});
        }
        if(!xp){
            res.status(400).json({mensagem: 'O peixe precisa ter xp! Digite uma quantidade de xp.'});
        }
        if(xp <= 0 || xp >= 101){
            res.status(400).json({mensagem: 'Quantidade de xp inválida! Digite uma quantidade de xp entre 1 e 100 caracteres.'});
        }
        if(!EstacaoId){
            res.status(400).json({mensagem: 'É necessário que o peixe faça parte de uma estação! Digite um id de estação válido.'});
        }
        const estacao = EstacaoService.buscaPorID(EstacaoId);
        if(!estacao){
            res.status(400).json({mensagem: 'ID da estação inválida! Digite um ID válido.'});
        }
        next();
    },

    validaNPC: (req, res, next) => {
        const {nome, diaAniversario, EstacaoId} = req.body;
        if(!nome){
            res.status(400).json({mensagem: 'O NPC precisa ter um nome! Digite um nome.'});
        }
        let buscaNome = NPCService.buscaNome(nome);
        if(buscaNome){
            res.status(400).json({mensagem: 'Um NPC com esse nome já existe! Digite outro.'});
        }
        if(nome.length <= 2 || nome.length >= 21){
            res.status(400).json({mensagem: 'Tamanho do nome inválido! Digite um nome entre 3 e 20 caracteres.'});
        }
        if(!diaAniversario){
            res.status(400).json({mensagem: 'O NPC precisa ter um dia de aniversario! Digite um dia válido.'});
        }
        if(diaAniversario <= 0 || diaAniversario >= 29){
            res.statis(400).json({mensagem: 'O dia de aniversário digitado é inválido! Digite um dia entre 1 e 28'});
        }
        if(!EstacaoId){
            res.status(400).json({mensagem: 'É necessário que o NPC faça aniversário em uma estação! Digite um id de estação válido.'});
        }
        const estacao = EstacaoService.buscaPorID(EstacaoId);
        if(!estacao){
            res.status(400).json({mensagem: 'ID da estação inválida! Digite um ID válido.'});
        }
        next();
    }
};