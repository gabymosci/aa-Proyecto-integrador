import http from '/js/clients/http.js';

class ProductCartService {
    URL_PRODUCT_CART = '/api/productscart/';

    async getProductCart(id) {
        const productCart = await http.get(this.URL_PRODUCT_CART, id);
        return productCart;
    }

    async getProductsCart() {
        const productsCart = await http.get(this.URL_PRODUCT_CART);
        return productsCart;
    }
    
    async saveProductCart(productCart) {
        const savedProductCart = await http.post(this.URL_PRODUCT_CART, productCart);
        return savedProductCart;
    }
    
    async updateProductCart(id, productCart) {
        const updatedProductCart = await http.put(this.URL_PRODUCT_CART, id, productCart);
        return updatedProductCart;
    }

    async deleteProductCart(id) {
        const deletedProductCart = await http.delete(this.URL_PRODUCT_CART, id);
        return deletedProductCart;
    }

}

const productCartService = new ProductCartService();

export default productCartService;
