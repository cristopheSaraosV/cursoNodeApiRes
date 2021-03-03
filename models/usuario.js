const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type     : String,
        required : [true, 'El nombre es obligatorio']
    },
    correo: {
        type     : String,
        required : [true,'El correo es obligario'],
        unique   : true
    },
    password: {
        type     : String,
        required : [true,'El contraseña es obligario'],
    },  
    rol: {
        type     : String,
        required : true,
        enum     : ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type     : Boolean,
        default  : true
    },
    google: {
        type     : Boolean,
        default  : false
    },
    img: {
        type     : String,
    }
}) 


UsuarioSchema.methods.toJSON = function(){
    const { __v,password,...usuario } = this.toObject();
    return usuario;
}


module.exports = model('Usuario',UsuarioSchema );