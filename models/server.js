const express           = require('express');
const cors              = require('cors');
const { dbConnection }   = require('../database/config')
const { authRouter, usuariosRouter } = require('../routes/index')
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath   = '/api/usuarios';
        this.authPath       = '/api/auth';


        // Conectar a base de datos
        this.conectarDB()
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB(){

        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.authPath,authRouter );
        this.app.use( this.usuariosPath, usuariosRouter );
    }

    listen() {
        this.app.listen( process.env.PORT || this.port   , () => {
            console.log('Servidor corriendo en puerto', process.env.PORT || this.port );
        });
    }

}




module.exports = Server;
