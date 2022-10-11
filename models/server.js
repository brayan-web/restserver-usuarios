const  express = require("express");
const cors = require("cors");
class server{
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }
    middlewares(){
        //Cors
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }
    liste(){
        this.app.listen( this.port, () =>{
            console.log("Puerto corriendo en " , this.port)
        })
    }
}

module.exports = server