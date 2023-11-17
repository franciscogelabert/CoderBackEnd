import Product from './Product.js';
import { productModel } from '../../class/Dao/MongoDB/models/user.model.js';


class ProductManagerDB {
    constructor(fs) {
        this.id = 0;
        this.lista = [];
    }

    seEncuentra = function (codigo) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await productModel.find({ code: codigo });
                if (result.length > 0) {
                    resolve(result);
                } else {
                    resolve('Code Not Found');
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    }


    addProduct = function (producto) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await productModel.find({ code: producto.code });
                if (result.length > 0) {
                    console.log('NO se puede insertar el producto porque ya se encuentra el código', producto.code);
                } else {
                    const nuevoProducto = await productModel.create(producto);
                    console.log('Producto insertado:', nuevoProducto);
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    }

    async eliminarProductoPorCodigo(codigo) {
        try {
            // Utiliza el método deleteOne para eliminar un producto por su código
            const resultado = await productModel.deleteOne({ code: codigo });

            if (resultado.deletedCount === 1) {
                console.log('Producto eliminado correctamente.');
                return true;
            } else {
                console.log('Producto a Eliminar no encontrado.');
                return false;
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error; // Puedes manejar el error aquí o lanzarlo para que sea manejado en otro lugar
        }
    }


    async updateProductByCode(code, producto) {
        try {
            const resultado = await productModel.updateOne({ code: code }, { $set: producto });

            if (resultado.modifiedCount === 1) {
                console.log('Producto actualizado correctamente.', resultado);
                return true;
            } else {
                console.log('Producto no encontrado o no actualizado.', resultado);
                return false;
            }
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error; // Puedes manejar el error aquí o lanzarlo para que sea manejado en otro lugar
        }
    }
}

export default ProductManagerDB;


const lpdb = new ProductManagerDB;

lpdb.seEncuentra(121)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

const nuevoProducto = {
    title: 'Producto Nuevo',
    description: 'Descripción del producto',
    code: 126,
    price: 19.99,
    stock: 100,
    thumbnail: ['imagen1.jpg', 'imagen2.jpg'],
    estado: true,
    category: 'Electrónica'
};

lpdb.addProduct(nuevoProducto)
    .then((productoInsertado) => {
        // Hacer algo con el producto insertado, si es necesario
    })
    .catch((error) => {
        // Manejar el error, si es necesario
    });

lpdb.eliminarProductoPorCodigo(456)
    .then((productoEliminado) => {
        // Hacer algo con la información de si el producto fue eliminado o no
    })
    .catch((error) => {
        // Manejar el error, si es necesario
    });


    const nuevoProductoActualizado = {
        title: 'Manzana Backend 6',
        description: 'Descripción del producto',
        code: 122,
        price: 25,
        stock: 100,
        thumbnail: ['imagen11.jpg', 'imagen12.jpg'],
        estado: true,
        category: 'Fruta'
    };
    

lpdb.updateProductByCode(121, nuevoProductoActualizado)
    .then((productoActualizado) => {
        // Hacer algo con la información de si el producto fue actualizado o no
    })
    .catch((error) => {
        // Manejar el error, si es necesario
    });