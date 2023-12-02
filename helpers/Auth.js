const jwt = require('jsonwebtoken');
module.exports = {
    validaAcesso: (req, res, next) => {
        const token = req.header('authorization').replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({mensagem: 'Usuário não autenticado! Token inválido.'});
        }else{
            try{
                const decoded = jwt.verify(token, process.env.SECRET);
                req.user = decoded;
                next();
            }catch(e){
                res.status(400).json({mensagem: 'Usuário não autenticado!'});
            }
        }
    }
};