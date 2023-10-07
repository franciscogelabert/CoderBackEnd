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
  
  class ProductManager {
    constructor() {
      this.id = 0;
      this.lista = [];
    }
  
    addProduct = function (producto) {
      if (!this.seEncuentra(producto.code) && producto.esValido()) {
        this.id = this.id + 1;
        this.lista.push(producto);
      } else console.log(`El producto ${producto.title} ya fué ingresado`);
    };
  
    getProductById = function (id) {
        return this.lista[id] || `Not Found`
     };
  
    seEncuentra(code) {
      return this.getProductByCode(code) != undefined;
    }
  
    getProductByCode = function (code) {
      return this.lista.find((element) => element.code == code);
    };
  
    getProducts = function () {
      return this.lista;
    };
  }
  
  
  