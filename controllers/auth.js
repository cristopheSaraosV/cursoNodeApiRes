const { response, request} 	= require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../middlewares/generar.jwt');

const login = async ( req = request, res = response) =>{

	const { correo, password } = req.body;

	try {

		const usuario = await Usuario.findOne({correo});
		if( !usuario ) { return res.status(400).json( { msg:"Usuario / Password no son correcto" } )};

		const valiPassword = bcryptjs.compareSync(password,usuario.password);
		if( !valiPassword ) { return res.status(400).json( { msg:"Usuario / Password no son correcto" } )};

		const token = await generarJWT( usuario.id );


		res.json({
			msg: "Login ok",
			token
		})
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			msg: "Contacte al administrador"
		})
	}
		

    
}


module.exports = {login}