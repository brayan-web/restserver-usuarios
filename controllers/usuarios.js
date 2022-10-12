
    const { response } = require('express');
    const Usuario = require('../models/usuario');
    const bcryptjs = require('bcryptjs');


    const usuariosGet = async(req, res = response) => {

        const { limite = 5, desde = 0} = req.query;
       /* const usuarios = await Usuario.find({
            estado: true
        }).skip(Number(desde)).limit(Number(limite));
        const total = await Usuario.countDocuments({
            estado: true
        });*/

        const [ total, usuarios ] = await Promise.all([
             Usuario.countDocuments({
                estado: true
            }),
            Usuario.find({
                estado: true
            }).skip(Number(desde)).limit(Number(limite))
        ]);

        res.json({
            total,
            usuarios
        });
    }

    const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const {_id, password, google, correo, ...resto } = req.body;
    if(password){
        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id , resto)
        res.json({
            msg: 'Api - Put',
            usuario
        });
    }

    const usuariosPost = async(req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);


    //Guardar en la BD
   await usuario.save();
        res.json({
            usuario
        });
    }

    const usuariosDelete = async(req, res) => {
        const { id } = req.params;

        //Fisicamnete lo borramos
            //const usuario = await Usuario.findByIdAndDelete(id);

        const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})


        res.json({
            usuario
        });
    }


    module.exports = {
        usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete
    }