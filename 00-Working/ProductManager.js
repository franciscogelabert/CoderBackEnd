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


class FileManager {
    constructor(archivo, ruta) {
        this.fs = require('fs');
        this.path = require('path');
        this.archivo = this.path.join(ruta, archivo);
        
    }


    setArchivo(origenDatos) {
        try {
            this.fs.writeFileSync(this.archivo, JSON.stringify(origenDatos), 'utf8');
            console.log('Archivo escrito con éxito');
        } catch (error) {
            console.error('Error al escribir en el archivo:', error);
        }
    }

    getItemsArchivo() {
        try {
            const data = this.fs.readFileSync(this.archivo, 'utf8');
            this.lista = JSON.parse(data);
        } catch (error) {
            console.error('Error al leer el archivo:', error);
        }
    }


    eliminarArchivo() {
        try {
            this.fs.unlinkSync(this.archivo);
            console.log('Archivo eliminado con éxito');
        } catch (error) {
            console.error('Error al eliminar el archivo:', error);
        }
    }

    validarExistenciaArchivo(archivo) {
        try {
            this.fs.existsSync(archivo);
            console.log('El archivo existe');
        } catch (error) {
            console.log('El archivo no existe');
        }
    }
}

class ProductManager {
    constructor(fs) {
        this.id = 0;
        this.lista = [];
        this.fs = fs;
    }

    addProduct = function (producto) {
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        if (!this.seEncuentra(producto.code) && producto.esValido()) {
            this.id = this.id + 1;
            this.lista.push(producto);
            this.fs.setArchivo(this.lista);
        } else console.log(`El producto ${producto.title} ya fué ingresado`);
    };

    updateProduct = function (producto) {
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        for (let i = 0; i < this.lista.length; i++) {
            if (this.lista[i].code === producto.code) {
                this.lista[i] = producto;
                this.fs.setArchivo(this.lista);
                break; // Para salir del bucle una vez que se ha actualizado el objeto.
            }
        }
    };


    // Buscar y eliminar un producto de la lista por su código
    eliminarProductoPorCodigo(code) {
        
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        const productoIndex = this.lista.findIndex(producto => producto.code === code);

        if (productoIndex !== -1) {
            const productoEliminado = this.lista.splice(productoIndex, 1)[0];
            this.fs.setArchivo(this.lista);
            console.log(`Producto con código "${code}" eliminado:`, productoEliminado);
        } else {
            console.log(`Producto con código "${code}" no encontrado en la lista.`);
        }
    }

    getProductById = function (id) {
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        return this.lista[id] || `Not Found`
    };

    getProducts = function () {
        return this.lista;
    };

    seEncuentra(code) {
        return this.getProductByCode(code) != `Not Found`;
    }

    getProductByCode = function (code) {
        this.fs.getItemsArchivo(); // actualizo lista con archivo
        return this.lista.find((element) => element.code == code) || `Not Found`;
    };


}


// Creo 3 productos 
const p1 = new Product('Manzana', 'Fruta Manzana', 20, 'url imagen', 'cod1', 10);
const p2 = new Product('Banana', 'Fruta Banana', 20, 'url imagen', 'cod2', 12);
const p3 = new Product('Naranja', 'Fruta Naranja', 20, 'url imagen', 'cod3', 13);

console.log('Paso 1 - Se crean los 3 productos');



// crea Instancia del Product Manager y setea el nombre del Archivo, el Origen de fatos y la ruta
const farchivo = new FileManager('archivo.json', 'C:/Proyectos/Coder/02-SegundoDesafio');
console.log('00- el archivo es',farchivo.archivo);

// creo el ProductManager
const lp = new ProductManager(farchivo);
console.log('Paso 2 - Se crea el Product Manager');

// le agrego los productos al ProductManager

lp.addProduct(p1);
lp.addProduct(p2);
lp.addProduct(p3);


console.log('Paso 3 - Se cargan los 3 productos en el Product Manager');


const p4 = new Product('Berenjena', 'Verdura Berenjena', 20, 'url imagen', 'cod4', 14);
lp.addProduct(p4);


console.log('Paso 4 - Se carga el 4to producto');



const p5 = new Product('Berenjena', 'Verdura', 20, 'url imagen', 'cod4', 80);
lp.updateProduct(p5);
console.log('se Actualiza el 4to Producto: ');



lp.eliminarProductoPorCodigo('cod3');
console.log('Se elimina el producto cod3: ', lp.lista);

console.log(lp.getProductByCode('cod2'));

farchivo.validarExistenciaArchivo('archivo.json');
