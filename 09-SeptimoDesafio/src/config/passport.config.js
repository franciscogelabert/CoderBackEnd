import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../../class/Dao/MongoDB/models/user.model.js';
import { createHash, isValidPassword } from '../../src/utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register',
        new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                const { name, lastname, email, age } = req.body;
                try {
                    let user = await userModel.findOne({ email: username });
                    if (user) {
                        console.log("Usuario ya existe");
                        return done(null, false);
                    }
                    const newUser = { name, lastname, age, passport: createHash(password), email };
                    let result = userModel.create(newUser);
                    return done(null, result);

                } catch (error) {
                    return done("Error al Obtener usuario" + error);

                }

            }))

    passport.use('login',
        new LocalStrategy({ usernameField: "email" },
            async (username, password, done) => {
                try {
                    let user = await userModel.findOne({ email: username });
                    if (!user) {
                        console.log("Usuario No existe");
                        return done(null, false);
                    }
                    if (isValidPassword(user, password)) {
                        return done(null, user);
                    }
                    return done(error)
                } catch (error) {
                    return done("no se puede autenticar el usuario" + error);

                }
            }
        ))
};

passport.serializeUser((user, done) =>
    done(null, user._id));

passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
}

);

export default initializePassport;