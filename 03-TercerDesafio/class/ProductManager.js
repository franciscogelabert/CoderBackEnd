import FileManager from '../class/FileManager.js';
import Product from '../class/Product.js';


class ProductManager {
    constructor(fs) {
        this.id = 0;
        this.lista = [];
        this.fs = fs;
    }

    addProduct = function (producto) {
        if (!this.seEncuentra(producto.code) && producto.esValido()) {
            this.id = this.id + 1;
            this.lista.push(producto);
            this.fs.setArchivo(this.lista);
        } else console.log(`El producto ${producto.title} ya fué ingresado`);
    };

    updateProduct = function (producto) {
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
                resolve(this.lista[id] || `Not Found`);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    getProductByCode = function (code) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.fs.getItemsArchivo();
                this.lista = result; // actualizo lista con archivo
                resolve(this.lista.find((element) => element.code == code) || `Not Found`);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    seEncuentra(code) {
        this.getProductByCode(code).then((result) => {
            console.log('Resultado:', result);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
}

export default ProductManager;


/*

// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
//const farchivo = new FileManager('archivo.json', 'C:/Proyectos/Coder/03-TercerDesafio');
const farchivo = new FileManager('archivo.json', 'C:/Coderhouse/Backend/03-TercerDesafio');
console.log('00- el archivo es', farchivo.archivo);

// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 2 - Se crea el Product Manager');


lp.getProductById(1).then((result) => {
    console.log('Resultado:', result);
}).catch((error) => {
    console.error('Error:', error);
});

lp.getProductByCode('cod4').then((result) => {
    console.log('Resultado:', result);
}).catch((error) => {
    console.error('Error:', error);
});


lp.getProducts()
  .then(() => {
    console.log('La lista de productos se ha cargado correctamente:', lp.lista);
  })
  .catch(error => {
    console.error('Error al cargar la lista de productos:', error);
  });

*/


/*


// Creo 10 productos 
const p1 = new Product('Manzana', 'Fruta Manzana', 20, 'url imagen', 'cod1', 10);
const p2 = new Product('Banana', 'Fruta Banana', 20, 'url imagen', 'cod2', 12);
const p3 = new Product('Naranja', 'Fruta Naranja', 20, 'url imagen', 'cod3', 13);
const p4 = new Product('Berenjena', 'Verdura Berenjena', 20, 'url imagen', 'cod4', 14);
const p5 = new Product('Lechuga', 'Lechuga', 20, 'url imagen', 'cod5', 95);
const p6 = new Product('Mandarina', 'Fruta Mandarina', 15, 'url imagen', 'cod6', 54);
const p7 = new Product('Uva', 'Fruta Uva', 15, 'url imagen', 'cod7', 45);
const p8 = new Product('Kiwi', 'Fruta Kiwi', 15, 'url imagen', 'cod8', 12);
const p9 = new Product('Ananá', 'Fruta Ananá', 20, 'url imagen', 'cod9', 20);
const p10 = new Product('Acelga', 'Acelga', 20, 'url imagen', 'cod10', 30);


console.log('Paso 1 - Se crean los 10 productos');



// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
//const farchivo = new FileManager('archivo.json', 'C:/Proyectos/Coder/03-TercerDesafio');
const farchivo = new FileManager('archivo.json', 'C:/Coderhouse/Backend/03-TercerDesafio');
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
lp.addProduct(p6);
lp.addProduct(p7);
lp.addProduct(p8);
lp.addProduct(p9);
lp.addProduct(p10);

console.log('Paso 3 - Se cargan los 5 productos en el Product Manager');


lp.getProducts()
    .then(() => {
        console.log('La lista de productos se ha cargado correctamente:', lp.lista);
    })
    .catch(error => {
        console.error('Error al cargar la lista de productos:', error);
    });


*/


