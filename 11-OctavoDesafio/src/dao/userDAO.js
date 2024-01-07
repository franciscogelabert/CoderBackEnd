import { userModel } from '../models/index.js';
import { createHash, isValidPassword } from '../utils.js';

class userDAO {
    constructor() { }

    async registerUser(name, lastName, age, email, password) {
        try {
            const rol = (email === 'adminCoder@coder.com' && password === 'adminCod3r123') ? 'admin' : 'usuario';

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
            const user = await userModel.findOne({ email }, { email: 1, name: 1, lastName: 1, age: 1, password: 1, rol: 1 });

            if (!user) {
                throw new Error('Usuario y/o contraseña incorrecta');
            }

            if (!isValidPassword(user, password)) {
                throw new Error('Usuario y/o contraseña incorrecta');
            }

            delete user.password;

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
}

export default userDAO;