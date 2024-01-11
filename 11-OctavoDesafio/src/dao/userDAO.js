import { userModel } from '../models/index.js';
import { createHash, isValidPassword } from '../utils.js';
import dotenv from 'dotenv';

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtiene la cadena de conexión de MongoDB desde la variable de entorno
const usuario = process.env.ADMIN_EMAIL;
const pass = process.env.ADMIN_PASSWORD;

class userDAO {
    constructor() { }

    async registerUser(name, lastName, age, email, password) {
        try {
            const rol = (email === usuario && password === pass) ? 'admin' : 'usuario';

            if (!name || !lastName || !email || !password) {
                throw new Error('Incomplete values');
            }

            const user = new userModel({ name, lastName, age, email, password: createHash(password), rol });

            await user.save();

            delete user.password;

            return user;
        } catch (error) {
            throw error;
        }
    }

    async loginUser(email, password) {
        try {
            console.log("loginUser---->",email);
            const user = await userModel.findOne({ email }, { email: 1, name: 1, lastName: 1, age: 1, password: 1, rol: 1 });
            console.log("loginUser---->",user);

            if (!user) {
                throw new Error('Usuario incorrecto');
            }

            if (!isValidPassword(user, password)) {
                throw new Error('Contraseña incorrectaaaaaa');
            }

            delete user.password;

            return user;
        } catch (error) {
            throw error;
        }
    }

    async findUser(email) {
        try {
            console.log("loginUser---->",email);
            const user = await userModel.findOne({ email }, { email: 1, name: 1, lastName: 1, age: 1, password: 1, rol: 1 });
            console.log("loginUser---->",user);

            if (!user) {
                throw new Error('Usuario incorrecto');
            }

                      return user;
        } catch (error) {
            throw error;
        }
    }

    async logOutUser(session) {
        try {
            // Verifica si el usuario está autenticado antes de cerrar la sesión
            if (session.user) {
                delete session.user;
                return true;
            }
            return false;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id) {
        try {
            const user = await userModel.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
  
}

export default userDAO;