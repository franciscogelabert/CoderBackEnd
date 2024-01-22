// product.repository.js
import { productDAO } from '../index.js';

class ProductRepository {
    constructor() {
      this.productDAO = new productDAO();
    }
  
    async getProductById(id) {
      try {
        return await this.productDAO.getProductById(id);
      } catch (error) {
        console.error('Error en ProductRepository.getProductById:', error);
        throw error;
      }
    }
  
    async getProductByCode(code) {
      try {
        return await this.productDAO.getProductByCode(code);
      } catch (error) {
        console.error('Error en ProductRepository.getProductByCode:', error);
        throw error;
      }
    }
  
    async getAllProducts() {
      try {
        return await this.productDAO.getProducts();
      } catch (error) {
        console.error('Error en ProductRepository.getAllProducts:', error);
        throw error;
      }
    }
  

    async getProducts() {
      try {
        return await this.productDAO.getProducts();
      } catch (error) {
        console.error('Error en ProductRepository.getProducts:', error);
        throw error;
      }
    }

    async addProduct(productData) {
      try {
        return await this.productDAO.addProduct(productData);
      } catch (error) {
        console.error('Error en ProductRepository.addProduct:', error);
        throw error;
      }
    }
  
    async updateProductById(id, productData) {
      try {
        return await this.productDAO.updateProductById(id, productData);
      } catch (error) {
        console.error('Error en ProductRepository.updateProductById:', error);
        throw error;
      }
    }
  
    async deleteProductById(id) {
      try {
        return await this.productDAO.deleteProductById(id);
      } catch (error) {
        console.error('Error en ProductRepository.deleteProductById:', error);
        throw error;
      }
    }
  
    async getPaginatedProducts(page, limit, sort, category) {
      try {
        return await this.productDAO.getPaginatedProducts(page, limit, sort, category);
      } catch (error) {
        console.error('Error en ProductRepository.getPaginatedProducts:', error);
        throw error;
      }
    }
  
    async decrementStockById(id, cantidad) {
      try {
        return await this.productDAO.decrementStockById(id, cantidad);
      } catch (error) {
        console.error('Error en ProductRepository.decrementStockById:', error);
        throw error;
      }
    }
  
    async isStockAvailable(id) {
      try {
        return await this.productDAO.isStockAvailable(id);
      } catch (error) {
        console.error('Error en ProductRepository.isStockAvailable:', error);
        throw error;
      }
    }
  
    async seEncuentra(codigo) {
      try {
        return await this.productDAO.seEncuentra(codigo);
      } catch (error) {
        console.error('Error en ProductRepository.seEncuentra:', error);
        throw error;
      }
    }
  
    async deleteProductByCode(codigo) {
      try {
        return await this.productDAO.deleteProductByCode(codigo);
      } catch (error) {
        console.error('Error en ProductRepository.deleteProductByCode:', error);
        throw error;
      }
    }
  }
  
  export default ProductRepository;