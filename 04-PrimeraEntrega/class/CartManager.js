
import Cart from '../class/Cart.js';
import FileManager from '../class/FileManager.js';


class CartManager {
    constructor(fs) {
        this.lista = [];
        this.fs = fs;
    }

    addCart(cart) {
        const findCart = this.lista.find(c => c.id === cart.id)
        if (!findCart) {
            this.lista.push(cart);
            this.fs.setArchivo(this.lista);
        }
        else {
            console.log('ya se encuentra agregado el carrito')
        }
    }

    addProductCart(idProduct, idCart) {
        const findCart = this.lista.find(c => c.id === idCart)
        console.log(findCart);
        if (findCart) {
            findCart.addProduct(idProduct);
            this.fs.setArchivo(this.lista);
        }
        else {
            console.log('No se encontró ningún Carrito con ID: ', idCart)
        }
    }

    getCarts = function () {
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
    getCartsById = function (id) {
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
    }



}

export default CartManager;

const cart1 = new Cart(1, [{ IdProd: 101, CantProd: 3 }, { IdProd: 102, CantProd: 2 }]);
const cart2 = new Cart(2, [{ IdProd: 103, CantProd: 4 }]);
const cart3 = new Cart(3, [{ IdProd: 104, CantProd: 5 }]);
const cart4 = new Cart(2, [{ IdProd: 104, CantProd: 5 }]);

console.log('00- Se crean los 3 carritos');


// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
const farchivo = new FileManager('carrito.json', 'C:/Proyectos/Coder/04-PrimeraEntrega');
//const farchivo = new FileManager('carrito.json', 'C:/Coderhouse/Backend/04-PrimeraEntrega');
console.log('01- el archivo es', farchivo.archivo);

// creo el ProductManager
const lc = new CartManager(farchivo);
console.log('02 - Se crea el Cart Manager');

// le agrego los productos al ProductManager

lc.addCart(cart1);
lc.addCart(cart2);
lc.addCart(cart3);
lc.addCart(cart4);

console.log('03 - Se cargan los 3 carritos en el Cart Manager');

lc.addProductCart(101, 1);
console.log('04 - Se Actualiza producto 101 en carrito 1');

lc.addProductCart(102, 1);
console.log('05 - Se Actualiza producto 102 en carrito 1');
console.log(lc.lista);

lc.getCarts()
    .then(() => {
        console.log('La lista de Carritos se ha cargado correctamente:', lc.lista);
    })
    .catch(error => {
        console.error('Error al cargar la lista de productos:', error);
    });


lc.getCartsById(2).then((result) => {
    console.log('Resultado:', result);
}).catch((error) => {
    console.error('Error:', error);
});
