import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);


// Obtiene la cadena de conexión de JWT desde la variable de entorno
const PRIVATE_KEY = process.env.PRIVATE_KEY;  


export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1d' });
  return token;
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ status: 'error', error: 'Unauthorized - Token missing' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ status: 'error', error: 'Unauthorized - Token missing' });
  }

  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) {
      return res.status(401).send({ status: 'error', error: 'Unauthorized - Invalid token' });
    }

    req.user = credentials.user;
    next();
  });
};

export default __dirname;