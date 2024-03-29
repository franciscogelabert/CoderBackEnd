import { productModel } from '../models/index.js';

class productDAO {
    constructor() {
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
                    resolve(false);
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

    async deleteProductByCode(codigo) {
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

    async deleteProductById(id) {
        try {
            // Utiliza el método deleteOne para eliminar un producto por su código
            const resultado = await productModel.deleteOne({ _id: id });

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

    async updateProductById(id, producto) {
        try {
            const resultado = await productModel.updateOne({ _id: id }, { $set: producto });

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

    getProducts = function () {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await productModel.find();
                this.lista = result; // actualizo lista con la Base de datos
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
                const result = await productModel.findById(id);
                if (result) {
                    resolve(result);
                } else {
                    resolve(false);
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    }


    getProductByCode = function (code) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await productModel.find({ code: code });
                if (result && result.length > 0) {
                    resolve(result);
                } else {
                    reject(new Error('Producto no encontrado'));
                }
            } catch (error) {
                console.error('Error:', error);
                reject(error);
            }
        });
    };


    async getPaginatedProducts(page, limit, sort, category) {
        try {
            const options = {
                page: page,
                limit: limit,
                sort: { price: sort },
                lean: true
            };
            const query = {};

            // Agregar filtro por categoría si se proporciona
            if (category) {
                query.category = category;
            }

            const result = await productModel.paginate(query, options);
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };


    async decrementStockById(id, cantidad) {
        try {
            // Buscar el producto por su ID
            const producto = await productModel.findById(id);

            if (!producto) {
                console.log('Producto no encontrado.');
                return false;
            }

            // Verificar que hay suficiente stock para decrementar
            if (producto.stock >= cantidad) {
                // Calcular el nuevo stock
                const nuevoStock = producto.stock - cantidad;

                // Actualizar el stock en la base de datos
                const resultado = await productModel.updateOne({ _id: id }, { $set: { stock: nuevoStock } });

                if (resultado.modifiedCount === 1) {
                    console.log('Stock decrementado correctamente. Nuevo stock:', nuevoStock);
                    return true;
                } else {
                    console.log('Error al decrementar el stock.');
                    return false;
                }
            } else {
                console.log('No hay suficiente stock para decrementar.');
                return false;
            }
        } catch (error) {
            console.error('Error al decrementar el stock:', error);
            throw error;
        }
    }

    async isStockAvailable(id) {
        try {
            const objectId = mongoose.Types.ObjectId(id);
            const producto = await productModel.findById(objectId);
    
            if (!producto) {
                console.log('Producto no encontrado.');
                return false;
            }
    
            return producto.stock > 0;
        } catch (error) {
            console.error('Error al verificar el stock:', error);
            throw error;
        }
    }

}

export default productDAO;

