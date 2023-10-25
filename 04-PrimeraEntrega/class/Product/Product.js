class Product {
    constructor(title, description, code, price, stock, thumbnail, estado, category) {
        this.title = title;
        this.description = description;
        this.code = code;
        this.price = price;
        this.stock = stock;
        this.thumbnail = thumbnail;
        this.estado = estado;
        this.category = category;
    }

    esValido() {
        return (
            this.title !== '' &&
            this.description !== '' &&
            !isNaN(this.price) && // Verifica que 'price' sea un número
            this.thumbnail !== '' &&
            this.code !== '' &&
            !isNaN(this.stock) &&// Verifica que 'stock' sea un número
            this.estado &&
            this.category !== ''
        );
    }

    updateProduct(producto) {
        this.title = producto.title;
        this.description = producto.description;
        this.price = producto.price;
        this.thumbnail = producto.thumbnail;
        this.stock = producto.stock;
        this.estado = producto.estado;
        this.category = producto.category;
    }
}

export default Product;


const p12 = new Product('Remolacha', 'Verdura Remolacha', 12, 540, 15, ['url Remolacha1'], true, 'Verdura');

const p13 = new Product('Remolacha2', 'Verdura Remolacha2', 13, 600, 56, ['url Remolacha2'], true, 'Verdura2');

const esValido = p12.esValido(); // Llama al método y almacena su resultado

console.log(esValido); // Imprime el resultado (true o false) en lugar de los valores de los campos
console.log(p12);
p12.updateProduct(p13);
console.log(p12);
