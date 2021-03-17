
const { Router } = require('express');
const { check } = require('express-validator');

const { validateData, validarJWT, tieneRol } = require('../middlewares/index')

const { esRoleValido, emailExiste, userExistForId } = require('../helpers/db-validator')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const userRouter = Router();


userRouter.get('/', usuariosGet);

userRouter.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistForId),
    validateData
], usuariosPut);

userRouter.post('/', [
    check('nombre', 'El correo no es válido').not().isEmpty(),
    check('password', 'El password debe ser mayor a 6 digitos o caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validateData
], usuariosPost);

userRouter.delete('/:id', [
    validarJWT,
    tieneRol("ADMIN_ROLE"),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistForId),
    validateData
],
    usuariosDelete);

userRouter.patch('/', usuariosPatch);





module.exports = userRouter;