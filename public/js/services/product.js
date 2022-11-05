import http from '/js/clients/http.js';

class ProductService {
    URL_PRODUCT = '/api/products/';

    async getProduct(id) {
        const product = await http.get(this.URL_PRODUCT, id);
        return product;
    }

    async getProducts() {
        const products = await http.get(this.URL_PRODUCT);
        return products;
    }
    
    async saveProduct(product) {
        const savedProduct = await http.post(this.URL_PRODUCT, product);
        return savedProduct;
    }
    
    async updateProduct(id, product) {
        const updatedProduct = await http.put(this.URL_PRODUCT, id, product);
        return updatedProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await http.delete(this.URL_PRODUCT, id);
        return deletedProduct;
    }

}

const productService = new ProductService();

export default productService;
