const jwt = require('jsonwebtoken');
module.exports = {
    validaAcesso: (req, res, next) => {
        let bearToken = req.headers['authorization'] || "";
        let token = bearToken.split(" ");
        if(token[0] == 'Bearer'){
            token = token[1];
        }
        console.log(token);
        jwt.verify(token, '123!@#', (err, obj) => {
            if(err) res.status(400).json({mensagem: "Token invalido! Acesso negado."});
            else {
                req.usuario = obj.usuario;
                next();
            }
        });
    },

    /*isAdmin: (req, res, next) => {
        const user = req.usuario;
        if(user.isAdmin){
            next();
        }else{
            res.status(400).json({mensagem: 'Acesso negado! Voce nao tem permissao para relizar essa acao.'})
        }
    }*/
};