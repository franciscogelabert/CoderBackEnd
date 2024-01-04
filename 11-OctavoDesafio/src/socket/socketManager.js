// socketManager.js

import { Server } from 'socket.io';
import ProductManagerDB  from '../../class/Product/ProductManagerDB.js';
import CartManagerDB  from '../../class/Cart/CartManagerDB.js';
import { db } from '../db/connect.js';
import Cart from '../../class/Cart/Cart.js';
import Product from '../../class/Product/Product.js';

export function configureSocketServer(httpServer) {
    const socketServer = new Server(httpServer);

    const lp = new ProductManagerDB();
    const lc = new CartManagerDB();

    // Accesos al Servidor

socketServer.on('connection', socket => {
    console.log('Nuevo Cliente Conectado (Server 1)');
    socket.on('agregar_producto', (data) => {
        lp.seEncuentra(data.code)
            .then((result) => {
                console.log("Proceso de Agregado", result);
                if (result === false) {
                    const thumbnail = [];
                    thumbnail.push(data.thumbnail1);
                    thumbnail.push(data.thumbnail2);
                    const intCode = parseInt(data.code, 10);
                    const intPrice = parseInt(data.price, 10);
                    const intStock = parseInt(data.stock, 10);
                    const newProduct = new Product(data.title, data.description, intCode, intPrice, intStock, thumbnail, data.estado, data.category);

                    lp.addProduct(newProduct);

                    socketServer.emit("productAdded", newProduct)
                } else {
                    socket.emit("productNotAdded", data.code);
                }
            })
            .catch((error) => {
                console.error("Error al insertar:", error);
               
            });
    });


    socket.on('eliminar_producto', (data) => {
        const cProd = data;
        lp.deleteProductByCode(cProd)
            .then((result) => {
                console.log("Proceso de Eliminado");
                if (result === true) {
                    // Si result es true, el producto se eliminó
                    socket.emit("productDeleted", cProd);
                } else {
                    socket.emit("productNotDeleted", cProd);
                }
            })
            .catch((error) => {
                console.error("Error al eliminar producto:", error);
            });
    });


    ///////// Cart Sockets ////////////////////

    socket.on('crear_carrito', (codigoProducto, usuario) => {

        // Obtener el ID en Base del Producto seleccionado por codigo

        lp.getProductByCode(codigoProducto)
            .then((result) => {
                const info = {
                    "IdUser": usuario,
                    "lista": [
                        {
                            "IdProd": result[0]._id,
                            "CantProd": 1
                        }
                    ]
                };
              
                const newCart = new Cart(info);

                // Devolver la promesa para poder encadenarla
                lc.addCart(newCart)
                    .then((cartId) => {
                        socket.emit("carritoCreado", cartId, result[0].price);
                    })
                    .catch((error) => {
                        console.error("Error al agregar carrito:", error);
                        socket.emit("Error Carrito", mensaje);
                    });
            })
            .catch((error) => {
                console.error("Error al Crear el Carrito: ", error);
                socket.emit("Error al Crear el Carrito");
            });
    });


    socket.on('agregar_producto_carrito', (codigoProducto, carrito) => {

        // Obtener el ID en Base del Producto seleccionado por codigo
        lp.getProductByCode(codigoProducto)
            .then((result) => {

                lc.addProductCart(result[0]._id, carrito)
                    .then((cartId) => {
                        console.log("carritoActualizado --->", carrito);
                        socket.emit("carritoActualizado", result[0].price);

                    });
            })
            .catch((error) => {
                console.error("Error al Crear el Carrito: ", error);
                socket.emit("Error al Crear el Carrito");
            });
    });


    socket.on('eliminar_producto_carrito', (idProducto, idCarrito) => {

        // Obtener el ID en Base del Producto seleccionado por codigo
        lc.removeProductCart(idProducto, idCarrito)
            .then((result) => {
                console.log("carritoActualizado --->", idCarrito);
                socket.emit("carritoActualizado", idCarrito)
            })
            .catch((error) => {
                console.error("Error al Crear el Carrito: ", error);
                socket.emit("Error al Crear el Carrito");
            });
    });


});

    return socketServer;
}