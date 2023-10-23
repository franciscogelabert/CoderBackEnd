
import Cart from '../class/Cart.js';

class CartManager {
    constructor(lista) {
        this.lista = lista; //recibe lista de carritos
        /*  Lista de Carts [
            [Id:1 , Lista: [Prod Id:1 Quantity: 2] [Prod Id:3 Quantity: 1]] 
            [Id:2 , Lista: [Prod Id:2 Quantity: 1] [Prod Id:1 Quantity: 4]]
                ]
        */

    }

    addCart(cart) {
        const findCart = this.lista.find(c => c.id === cart.id)
        if (!findCart) { this.lista.push(cart); }
        else {
            console.log('ya se encuentra agregado el carrito')
        }
    }

}

export default CartManager;

/*const cart1 = new Cart(1, [{ IdProd: 101, CantProd: 3 }, { IdProd: 102, CantProd: 2 }]);
const cart2 = new Cart(2, [{ IdProd: 103, CantProd: 4 }]);
const cart3 = new Cart(2, [{ IdProd: 103, CantProd: 4 }]);



const carrito = new CartManager([]);

carrito.addCart(cart1);
carrito.addCart(cart1);
carrito.addCart(cart2);

console.log(carrito);*/