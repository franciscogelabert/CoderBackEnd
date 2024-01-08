import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import UserDAO from '../dao/userDAO.js';
import 'dotenv/config.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
  const userDAO = new UserDAO();

  passport.use(
    'register',
    new LocalStrategy(
      { passReqToCallback: true, usernameField: 'email' },
      async (req, username, password, done) => {
        const { name, lastName, age, email } = req.body;
        const rol = (email === 'adminCoder@coder.com' && password === 'adminCod3r123') ? 'admin' : 'usuario';

        try {
          const user = await userDAO.registerUser(name, lastName, age, email, password);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  passport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: process.env.gitclientid,
        clientSecret: process.env.gitclientsecret,
        callbackURL: process.env.gitcallbackurl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await userDAO.findUser(profile._json.email, '');
          if (!user) {
            const newUser = {
              name: profile._json.name,
              email: profile._json.email,
              password: '',
              rol: 'usuario',
              lastName: '(import by Github)',
            };
            const result = await userDAO.registerUser(newUser.name, newUser.lastName, 0, newUser.email, newUser.password);
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

  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' },
      async (username, password, done) => {
        try {
          const user = await userDAO.loginUser(username, password);
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userDAO.getUserById(id);
    done(null, user);
  });

};

export default initializePassport;





