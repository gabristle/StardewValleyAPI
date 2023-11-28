const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    let {usuario, senha} = req.body;
    if(usuario != "" && senha != ""){
        let token = jwt.sign({usuario: usuario}, '123!@#', {expiresIn: '10 min'});
        res.json({logged: true, token: token});
    }else{
        res.status(400).json({logged:false, mensagem: 'Usuario e senha invalidos'})
    }
});

module.exports = router;