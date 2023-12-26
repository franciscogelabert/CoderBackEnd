import { Router } from "express";
import {
  generateToken,
  passportCall,
  createHash,
  isValidPassword,
} from "../utils.js";
import { userModel } from '../../class/Dao/MongoDB/models/user.model.js';

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne(
      { email },
      { email: 1, name: 1, password: 1 }
    );

    console.log("Usuario Logueado !!", user);

    if (!user)
      return res.status(401).send({
        status: "Error",
        error: "Usuario y/o contraseña incorrecta 1",
      });

    if (!isValidPassword(user, password))
      return res.status(401).send({
        status: "Error",
        error: "Verifique los datos ingresados",
      });

    delete user.password;

    let token = generateToken(user);
    res
      .cookie("access_token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      })
      .send({ message: "Login Success" });
  } catch (error) {
    console.log("Error, credenciales invalidas", error);
    res.redirect("/error");
  }
});


router.get("/", (req, res) => {
  let data = {
    layout: "profile",
    user: req.session.user,
  };
  
  res.render("index", data);
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res
      .status(400)
      .send({ status: "error", error: "Uno o varios datos incompletos" });

  const findUser = await userModel.findOne({ email });
  let result;
  if (findUser) {
    return res.status(400).send({
      status: "error",
      error: "Intenta hacer login con usuario y contraseña",
    });
  } else {
    result = await userModel.create({
      name,
      email,
      password: createHash(password),
    });
  }

  res.send({ status: "success" });
});



export default router;
