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
            this.title !== '' &&
            this.description !== '' &&
            !isNaN( this.price) && // Verifica que 'price' sea un número
            this.thumbnail !== '' &&
            this.code !== '' &&
            !isNaN( this.stock) // Verifica que 'stock' sea un número
        );
    }
}

export default Product;


const p1 = new Product('Manzana', 'Fruta Manzana', 20, 'url imagen', 'cod1', 10);

const esValido = p1.esValido(); // Llama al método y almacena su resultado

console.log(esValido); // Imprime el resultado (true o false) en lugar de los valores de los campos
