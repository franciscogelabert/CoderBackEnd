import express from 'express';
import { authToken, generateToken } from '../utils.js';
import querystring from 'querystring';


const loginJwt = express.Router();

const users = [
    {
        email: "fgelabert@gmail.com",
        password: "prueba",
    },
];


loginJwt.get("/", (req, res) => {
    let data = {
        layout: "jwt/home",
    };
    res.render("index", data);
});

loginJwt.get("/register", (req, res) => {
    let data = {
        layout: "jwt/register",
    };
    res.render("index", data);
});


loginJwt.get("/login", (req, res) => {
    let data = {
        layout: "jwt/login",
    };
    res.render("index", data);
});


loginJwt.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    const exists = users.find(user => user.email === email);
    if (exists) return res.status(400).send({ status: "error", error: "User already exists" });
    const user = {
        name,
        email,
        password
    }
    users.push(user);
    const access_token = generateToken(user);
    res.send({ status: "success", access_token });

})

loginJwt.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    console.log(user);
    if (!user) return res.status(400).send({ status: "error", error: "Invalid credentials" });
    const access_token = generateToken(user);
    res.send({ status: "success", access_token });

    // Construye la cadena de consulta
/*    const queryParams = {
      page: 1,
      limit: 5,
      category: 'Verdura',
      sort: 'DESC',
    };

    const queryString = querystring.stringify(queryParams);

    // Redirige a la URL completa con la cadena de consulta
    res.redirect(`/api/products?${queryString}`);*/
})

loginJwt.get('/api/current', authToken, (req, res) => {
    res.send({ status: "success", payload: req.user })
})

export { loginJwt };