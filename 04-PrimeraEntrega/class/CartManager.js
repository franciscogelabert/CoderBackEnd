
import Cart from '../class/Cart.js';

class CartManager {
    constructor(lista) {
        this.lista = lista; //recibe lista de carritos
          }

   addCart(cart) {
        const findCart = this.lista.find(c => c.id === cart.id)
        if (!findCart) { this.lista.push(cart); }
        else {
            console.log('ya se encuentra agregado el carrito')
        }
    }
    
    addProductCart(idProduct,idCart) {
        const findCart = this.lista.find(c => c.id === idCart)
        console.log(findCart);
        if (findCart) { findCart.addProduct(idProduct); 
            console.log(findCart);}
        else {
            console.log('No se encontró ningún Carrito con ID: ', idCart)
        }
    }
 
}

export default CartManager;

const cart1 = new Cart(1, [{ IdProd: 101, CantProd: 3 }, { IdProd: 102, CantProd: 2 }]);
const cart2 = new Cart(2, [{ IdProd: 103, CantProd: 4 }]);
const cart3 = new Cart(3, [{ IdProd: 104, CantProd: 5 }]);

const carrito = new CartManager([]);

carrito.addCart(cart1);
carrito.addCart(cart2);
carrito.addCart(cart3);

console.log(carrito);
carrito.addProductCart(102,1);
carrito.addProductCart(101,1);
console.log(carrito.lista);

console.log('Lista de productos:', JSON.stringify(carrito.lista, null, 2));
