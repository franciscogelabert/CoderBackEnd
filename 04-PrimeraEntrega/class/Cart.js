class Cart {
    constructor(id, lista) {
        this.id = id;
        this.lista = lista;
    }

    addProduct(idPoducto) {
        const findProd = this.lista.find(c => c.IdProd === idPoducto);
        if (findProd) {
            findProd.CantProd++;
        }
        else {
             this.lista.push({ IdProd: idPoducto, CantProd: 1 });
        }

    }
}

export default Cart;
/*

const cart1 = new Cart(1, [{ IdProd: 101, CantProd: 3 }, { IdProd: 102, CantProd: 2 }]);
const cart2 = new Cart(2, [{ IdProd: 103, CantProd: 4 }]);


console.log(cart1);

cart1.addProduct(101);
cart1.addProduct(101);
cart1.addProduct(101);
cart1.addProduct(102);
cart1.addProduct(102);
cart1.addProduct(103);

console.log(cart1);

*/