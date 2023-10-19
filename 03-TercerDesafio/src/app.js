/*  Server  */

import ProductManager from '../ProductManager.js';
import express  from 'express';

// Ahora puedes usar la clase ProductManager en tu código de app.js
const productManager = new ProductManager();

//const http = require('http');
//const server = http.createServer((request, response) => { response.end("Hola Mundo Lindo") })
//server.listen(port,()=>{console.log("Escuchando en Puerto: ", {port})})

const app = express();
const port = 8081;

app.get('/saludo',(req,res)=>{res.send('Hola Express de Node Js');})

app.listen(port,()=>{console.log("Escuchando en Puerto: ", {port})})


