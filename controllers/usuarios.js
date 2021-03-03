const { response, request } = require('express');
const Usuario    = require('../models/usuario');
const bcryptjs   = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const usuarios = await Usuario.find()
        .skip( Number(desde) )
        .limit( Number(limite) );

    res.json(usuarios);
}

const usuariosPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol } );
    
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save()
    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id,password, google, correo, ...resto } = req.body

    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto )

    res.json( usuario );
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}