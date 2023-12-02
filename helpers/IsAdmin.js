const jwt = require('jsonwebtoken');
module.exports = {
    isAdmin: (req, res, next) => {
        const token = req.header('authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET);
        
        if (!decoded) {
            return res.status(400).json({msg: "Usuário não authenticado!"});
        }else{
            try{
                if(decoded.isAdmin){
                    next();
                }else{
                    res.status(400).json({msg :"Não é admin"});
                }
            } catch(e){
                console.log(e);
                res.status(400).json({msg :"Não é admin"});
            }
        }
    }
};