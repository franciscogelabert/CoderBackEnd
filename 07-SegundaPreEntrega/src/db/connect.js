import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtiene la cadena de conexión de MongoDB desde la variable de entorno
const URI = process.env.MONGODB_URI;


mongoose.connect(URI, {});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conectado a la base de datos');
});

export { mongoose, db };