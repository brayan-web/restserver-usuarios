const {check} = require("express-validator");
const { Router } = require('express');
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators')
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios')

router.get('/', usuariosGet );
router.put('/:id', [
    check('id', 'No es Id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),

    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de tener mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo', ).custom(existeEmail),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);
router.delete('/:id',[
    check('id', 'No es Id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
], usuariosDelete);

module.exports = router;