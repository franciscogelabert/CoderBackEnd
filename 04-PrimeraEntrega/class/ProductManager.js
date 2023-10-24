class ProductManager {
    constructor(fs) {
        this.id = 0;
        this.lista = [];
        this.fs = fs;
    }

    addProduct = function (producto) {
        if (!this.seEncuentra(producto.code) && producto.esValido()) {
            this.id = this.id + 1;
            this.lista.push(producto);
            this.fs.setArchivo(this.lista);
        } else console.log(`El producto ${producto.title} ya fué ingresado`);
    };

 

    updateProduct = function (producto) {
        if (this.seEncuentra(producto.code) && producto.esValido()) {
            for (let i = 0; i < this.lista.length; i++) {
                if (this.lista[i].code === producto.code) {
                    this.lista[i] = producto;
                    this.fs.setArchivo(this.lista);
                    break; // Para salir del bucle una vez que se ha actualizado el objeto.
                }
            }
        } else console.log('El producto No se encuentra');
    };


    // Buscar y eliminar un producto de la lista por su código
    eliminarProductoPorCodigo(code) {
        const productoIndex = this.lista.findIndex(producto => producto.code === code);

        if (productoIndex !== -1) {
            const productoEliminado = this.lista.splice(productoIndex, 1)[0];
            this.fs.setArchivo(this.lista);
            console.log(`Producto con código "${code}" eliminado:`, productoEliminado);
        } else {
            console.log(`Producto con código "${code}" no encontrado en la lista.`);
        }
    }


    getProducts = function () {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.fs.getItemsArchivo();
                this.lista = result; // actualizo lista con archivo
                resolve(this.lista);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    getProductById = function (id) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.fs.getItemsArchivo();
                this.lista = result; // actualizo lista con archivo
                resolve(this.lista[id] || `Id Product Not Found`);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    getProductByCode = function (code) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.fs.getItemsArchivo();
                this.lista = result; // actualizo lista con archivo
                resolve(this.lista.find((element) => element.code == code) || `Code Not Found`);
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };

    seEncuentra(code) {
        this.getProductByCode(code).then((result) => {
            console.log('Resultado:', result);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
}

export default ProductManager;