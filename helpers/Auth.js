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

    isAdmin: async (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ mensagem: 'Token de autenticação ausente.' });
        }

        try {
            const decoded = jwt.verify(token, '123!@#');
            const user = await UserModel.findByPk(decoded.usuario);

            if (!user) {
                return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
            }

            // Adiciona informações do usuário, incluindo isAdmin, ao objeto de solicitação (req)
            req.usuario = {
                id: user.id,
                usuario: user.usuario,
                isAdmin: user.isAdmin,
            };

            // Verifica se o usuário é um administrador
            if (req.usuario.isAdmin) {
                next();
            } else {
                res.status(403).json({ mensagem: 'Acesso negado. Somente administradores podem realizar esta operação.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ mensagem: 'Token inválido.' });
        }
    }
};