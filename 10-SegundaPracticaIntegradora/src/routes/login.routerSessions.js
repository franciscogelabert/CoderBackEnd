import express from 'express';
import __dirname from '../utils.js';
import session from 'express-session';
import cookieParser from "cookie-parser";
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

import indexRouter from '../routes/user/index.js';
import loginRouter from '../routes/user/login.js';
import profileRouter from '../routes/user/profile.js';
import sessionsApiRouter from '../routes/api/session.js';
import passport from 'passport';
import initializePassport from '../config/passport.config.js';

// Configura dotenv para cargar las variables de entorno desde el archivo .env
dotenv.config();

// Obtiene la cadena de conexión de MongoDB desde la variable de entorno
const URI = process.env.MONGODB_URI;

const loginSession = express.Router();

loginSession.use(cookieParser());

loginSession.use(
    session({
        secret: 'micAmbiArPoAlgoMasSeguro',
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: URI,
            ttl: 3 * 60, // Tiempo de vida de la sesión en segundos (2 minutos en este caso)
        })
    }));

initializePassport();
loginSession.use(passport.initialize());
loginSession.use(passport.session());

loginSession.use('/loginSession', loginRouter);
loginSession.use('/profileSession', profileRouter);
loginSession.use('/logoutSession', sessionsApiRouter);
loginSession.use('/api/sessions', sessionsApiRouter);
loginSession.use('/', indexRouter);

loginSession.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

export { loginSession };