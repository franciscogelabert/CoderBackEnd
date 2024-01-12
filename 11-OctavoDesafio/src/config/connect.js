import mongoose from 'mongoose';
import { config } from './config.js';


// Obtiene la cadena de conexión de MongoDB desde la variable de entorno
//const URI = process.env.MONGODB_URI;


mongoose.connect(config.mongo.URI, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conectado a la base de datos');
});

export { mongoose, db };