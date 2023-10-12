
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }

    esValido() {
        return (
            this.title &&
            this.description &&
            this.price &&
            this.thumbnail &&
            this.code &&
            this.stock
        );
    }
}

class ProductManager {
    constructor() {
        this.id = 0;
        this.lista = [];
    }

    addProduct = function (producto) {
        if (!this.seEncuentra(producto.code) && producto.esValido()) {
            this.id = this.id + 1;
            this.lista.push(producto);
        } else console.log(`El producto ${producto.title} ya fué ingresado`);
    };

    updateProduct = function (producto) {
        for (let i = 0; i < this.lista.length; i++) {
            if (this.lista[i].code === producto.code) {
                this.lista[i] = producto;
                console.log(this.lista);
                break; // Para salir del bucle una vez que se ha actualizado el objeto.
            }
        }
    };


    getProductById = function (id) {
        return this.lista[id] || `Not Found`
    };

    getProducts = function () {
        return this.lista;
    };

    seEncuentra(code) {
        return this.getProductByCode(code) != undefined;
    }

    getProductByCode = function (code) {
        return this.lista.find((element) => element.code == code);
    };


    setProductsArchivo = function (nombre) {

        const fs = require('fs').promises;

        console.log("Inicio de la escritura en el archivo (asíncrono)");

        (async () => {
            try {
                await fs.writeFile(nombre, JSON.stringify(this.lista), 'utf8');
                console.log('Archivo escrito con éxito');
            } catch (error) {
                console.error('Error al escribir en el archivo:', error);
            } finally {
                console.log("Fin de la escritura en el archivo (asíncrono)");
            }
        })();
    }






    getProductsArchivo = function (nombre) {

        const fs = require('fs').promises;

        console.log("Inicio de la lectura del archivo (asíncrono)");

        (async () => {
            try {
                const data = await fs.readFile(nombre, 'utf8');
                this.lista = JSON.parse(data);
            } catch (error) {
                console.error('Error al leer el archivo:', error);
            } finally {
                console.log("Fin de la lectura del archivo (asíncrono)");
            }
        })();

    };

/*existeArchivo = function (nombre) {
        const fs = require('fs').promises;
        fs.access(nombre, fs.constants.F_OK, (error) => {
            if (error) {
                console.log('El archivo no existe');
              } else {
                console.log('El archivo existe');
              }
        });
    };
*/

}



// Creo 3 productos 
const p1 = new Product('Manzana', 'Fruta Manzana', 20, 'url imagen', 'cod1', 10);
const p2 = new Product('Banana', 'Fruta Banana', 20, 'url imagen', 'cod2', 12);
const p3 = new Product('Naranja', 'Fruta Naranja', 20, 'url imagen', 'cod3', 13);
const p4 = new Product('Berenjena', 'Verdura Berenjena', 20, 'url imagen', 'cod4', 14);




console.log('Paso 1 - Se crean los 4 pproductos');

// creo el ProductManager
const lp = new ProductManager();
console.log('Paso 2 - Se crea el Product Manager');

// le agrego los productos al ProductManager

lp.addProduct(p1);
lp.addProduct(p2);
lp.addProduct(p3);
lp.addProduct(p4);

console.log('Paso 3 - Se cargan los 4 productos en el Product Manager');


// Guardo en Archivo, obtengo y muestro

lp.setProductsArchivo('productos.json');

console.log('Paso 4 - Se crea Archivo productos.json con los 4 productos nuevos');


//lp.existeArchivo('productos.json');


lp.getProductsArchivo('productos.json');


const p5 = new Product('Berenjena', 'Verdura Berenjena', 20, 'url imagen', 'cod4', 80);
lp.updateProduct(p5);



lp.setProductsArchivo('productos.json');

// muestra la lista de productos
console.log(lp.getProducts());











