import mongoose from "mongoose";
import {config} from "../config/config.js";

let conexion="";

switch (config.persistence.type) {
    case "MONGO":
        mongoose.connect(config.mongo.URI, {});

        conexion = mongoose.connection;

        conexion.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
        conexion.once('open', () => {
            console.log('Conectado a la base de datos');
        });

        break;

    case "MEMORY":
        conexion = "Para futuro desarrollo - se crea a los fines de probar el Factory";
        console.log(conexion);
        break;
}

export { conexion };