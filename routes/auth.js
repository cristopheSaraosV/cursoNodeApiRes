const { check } = require('express-validator');
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { validateData } = require('../middlewares/validate');

const authRouter = Router();

authRouter.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El contraseña es obligatorio').not().isEmpty(),
    validateData
],login )

module.exports= authRouter;