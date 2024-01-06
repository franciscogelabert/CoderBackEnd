import { cartModel } from '../models/index.js';
import mongoose from 'mongoose';


class cartDAO {
    constructor() {
        this.idUser;
        this.lista = [];
    }

    addCart = function (cart) {
        return new Promise(async (resolve, reject) => {
            try {
                const nuevoCart = await cartModel.create(cart);
                const cartId = nuevoCart._id;
                console.log('Cart insertado:', cartId);
                resolve(cartId);

            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    }

    async updateCartById(id, cart) {
        try {
            const resultado = await cartModel.updateOne({ _id: id }, { $set: cart });

            if (resultado.modifiedCount === 1) {
                console.log('Cart actualizado correctamente.', resultado);
                return true;
            } else {
                console.log('Cart no encontrado o no actualizado.', resultado);
                return false;
            }
        } catch (error) {
            console.error('Error al actualizar Cart:', error);
            throw error; // Puedes manejar el error aquí o lanzarlo para que sea manejado en otro lugar
        }
    }
    addProductCart = function (idProduct, idCart) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cartModel.findById(idCart);

                // Convertir el idProduct a ObjectId si es un string
                const idProductObj = typeof idProduct === 'string' ? mongoose.Types.ObjectId(idProduct) : idProduct;

                const findProdIndex = result.lista.findIndex(c => c.IdProd.equals(idProductObj));

                if (findProdIndex !== -1) {
                    // El producto ya existe en el carrito, incrementa la cantidad
                    result.lista[findProdIndex].CantProd++;
                } else {
                    // El producto no existe en el carrito, agrégalo
                    result.lista.push({ IdProd: idProductObj, CantProd: 1 });
                }

                // Actualiza el carrito en la base de datos
                await this.updateCartById(idCart, result);

                resolve(result);

            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };


    addProductCartCantidad = function (idProduct, idCart, cantidad) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cartModel.findById(idCart);

                console.log("idProduct ----> ", idProduct)
                console.log("idCart ----> ", idCart)
                console.log("Cantidad ----> ", cantidad)

                // Convertir el idProduct a ObjectId si es un string
                const idProductObj = typeof idProduct === 'string' ? new mongoose.Types.ObjectId(idProduct) : idProduct;

                const findProdIndex = result.lista.findIndex(c => c.IdProd.equals(idProductObj));

                if (findProdIndex !== -1) {
                    // El producto ya existe en el carrito, incrementa la cantidad
                    result.lista[findProdIndex].CantProd = result.lista[findProdIndex].CantProd + cantidad;

                } else {
                    // El producto no existe en el carrito, agrégalo
                    result.lista.push({ IdProd: idProductObj, CantProd: 1 });
                }

                // Actualiza el carrito en la base de datos
                await this.updateCartById(idCart, result);

                resolve(result);

            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    removeProductCart = function (idProduct, idCart) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cartModel.findById(idCart);
                const ObjectId = mongoose.Types.ObjectId;

                // Convertir el idProduct a ObjectId si es un string
                const idProductObj = typeof idProduct === 'string' ? new ObjectId(idProduct) : idProduct;

                // Filtrar la lista para excluir el producto que deseamos eliminar
                result.lista = result.lista.filter(c => !c.IdProd.equals(idProductObj));

                // Actualizar el carrito en la base de datos
                await this.updateCartById(idCart, result);

                resolve(result);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    removeProductCartAll = function (idCart) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cartModel.findById(idCart);
                result.lista = [];
                // Actualizar el carrito en la base de datos
                await this.updateCartById(idCart, result);
                resolve(result);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    getCarts = function () {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cartModel.find();
                this.lista = result; // actualizo lista con la Base de datos
                resolve(this.lista);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    getCartsById = function (id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await cartModel.findById(id);
                if (result) {
                    resolve(result);
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    }


    getCartById = function (id) {
        return new Promise(async (resolve, reject) => {
            try {
                const carrito = await cartModel.findById(id)
                    .populate({
                        path: 'lista.IdProd',
                        model: 'products' // Nombre del modelo de productos
                    })
                    .exec();

                if (!carrito) {
                    console.log('Carrito no encontrado.');
                    resolve(false);
                }

                const cantProd = carrito.lista.reduce((total, producto) => {
                    return total + producto.CantProd;
                }, 0);

                // Utilizar reduce para calcular el precio total
                const precioTotal = carrito.lista.reduce((total, producto) => {
                    // Multiplicar el precio por la cantidad y sumar al total
                    return total + (producto.IdProd.price * producto.CantProd);
                }, 0);

                // El contenido del carrito estará en la propiedad "lista"
                console.log('Usuario:', carrito.IdUser);
                console.log('Contenido del carrito:', carrito.lista);
                console.log('Cantidad Productos:', cantProd);
                console.log('Precio Total:', precioTotal);

                // Incluir también el campo 'iduser' del carrito
                const carritoConIdUser = {
                    IdUser: carrito.IdUser,
                    lista: carrito.lista,
                    cantProd: cantProd,
                    precioTotal: precioTotal
                };

                resolve(carritoConIdUser);

            } catch (error) {
                console.error('Error:', error);
                throw error; // Lanzar el error para que pueda ser manejado por la llamada de catch en el lugar donde se llama a la función
            }
        })
    }

    getTotalesCartById = function (id) {
        return new Promise(async (resolve, reject) => {
            try {
                const carrito = await cartModel.findById(id)

                if (!carrito) {
                    console.log('Carrito no encontrado.');
                    resolve(false);
                }

                const sumaCantidades = carrito.lista.reduce((total, producto) => {
                    return total + producto.CantProd;
                }, 0);

                const sumaMontos = carrito.lista.reduce((total, montos) => {
                    return total + producto.CantProd;
                }, 0);

                resolve(carrito);

            } catch (error) {
                console.error('Error:', error);
                throw error; // Lanzar el error para que pueda ser manejado por la llamada de catch en el lugar donde se llama a la función
            }
        })
    }

}

export default cartDAO;
