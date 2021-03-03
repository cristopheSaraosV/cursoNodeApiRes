
const { Router } = require('express');
const { check } = require('express-validator');
const { validateData }  = require('../middlewares/validate')
const { esRoleValido, emailExiste,userExistForId }  = require('../helpers/db-validator')

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(userExistForId),
    validateData
], usuariosPut );

router.post('/', [
    check('nombre','El correo no es válido').not().isEmpty(),
    check('password','El password debe ser mayor a 6 digitos o caracteres').isLength({ min: 6 }),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    validateData
],usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;