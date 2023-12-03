const UserService = require('../model/Usuario');
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
        if(usuario.length <= 5){
            return res.status(400).json({mensagem: 'Nome de usuario inválido! Precisa ter mais de 5 caracteres.'});
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
        if(nome < 3){
            return res.status(400).json(({mensagem: 'Nome inválido! Precisa ter pelo menos 3 caracteres.'}));
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

        if (email != req.user.email) {
            const emailExiste = await UserService.buscaPorEmail(email);
            if (emailExiste) {
                return res.status(400).json({mensagem: 'E-mail já cadastrado por outro usuário.' });
            }
        }
        if (usuario != req.user.usuario) {
            const usuarioExiste = await UserService.buscaPorUser(usuario);
            if (usuarioExiste) {
                return res.status(400).json({mensagem: 'Nome de usuário já cadastrado por outro usuário.' });
            }
        }

        next();
    }
};