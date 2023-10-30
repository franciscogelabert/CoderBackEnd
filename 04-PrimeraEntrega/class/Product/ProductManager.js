
import FileManager from '../FileSystem/FileManager.js';
import Product from './Product.js';



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
                if (this.fs.archivo && this.fs.validarExistenciaArchivo(this.fs.archivo)) {
                    const result = await this.fs.getItemsArchivo();
                    this.lista = result; // actualizo lista con archivo
                    const productoIndex = this.lista.findIndex(producto => producto.code === code);
                    if (productoIndex !== -1) {
                        const productoEliminado = this.lista.splice(productoIndex, 1)[0];
                        this.fs.setArchivo(this.lista);
                        console.log(`Producto con código "${code}" eliminado:`, productoEliminado);
                        resolve(true);
                    } else {
                        console.log(`Producto con código "${code}" no encontrado en la lista.`);
                        resolve(false);
                    }
                }
                else {
                    console.log('El archivo no existe');
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

/*


// Creo 12 productos
const p1 = new Product('Manzana', 'Fruta Manzana', 1, 500, 20, ['url Manzana1', 'url Manzana2'], true, 'Fruta');
const p2 = new Product('Pera', 'Fruta Pera', 2, 600, 21, ['url Pera1', 'url Pera2'], true, 'Fruta');
const p3 = new Product('Uva', 'Fruta Uva', 3, 700, 30, ['url Uva1'], true, 'Fruta');
const p4 = new Product('Banana', 'Fruta Banana', 4, 300, 31, ['url Banana1', 'url Banana2'], true, 'Fruta');
const p5 = new Product('Kiwi', 'Fruta Kiwi', 5, 700, 40, ['url Kiwi1', 'url Kiwi2', 'url Kiwi3'], true, 'Fruta');
const p6 = new Product('Naranja', 'Fruta Naranja', 6, 800, 41, [], true, 'Fruta');
const p7 = new Product('Lechuga', 'Verdura Lechuga', 7, 300, 12, ['url Lechuga1'], true, 'Verdura');
const p8 = new Product('Acelga', 'Verdura Acelga', 8, 100, 13, ['url Acelga1', 'url Acelga2'], true, 'Verdura');
const p9 = new Product('Rúcula', 'Verdura Rúcula', 9, 700, 15, [], true, 'Verdura');
const p10 = new Product('Rabanito', 'Verdura Rabanito', 10, 900, 8, ['url Rabanito1', 'url Rabanito2', 'url Rabanito3'], true, 'Verdura');
const p11 = new Product('Apio', 'Verdura Apio', 11, 1500, 17, ['url Apio1', 'url Apio2'], true, 'Verdura');
const p12 = new Product('Choclo', 'Verdura Remolacha', 12, 540, 15, ['url Remolacha1'], true, 'Verdura');
const p13 = new Product('Coliflor', 'Verdura Coliflor', 13, 540, 15, ['url Coliflor'], true, 'Verdura');
const p14 = new Product('Zapallo', 'Verdura Zapallo', 14, 540, 15, ['url Zapallo'], true, 'Verdura');
console.log('00 - Se crean los 12 productos');



// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
//const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/04-PrimeraEntrega/files');
const farchivo = new FileManager('productos.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega/files');
console.log('01- el archivo es', farchivo.archivo);

// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 2 - Se crea el Product Manager');

// le agrego los productos al ProductManager

lp.addProductByCode(p1);
lp.addProductByCode(p2);
lp.addProductByCode(p3);
lp.addProductByCode(p4);
lp.addProductByCode(p5);
lp.addProductByCode(p6);
lp.addProductByCode(p7);
lp.addProductByCode(p8);
lp.addProductByCode(p9);
lp.addProductByCode(p10);
lp.addProductByCode(p11);
lp.addProductByCode(p12);


console.log('Paso 3 - Se cargan los 12 productos en el Product Manager');
*/

//lp.addProductByCode(p14);

//lp.addProductById(16,p12);

// lp.updateProductById(0, p13); // Modifica P1

// lp.updateProductByCode(3, p14); // Modifica P2
/*

lp.deleteProductByCode(1)
    .then((result) => {
        console.log(result);
    }).catch((error) => {
        console.error('Error:', error);
    });

lp.getProducts()
.then((result) => {
    console.log(result);
}).catch((error) => {
    console.error('Error:', error);
});

lp.getProductById(20)
    .then((result) => {
        console.log(result);
    }).catch((error) => {
        console.error('Error:', error);
    });

lp.getProductByCode(123313)
    .then((result) => {
        console.log(result);
    }).catch((error) => {
        console.error('Error:', error);
    });

lp.seEncuentraID(18)
.then((result) => {
    console.log(result);
}).catch((error) => {
    console.error('Error:', error);
});

*/



