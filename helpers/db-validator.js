const Role = require('../models/role')
const Usuario = require('../models/usuario')


const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async ( correo = '') =>{
    const existeEmail = await Usuario.findOne({ correo})
    if( existeEmail ){
        throw new Error(`El email ${correo} ya esta registrado`);
    }
}


const userExistForId = async ( id ) => {
    const existUser = await Usuario.findById(id)    
    if( !existUser ){
        throw new Error(`El id ${id} no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    userExistForId
}