
import Product from './Product.js';
import FileManager from '../FileSystem/FileManager.js'

class ProductManager {
    constructor(fs) {
        this.id = 0;
        this.lista = [];
        this.fs = fs;
    }


    seEncuentra = function (code) {
        this.getProductByCode(code).then((result) => {
            console.log('code.....', code )
            console.log('Resultado:', result);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }


    addProduct = function (producto) {
        console.log('valor ', !this.seEncuentra(producto.code));
       if (!this.seEncuentra(producto.code) && producto.esValido()) {
            this.id = this.id + 1;
            this.lista.push(producto);
            this.fs.setArchivo(this.lista);
        } else {console.log(`El producto ${producto.title} ya fué ingresado`)};
    };



    updateProduct = function (producto) {
        if (this.seEncuentra(producto.code) && producto.esValido()) {
            for (let i = 0; i < this.lista.length; i++) {
                if (this.lista[i].code === producto.code) {
                    this.lista[i] = producto;
                    this.fs.setArchivo(this.lista);
                    break; // Para salir del bucle una vez que se ha actualizado el objeto.
                }
            }
        } else console.log('El producto No se encuentra');
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

    getProductByCode = function (code) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.fs.getItemsArchivo();
                this.lista = result; // actualizo lista con archivo
                resolve(this.lista.find((element) => element.code == code) || `Code Not Found`);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };


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


/*id: 
   title:String,
   description:String
   code:String
   price:Number
   stock:Number
   thumbnails:
   status:Boolean
   category:String*/


// Creo 10 productos 
const p1 = new Product('Manzana', 'Fruta Manzana', '1', 500, 20, ['url Manzana1', 'url Manzana2'], true, 'Fruta');
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

console.log('00 - Se crean los 10 productos');



// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
const farchivo = new FileManager('productos.json', 'C:/Proyectos/Coder/04-PrimeraEntrega');
//const farchivo = new FileManager('archivo.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega');
console.log('01- el archivo es', farchivo.archivo);

// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 2 - Se crea el Product Manager');

// le agrego los productos al ProductManager

lp.addProduct(p1);
lp.addProduct(p1);
/*lp.addProduct(p2);
lp.addProduct(p3);
lp.addProduct(p4);
lp.addProduct(p5);
lp.addProduct(p6);
lp.addProduct(p7);
lp.addProduct(p8);
lp.addProduct(p9);
lp.addProduct(p10);
*/

console.log('Paso 3 - Se cargan los 1 productos en el Product Manager');


/*lp.getProducts()
    .then(() => {
        console.log('La lista de productos se ha cargado correctamente:', lp.lista);
    })
    .catch(error => {
        console.error('Error al cargar la lista de productos:', error);
    });*/



lp.seEncuentra(1);


