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

export default Product;
