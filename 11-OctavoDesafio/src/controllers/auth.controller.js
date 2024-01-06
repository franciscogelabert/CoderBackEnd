import { userModel } from  '../models/index.js';
import { createHash, isValidPassword } from '../utils.js';
import querystring from 'querystring';

// Registra a un nuevo usuario.
export const registerUser = async (req, res) => {
  try {
    const { name, lastName, age, email, password } = req.body;
    // Asigna el valor correcto a `rol` basándote en las condiciones especificadas
    const rol = (email === "adminCoder@coder.com" && password === "adminCod3r123") ? "admin" : "usuario";

    if (!name || !lastName || !email || !password) {
      return res.status(401).send({ status: "error", error: "Incomplete values" });
    }
    const user = new userModel({ name, lastName, age, email, password: createHash(password), rol });

    await user.save();

    delete user.password;

    req.session.user = user;

    console.log("Usuario Registrado",  req.session.user );

    res.redirect("/profile");

  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

// Autentica a un usuario y almacena la información en la sesión.
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }, { email: 1, name: 1, lastName: 1, age: 1, password: 1, rol: 1 });
    if (!user) {
      return res.status(401).send({ status: "error", error: "Usuario y/o contraseña incorrecta" });

    }
    if (!isValidPassword(user, password)) {
      return res.status(401).send({ status: "error", error: "Usuario y/o contraseña incorrecta" });

    }
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

  } catch (error) {
    console.log("Error, credenciales invalidas", error);
    res.redirect("/error");
  }
};

//Cierra la sesión del usuario.
export const logOutUser = async (req, res) => {
  try {
    // Verifica si el usuario está autenticado antes de cerrar la sesión

    delete req.session.name;
    delete req.session.lastName;
    delete req.session.email;
    delete req.session.rol;

    if (req.session.user) {
      delete req.session.user;

      console.log("borra la sesion");
      // Opcionalmente, puedes destruir completamente la sesión
      req.session.destroy((err) => {
        if (err) {
          console.error("Error al cerrar la sesión", err);
          res.status(500).send("Error al cerrar la sesión");
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error("Error al cerrar la sesión", error);
    res.status(500).send("Error al cerrar la sesión");
  }
};