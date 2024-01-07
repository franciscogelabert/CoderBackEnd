import UserDAO from '../dao/userDAO.js';

const userDAO = new UserDAO();

export const registerUser = async (req, res) => {
  try {
    const { name, lastName, age, email, password } = req.body;

    const user = await userDAO.registerUser(name, lastName, age, email, password);

    req.session.user = user;

    console.log('Usuario Registrado', req.session.user);

    res.redirect('/profile');
  } catch (error) {
    console.log(error.message);
    res.redirect('/');
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userDAO.loginUser(email, password);

    req.session.user = user;

    console.log('Usuario LogIn', req.session.user);

    // Resto del código...
  } catch (error) {
    console.log('Error, credenciales invalidas', error.message);
    res.redirect('/error');
  }
};

export const logOutUser = async (req, res) => {
  try {
    const loggedOut = await userDAO.logOutUser(req.session);

    if (loggedOut) {
      // Opcionalmente, puedes destruir completamente la sesión
      req.session.destroy((err) => {
        if (err) {
          console.error('Error al cerrar la sesión', err);
          res.status(500).send('Error al cerrar la sesión');
        } else {
          res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.error('Error al cerrar la sesión', error.message);
    res.status(500).send('Error al cerrar la sesión');
  }
};