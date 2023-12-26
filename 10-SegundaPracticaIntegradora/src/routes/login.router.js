import express from 'express';
import __dirname from '../utils.js';
import { passportCall } from "../utils.js";
import authRouter from "./auth.router.js";
import passport from "passport";
import initializePassport from '../config/passport.config.js';

const login = express.Router();

initializePassport();
login.use(passport.initialize());

login.use("/api", authRouter);


login.get("/", (req, res) => {
  let data = {
      layout: "jwt/home",
  };
  res.render("index", data);
});

login.get("/login", (req, res) => {
  let data = {
      layout: "jwt/login",
  };
  res.render("index", data);
});

login.get("/register", (req, res) => {
  let data = {
      layout: "jwt/register",
  };
  res.render("index", data);
});


login.get("/api/current", passportCall("jwt"), (req, res) => {
  res.send(req.user);
});


login.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

export { login };