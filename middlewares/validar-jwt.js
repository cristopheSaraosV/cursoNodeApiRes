const { request, response } = require('express');
const Usuario   = require('../models/usuario');
const jwt 		= require('jsonwebtoken');



const validarJWT = async (req = request, res = response, next) => {

	const token = req.header('x-token')
	if (!token) {
		return res.status(401).json({ msg: "No hay token en la petición" })
	}

	try {

		const { uid } = jwt.verify( token, process.env.SECRETPRIVATEKEY);
		const usuarioAutenticado = await Usuario.findById(uid).exec();

		req.usuarioAutenticado = usuarioAutenticado

		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			msg:"Token no válido"
		})
	}
}


module.exports = {
	validarJWT
}