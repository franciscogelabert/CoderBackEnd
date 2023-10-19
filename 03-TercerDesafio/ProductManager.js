import Product from './Product.js';
import FileManager from './FileManager.js';

class ProductManager {
    constructor(fs) {
        this.id = 0;
        this.lista = [];
        this.fs = fs;
    }

    addProduct = function (producto) {
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        if (!this.seEncuentra(producto.code) && producto.esValido()) {
            this.id = this.id + 1;
            this.lista.push(producto);
            this.fs.setArchivo(this.lista);
        } else console.log(`El producto ${producto.title} ya fué ingresado`);
    };

    updateProduct = function (producto) {
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        for (let i = 0; i < this.lista.length; i++) {
            if (this.lista[i].code === producto.code) {
                this.lista[i] = producto;
                this.fs.setArchivo(this.lista);
                break; // Para salir del bucle una vez que se ha actualizado el objeto.
            }
        }
    };


    // Buscar y eliminar un producto de la lista por su código
    eliminarProductoPorCodigo(code) {

        this.fs.getItemsArchivo(); // actualizo lista con archivo
        const productoIndex = this.lista.findIndex(producto => producto.code === code);

        if (productoIndex !== -1) {
            const productoEliminado = this.lista.splice(productoIndex, 1)[0];
            this.fs.setArchivo(this.lista);
            console.log(`Producto con código "${code}" eliminado:`, productoEliminado);
        } else {
            console.log(`Producto con código "${code}" no encontrado en la lista.`);
        }
    }

    getProductById = function (id) {
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        return this.lista[id] || `Not Found`
    };

    getProducts = function () {
        return this.lista;
    };

    seEncuentra(code) {
        return this.getProductByCode(code) != `Not Found`;
    }

    getProductByCode = function (code) {
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        return this.lista.find((element) => element.code == code) || `Not Found`;
    };
}

export default ProductManager;

// Creo 4 productos 
const p1 = new Product('Manzana', 'Fruta Manzana', 20, 'url imagen', 'cod1', 10);
const p2 = new Product('Banana', 'Fruta Banana', 20, 'url imagen', 'cod2', 12);
const p3 = new Product('Naranja', 'Fruta Naranja', 20, 'url imagen', 'cod3', 13);
const p4 = new Product('Berenjena', 'Verdura Berenjena', 20, 'url imagen', 'cod4', 14);
const p5 = new Product('Berenjena', 'Lechuga', 20, 'url imagen', 'cod5', 85);

console.log('Paso 1 - Se crean los 4 productos');



// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
const farchivo = new FileManager('archivo.json', 'C:/Proyectos/Coder/03-TercerDesafio');
console.log('00- el archivo es', farchivo.archivo);

// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 2 - Se crea el Product Manager');

// le agrego los productos al ProductManager

lp.addProduct(p1);
lp.addProduct(p2);
lp.addProduct(p3);
lp.addProduct(p4);
lp.addProduct(p5);

console.log('Paso 3 - Se cargan los 5 productos en el Product Manager'); 



