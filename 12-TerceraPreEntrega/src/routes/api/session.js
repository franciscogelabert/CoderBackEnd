import express from "express";
import querystring from 'querystring';
import UserDTO from "../../dao/DTO/userDTO.js";

import {
  registerUser,
  loginUser,
  logOutUser,
} from "../../controllers/auth.controller.js";
import { showProfile } from "../../controllers/user.controller.js";
import passport from 'passport';

const router = express.Router();

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  async (req, res) => {
    let user = req.user;
    delete user.password;
    req.session.user = user;
    res.redirect("/profile");
  }
);


router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => { }
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    console.log("Usuario LogIn", req.session.user);

    // Construye la cadena de consulta
    const queryParams = {
      page: 1,
      limit: 5,
      category: 'Verdura',
      sort: 'DESC',
    };

    const queryString = querystring.stringify(queryParams);

    // Redirige a la URL completa con la cadena de consulta
    res.redirect(`/api/products?${queryString}`);

  }
);

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    let user = req.user;
    if (!user)
      return res
        .status(400)
        .send({ status: "Error", error: "Invalid Credentials" });
   
        const userDTO = new UserDTO(user)
        req.session.user = userDTO;

    
    console.log("Usuario LogIn", req.session.user);
    console.log("User", userDTO.rol);

    if (user.rol === 'usuario') {

      // Construye la cadena de consulta
      const queryParams = {
        page: 1,
        limit: 5,
        category: 'Verdura',
        sort: 'DESC',
      };

      const queryString = querystring.stringify(queryParams);

      // Redirige a la URL completa con la cadena de consulta
      res.redirect(`/api/products?${queryString}`);

    } else if (user.rol === "admin") {
      // Redirige a la URL para admin
      res.redirect(`/api/api/realTimeProducts`);
    } else {
      // Manejar otros roles si es necesario
      res.status(403).send({ status: "Error", error: "Forbidden" });
    }
  }
);

router.get("/", logOutUser);

export default router;