import { userModel } from '../../class/Dao/MongoDB/models/user.model.js';
import querystring from 'querystring';

// Registra a un nuevo usuario.
export const registerUser = async (req, res) => {
  try {
    const { name, lastName, age, email, password } = req.body;
    // Asigna el valor correcto a `rol` basándote en las condiciones especificadas
    const rol = (email === "adminCoder@coder.com" && password === "adminCod3r123") ? "admin" : "usuario";

    const user = new userModel({ name, lastName, age, email, password, rol });

    console.log("Rol Registrado", rol);
    await user.save();

    const userGuardado = await userModel.findOne({ email, password });
    console.log("Usuario Registrado", userGuardado);

    req.session.name = name;
    req.session.lastName = lastName;
    req.session.email = email;
    req.session.rol = rol;
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
    const user = await userModel.findOne({ email, password });
    console.log("Usuario LogIn", user);
    if (user) {
      req.session._id = user._id;
      req.session.name = user.name;
      req.session.lastName = user.lastName;
      req.session.email = user.email;
      req.session.rol = user.rol;

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

    } else {
      res.redirect("/");
    }
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