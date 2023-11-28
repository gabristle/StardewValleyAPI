module.exports = {
    isAdmin: (req, res, next) => {
        const user = req.user;
        if(user.isAdmin){
            next();
        }else{
            res.status(400).json({mensagem: 'Acesso negado! Voce nao tem permissao para relizar essa acao.'})
        }
    }
};