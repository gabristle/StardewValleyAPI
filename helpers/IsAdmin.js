const jwt = require('jsonwebtoken');
module.exports = {
    isAdmin: (req, res, next) => {
        const token = req.header('authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);
        
        if (!decoded) {
            return res.status(400).json({mensagem: "Usuário não autenticado! Token inválido."});
        }else{
            try{
                if(decoded.isAdmin){
                    req.user = decoded;
                    next();
                }else{
                    res.status(400).json({mensagem:'Você não tem permissão para acessar essa rota.'});
                }
            } catch(e){
                console.log(e);
                res.status(400).json({mensagem:'Você não tem permissão para acessar essa rota.'});
            }
        }
    }
};