import express from "express";
import querystring from 'querystring';

import {
  registerUser,
  loginUser,
  logOutUser,
} from "../../controllers/auth.controller.js";
import { showProfile } from "../../controllers/user.controller.js";
import passport from 'passport';

const router = express.Router();

//router.post("/register", registerUser);
//router.post("/login", loginUser);
//router.get("/", logOutUser);


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
  async (req, res) => {}
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



// router.post("/login", loginUser);
/*
router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  async (req, res) => {
    let user = req.user;
    if (!user)
      return res
        .status(400)
        .send({ status: "Error", error: "Inalid Credentials" });
    delete user.password;
    req.session.user = user;
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
*/

router.get("/", logOutUser);



export default router;