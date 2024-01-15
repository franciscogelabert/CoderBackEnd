import { Server } from 'socket.io';
import { productController, cartController, messageController } from '../controllers/index.js';
import { db } from '../config/connect.js';
import Product from '../class/Product.js';

export function configureSocketServer(httpServer) {
    const socketServer = new Server(httpServer);

    const lpc = new productController();
    const lcc = new cartController();
    const lmc = new messageController();

    // Accesos al Servidor

    socketServer.on('connection', socket => {
        console.log('Nuevo Cliente Conectado (Server 1)');

        socket.on('agregar_producto', async (data) => {
            try {
                const result = await lpc.seEncuentra(data.code);
                console.log("Proceso de Agregado", result);

                if (result === false) {
                    const thumbnail = [data.thumbnail1, data.thumbnail2];
                    const intCode = parseInt(data.code, 10);
                    const intPrice = parseInt(data.price, 10);
                    const intStock = parseInt(data.stock, 10);

                    const newProduct = new Product(data.title, data.description, intCode, intPrice, intStock, thumbnail, data.estado, data.category);

                    await lpc.addProduct(newProduct);
                    socketServer.emit("productAdded", newProduct);
                } else {
                    socket.emit("productNotAdded", data.code);
                }
            } catch (error) {
                console.error("Error al insertar:", error);
            }
        });

        socket.on('eliminar_producto', async (data) => {
            try {
                const result = await lpc.deleteProductByCode(data);
                console.log("Proceso de Eliminado");

                if (result === true) {
                    // Si result es true, el producto se eliminó
                    socket.emit("productDeleted", data);
                } else {
                    socket.emit("productNotDeleted", data);
                }
            } catch (error) {
                console.error("Error al eliminar producto:", error);
            }
        });



        /////////   Chat Socket ///////////////

        socket.on('agregar_mensaje', (data) => {
            const mensaje = data;
            lmc.addMessage(mensaje)
                .then(() => {
                    socketServer.emit("actualizarChat", mensaje);
                })
                .catch((error) => {
                    console.error("Error al agregar Mensajes:", error);
                    socket.emit("errorChat", mensaje);
                });
        });



        ///////// Cart Sockets ////////////////////

        socket.on('crear_carrito', async (codigoProducto, usuario) => {
            try {
                const { cartId, price } = await lcc.createCartFromSocket(codigoProducto, usuario);
                socket.emit('carritoCreado', cartId, price);
            } catch (error) {
                console.error('Error al crear el carrito:', error);
                socket.emit('Error Carrito'); // Asegúrate de definir mensaje adecuadamente
            }
        });


        socket.on('agregar_producto_carrito', async (codigoProducto, carrito) => {
            try {
                const result = await lpc.getProductsByCode(codigoProducto);
                const cartId = await lcc.addProductCart(result[0]._id, carrito);
                console.log("carritoActualizado --->", carrito);
                socket.emit("carritoActualizado", result[0].price);
            } catch (error) {
                console.error("Error al Crear el Carrito: ", error);
                socket.emit("Error al Crear el Carrito");
            }
        });


        socket.on('eliminar_producto_carrito', async (idProducto, idCarrito) => {
            try {
                const result = await lcc.removeProductCart(idProducto, idCarrito);
                console.log("carritoActualizado --->", idCarrito);
                socket.emit("carritoActualizado", idCarrito);
            } catch (error) {
                console.error("Error al eliminar producto del carrito: ", error);
                socket.emit("Error al eliminar producto del carrito");
            }
        });

    });

    return socketServer;
}