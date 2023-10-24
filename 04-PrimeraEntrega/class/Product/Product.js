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
}

export default Product;
