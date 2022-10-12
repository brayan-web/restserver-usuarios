const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: 'string',
        required:[true, 'El nombre es obligatorio']
    },
    correo: {
        type: 'string',
        required:[true, 'El corre es obligatorio'],
        unique: true
    },
    password: {
        type: 'string',
        required:[true, 'La contraseña es obligatoria']
    },
    imagen: {
        type: 'string',
    },
    rol: {
        type: 'string',
        required: true,
        //enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);
