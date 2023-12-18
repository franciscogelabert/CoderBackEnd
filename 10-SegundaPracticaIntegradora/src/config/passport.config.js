import passport from 'passport';
import local from 'passport-local';
import { userModel } from '../../class/Dao/MongoDB/models/user.model.js';
import { createHash, isValidPassword } from '../../src/utils.js';
import GitHubStrategy from "passport-github2";
import "dotenv/config.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    passport.use(
        "register",
        new LocalStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                const { name, lastName, age, email } = req.body;
                const rol = (email === "adminCoder@coder.com" && password === "adminCod3r123") ? "admin" : "usuario";

                try {
                    let user = await userModel.findOne({ email: username });
                    if (user) {
                        console.log("Usuario ya existe");
                        return done(null, false);
                    }
                    const newUser = {
                        name,
                        lastName,
                        age,
                        email,
                        password: createHash(password),
                        rol,
                    };

                    let result = await userModel.create(newUser);
                    return done(null, result);
                } catch (error) {
                    return done("Error al obtener usuario" + error);
                }
            }
        )
    );

    passport.use(
        "github",
        new GitHubStrategy(
          {
            clientID: process.env.gitclientid,
            clientSecret: process.env.gitclientsecret,
            callbackURL: process.env.gitcallbackurl,
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              console.log(profile);
              let user = await userModel.findOne({ email: profile._json.email });
              if (!user) {
                let newUser = {
                  name: profile._json.name,
                  email: profile._json.email,
                  password: "",
                  rol:"usuario",
                  lastName:"(import by Github)",
                  };
                let result = await userModel.create(newUser);
                done(null, result);
              } else {
                done(null, user);
              }
            } catch (error) {
              done(error);
            }
          }
        )
      );


/// Passport original

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

passport.serializeUser((user, done) => {
    console.log(user._id);
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById(id);
    done(null, user);
});


export default initializePassport;