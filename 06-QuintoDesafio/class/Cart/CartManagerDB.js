import Cart from './Cart.js';
import FileManager from '../dao/FileSystem/FileManager.js'
import { cartModel } from '../../class/Dao/MongoDB/models/cart.model.js';
import mongoose from 'mongoose';


class CartManagerDB {
    constructor() {
        this.lista = [];
    }

    addCart = function (cart) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(cart);
                const nuevoCart = await cartModel.create(cart);
                console.log('Cart insertado:', cart);

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
                  
                const findProdIndex = result.lista.findIndex(c => c.IdProd === idProduct);
    
                if (findProdIndex !== -1) {
                    // El producto ya existe en el carrito, incrementa la cantidad
                    result.lista[findProdIndex].CantProd++;
                } else {
                    // El producto no existe en el carrito, agrégalo
                    result.lista.push({ IdProd: idProduct, CantProd: 1 });
                }
    
                // Actualiza el carrito en la base de datos
          
                await this.updateCartById(idCart,result);
      
                
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


}

export default CartManagerDB;
/*

// Usando Base de datos en Mongo

const URI =`mongodb+srv://franciscogelabert:k6fNeJCfUJeOy77u@ecommerce.yssf83p.mongodb.net/ecommerce?retryWrites=true&w=majority`;

mongoose.connect(URI)
.then(
    ()=>{
        console.log('Base de datos lista para usarsedesde el CartManager DBdirdir');
        },
    (err)=>{
        console.log('Ha ocurrido un error --> ',err);
    }
)
*/
/*
const cart1 = new Cart([{ IdProd: 101, CantProd: 5 }, { IdProd: 102, CantProd: 2 }]);
const cart2 = new Cart([{ IdProd: 103, CantProd: 4 }]);
const cart3 = new Cart([{ IdProd: 104, CantProd: 5 }]);
const cart4 = new Cart([{ IdProd: 104, CantProd: 5 }]);

console.log('00- Se crean los 3 carritos');


*/
/*
// creo el Cart Manager
const lc = new CartManagerDB();
console.log('02 - Se crea el Cart Manager');
const idCart = '655a54dcf04594bdbf5a26ea';
const isProducto = 152;

lc.addProductCart(isProducto,idCart)
    .then((productoInsertado) => {
        // Hacer algo con el producto insertado, si es necesario
    })
    .catch((error) => {
        // Manejar el error, si es necesario
    });

*/
/*

lc.addCart(cart1)
    .then((productoInsertado) => {
        // Hacer algo con el producto insertado, si es necesario
    })
    .catch((error) => {
        // Manejar el error, si es necesario
    });

    */