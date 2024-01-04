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
