
    const { response } = require('express')
    const usuariosGet = (req, res = response) => {
        res.json({
            msg: 'Api - Get'
        });
    }

    const usuariosPut = (req, res) => {
    const { id } = req.params;
        res.json({
            msg: 'Api - Put',
            id
        });
    }

    const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body;
        res.json({
            msg: 'Api - Post',
            nombre, edad
        });
    }

    const usuariosDelete = (req, res) => {
        res.json({
            msg: 'Api - Delete'
        });
    }


    module.exports = {
        usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete
    }