
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


    addProduct = function (producto) {
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

    updateProducts = function (producto) {
        for (let i = 0; i < this.lista.length; i++) {
            if (this.lista[i].code === producto.code) {
                this.lista[i].updateProduct(producto);
                this.fs.setArchivo(this.lista);
                break; // Para salir del bucle una vez que se ha actualizado el objeto.
            }
        }
    };


    // Buscar y eliminar un producto de la lista por su código
    eliminarProductoPorCodigo(code) {
        const productoIndex = this.lista.findIndex(producto => producto.code === code);

        if (productoIndex !== -1) {
            const productoEliminado = this.lista.splice(productoIndex, 1)[0];
            this.fs.setArchivo(this.lista);
            console.log(`Producto con código "${code}" eliminado:`, productoEliminado);
        } else {
            console.log(`Producto con código "${code}" no encontrado en la lista.`);
        }
    }


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
                const result = await this.fs.getItemsArchivo();
                this.lista = result; // actualizo lista con archivo
                resolve(this.lista[id] || `Id Product Not Found`);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

}



export default ProductManager;




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
const p12 = new Product('Remolacha', 'Verdura Remolacha', 12, 540, 15, ['url Remolacha1'], true, 'Verdura');

console.log('00 - Se crean los 12 productos');



// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/04-PrimeraEntrega');
//const farchivo = new FileManager('archivo.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega');
console.log('01- el archivo es', farchivo.archivo);

// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 2 - Se crea el Product Manager');

// le agrego los productos al ProductManager

lp.addProduct(p1);
lp.addProduct(p2);
lp.addProduct(p3);
lp.addProduct(p4);
lp.addProduct(p5);
lp.addProduct(p6);
lp.addProduct(p7);
lp.addProduct(p8);
lp.addProduct(p9);
lp.addProduct(p10);
lp.addProduct(p11);
lp.addProduct(p12);


console.log('Paso 3 - Se cargan los 12 productos en el Product Manager');

