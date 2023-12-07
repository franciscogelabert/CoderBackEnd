import { userModel } from '../../class/Dao/MongoDB/models/user.model.js';
import querystring  from  'querystring';

// Registra a un nuevo usuario.
export const registerUser = async (req, res) => {
  try {
    const { name, lastName, age, email, password } = req.body;
    const user = new userModel({ name, lastName, age, email, password });
    await user.save();
    const userGuardado = await userModel.findOne({ email, password });
    console.log("Usuario Registrado", userGuardado);
    req.session.name = name;
    req.session.lastName = lastName;
    req.session.email = email;
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
      req.session.name = user.name;
      req.session.lastName = user.lastName;
      req.session.email = user.email;

      // Construye la cadena de consulta
      const queryParams = {
        page: 1,
        limit: 2,
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