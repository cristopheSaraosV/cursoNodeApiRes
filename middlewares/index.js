const validateData  = require('./validate')
const validarJWT    = require('./validar-jwt');
const validarRole   = require('./validar-role');

module.exports ={
    ...validateData,
    ...validarJWT,
    ...validarRole,
}

