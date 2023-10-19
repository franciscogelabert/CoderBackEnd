/*  Server  */


import ProductManager from './ProductManager';

const http = require('http');
const port = 8080;
const server = http.createServer((request, response) => { response.end("Hola Mundo Lindo") })
server.listen(port,()=>{console.log("Escuchando en Puerto: ", {port})})

const express = require('express');
const app = express();

