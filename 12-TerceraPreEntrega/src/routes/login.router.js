import express from 'express';
import __dirname from '../utils.js';
import session from 'express-session';
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';
import indexRouter from '../routes/user/index.js';
import loginRouter from '../routes/user/login.js';
import profileRouter from '../routes/user/profile.js';
import sessionsApiRouter from '../routes/api/session.js';
import passport from 'passport';
import initializePassport from '../config/passport.config.js';
import { config } from '../config/config.js';


const login = express.Router();

login.use(cookieParser());

login.use(
    session({
        secret: 'micAmbiArPoAlgoMasSeguro',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: config.mongo.URI,
            ttl: 3 * 60, // Tiempo de vida de la sesión en segundos (2 minutos en este caso)
        })
    }));

initializePassport();
login.use(passport.initialize());
login.use(passport.session());

login.use('/login', loginRouter);
login.use('/profile', profileRouter);
login.use('/logout', sessionsApiRouter);
login.use('/api/sessions', sessionsApiRouter);
login.use('/', indexRouter);

login.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

export { login };