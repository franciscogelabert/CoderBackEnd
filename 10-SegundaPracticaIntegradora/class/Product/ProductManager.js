import Product from './Product.js';
import FileManager from '../dao/FileSystem/FileManager.js'


class ProductManager {
    constructor(fs) {
        this.id = 0;
        this.lista = [];
        this.fs = fs;
    }

    seEncuentra = function (code) {
        return new Promise(async (resolve, reject) => {
            try {

                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // actualizo lista con archivo
                    const productoEncontrado = this.lista.find((element) => element.code == code);
                    resolve(!!productoEncontrado);
                } else {
                    console.log('El archivo no existee');
                    resolve(false); // Puedes cambiar esto según lo que desees hacer en caso de que el archivo no exista
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    seEncuentraID = function (id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // actualizo lista con archivo
                    const productoEncontrado = this.lista[id];;
                    resolve(!!productoEncontrado);
                } else {
                    console.log('El archivo no existee');
                    resolve(false); // Puedes cambiar esto según lo que desees hacer en caso de que el archivo no exista
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };


    addProductByCode = function (producto) {
        this.seEncuentra(producto.code)
            .then((encontrado) => {
                if (!encontrado && producto.esValido()) {
                    this.id = this.id + 1;
                    this.lista.push(producto);
                    this.fs.setArchivo(this.lista);
                     } else if (encontrado) {
                    console.log(`El producto ${producto.title} ya fue ingresado`);
                    
                } else {
                    console.log(`El producto ${producto.title} no es válido`);
                   
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                resolve(false);
            });
    }
 


    addProduct = function (producto) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // Actualizo lista con archivo
                }
                if (producto.esValido()) {
                    this.id = this.id + 1;
                    this.lista.push(producto);
                    this.fs.setArchivo(this.lista);
                    console.log(`Producto ingresado con ID: ${this.lista.length - 1}`);
                } else {
                    console.log(`El producto ${producto.title} no es válido`);
                }

            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };


    updateProductById = function (id, producto) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // Actualizo lista con archivo
                }

                if (id >= 0 && id < this.lista.length) {
                    // Verifica si el índice es válido
                    const updatedProduct = new Product(
                        producto.title,
                        producto.description,
                        producto.code,
                        producto.price,
                        producto.stock,
                        producto.thumbnail,
                        producto.estado,
                        producto.category
                    );

                    this.lista[id] = updatedProduct; // Reemplaza el elemento en la lista
                    this.fs.setArchivo(this.lista);
                    console.log('Producto Actualizado');
                    resolve(true);
                } else {
                    console.log('El índice no es válido');
                    resolve(false);
                }

            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    updateProductByCode = function (code, producto) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // Actualizo lista con archivo
                    const productoIndex = this.lista.findIndex(producto => producto.code === code);
                    if (productoIndex !== -1) {
                        // Verifica si el índice es válido
                        const updatedProduct = new Product(
                            producto.title,
                            producto.description,
                            producto.code,
                            producto.price,
                            producto.stock,
                            producto.thumbnail,
                            producto.estado,
                            producto.category
                        );

                        this.lista[productoIndex] = updatedProduct; // Reemplaza el elemento en la lista
                        this.fs.setArchivo(this.lista);
                        console.log('Producto Actualizado');
                        resolve(true);
                    } else {
                        console.log('El índice no es válido');
                        resolve(false);
                    }
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

    deleteProductById = function (id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // Actualizo lista con archivo

                    if (id >= 0 && id < this.lista.length) {
                        const listaNueva = this.lista.slice();
                        listaNueva.splice(id, 1);
                        this.fs.setArchivo(listaNueva);
                        console.log('Producto Actualizado');
                        resolve(true);
                    } else {
                        console.log('El índice no es válido');
                        resolve(false);
                    }
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

    deleteProductByCode = function (code) {
        return new Promise(async (resolve, reject) => {
            try {
                const codeNum = parseInt(code, 10)
                console.log("LLega -----> this.fs.archivo", this.fs.archivo);
                console.log("LLega -----> validar ", this.fs.validarExistenciaArchivo(this.fs.archivo))
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // actualizo lista con archivo
                    const productoIndex = this.lista.findIndex(producto => producto.code === codeNum);
                    if (productoIndex !== -1) {
                        const productoEliminado = this.lista.splice(productoIndex, 1)[0];
                        this.fs.setArchivo(this.lista);
                        console.log(`Producto con código "${codeNum}" eliminado:`, productoEliminado);
                        resolve(true);
                    } else {
                        console.log(`Producto con código "${codeNum}" no encontrado en la lista.`);
                        resolve(false);
                    }
                }
                else {
                    console.log('El archivo no existee');
                    resolve(false);
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };


    getProducts = function () {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.fs.getItemsArchivo();
                this.lista = result; // actualizo lista con archivo
                resolve(this.lista);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    getProductById = function (id) {
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

    getProductByCode = function (code) {
        return new Promise(async (resolve, reject) => {

            try {
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // actualizo lista con archivo
                    resolve(this.lista.find((element) => element.code == code) || `Code Not Found`);
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



export default ProductManager;

