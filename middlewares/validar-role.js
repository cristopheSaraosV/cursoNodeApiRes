const { request, response } = require('express')

const esAdminRole = (req = request, res = response, next) => {


	if (!req.usuarioAutenticado) {
		return res.status(500).json({
			msg: "Se quiere verificar el role sin validar el token primero"
		})
	}

	const { rol, nombre } = req.usuarioAutenticado
	if (rol !== 'ADMIN_ROLE'){
		return res.status(500).json({
			msg:`${nombre} no es administrador - No puede ejecutar la accion`
		})
	}
	next();
}


const tieneRol = ( ...roles ) => {

		return (req = request, res = response, next) =>{

			if (!req.usuarioAutenticado) {
				return res.status(500).json({
					msg: "Se quiere verificar el role sin validar el token primero"
				})
			}
		
			if ( !roles.includes(req.usuarioAutenticado.rol) ){
				return res.status(401).json({
					msg: `El servicio requiere uno de estos roles ${roles}`
				})
			} 

			next();
		}

}

module.exports = {
	esAdminRole,
	tieneRol
}