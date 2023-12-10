
import Cart from './Cart.js';
import FileManager from '../dao/FileSystem/FileManager.js'


class CartManager {
    constructor(fs) {
        this.id = 0;
        this.lista = [];
        this.fs = fs;
    }

    addCart = function (cart) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // Actualizo lista con archivo
                    this.id = this.id + 1;
                    this.lista.push(cart);
                    this.fs.setArchivo(this.lista);
                    resolve(true);

                } else {
                    this.id = this.id + 1;
                    this.lista.push(cart);
                    this.fs.setArchivo(this.lista);
                    resolve(true);
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };



    addProductCart = function (idProduct, idCart) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // Actualizo lista con archivo
                    console.log('this.lista[idCart]', this.lista[idCart]);
                    const findProd = this.lista[idCart].lista.find(c => c.IdProd === idProduct);
                    console.log('findProd', findProd);
                    if (findProd) {
                        findProd.CantProd++;
                        this.fs.setArchivo(this.lista);
                        console.log('findProd', findProd);
                    }
                    else {
                        this.lista[idCart].lista.push({ IdProd: idProduct, CantProd: 1 });
                        console.log('entra', this.lista[idCart]);
                        this.fs.setArchivo(this.lista);
                    }

                } else {
                    console.log('No se encuentra el archivo');
                    resolve(false);
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

 getCarts = function () {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // actualizo lista con archivo
                    resolve(this.lista);

                } else {
                    console.log('El archivo no existe');
                    resolve(false);
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };



    getCartsById = function (id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // actualizo lista con archivo
                    resolve(this.lista[id] || `Id Product Not Found`);
                } else {
                    console.log('El archivo no existe');
                    resolve(false);
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };


}

export default CartManager;

