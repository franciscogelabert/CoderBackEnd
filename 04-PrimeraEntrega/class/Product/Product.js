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

    /*id: 
    title:String,
    description:String
    code:String
    price:Number
    stock:Number
    thumbnails:
    status:Boolean
    category:String*/


    esValido() {
        return (
            this.title &&
            this.description &&
            this.code &&
            this.price &&
            this.stock &&
            this.thumbnail &&
            this.estado &&
            this.category
        );
    }

    esValido() {
        return (
            this.title !== '' &&
            this.description !== '' &&
            !isNaN( this.price) && // Verifica que 'price' sea un número
            this.thumbnail !== '' &&
            this.code !== '' &&
            !isNaN( this.stock) &&// Verifica que 'stock' sea un número
            this.estado &&
            this.category !== ''
        );
    }
}

export default Product;


const p12 = new Product('Remolacha', 'Verdura Remolacha', 12, 540, 15, ['url Remolacha1'], true, 'Verdura');

const esValido = p12.esValido(); // Llama al método y almacena su resultado

console.log(esValido); // Imprime el resultado (true o false) en lugar de los valores de los campos
