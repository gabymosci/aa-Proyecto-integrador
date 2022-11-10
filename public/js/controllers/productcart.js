import productCartService from '../services/productcart.js';

class ProductCartController {

    async getProductCart(id) {
        // console.log('getProductCart:', id);
        const productCart = await productCartService.getProductCart(id);
        return productCart;
    }

    async getProductsCart() {
        // console.log('getProductsCart:');
        const productsCart = await productCartService.getProductsCart();
        return productsCart;
    }

    async saveProductCart(productCart) {
        // console.log('saveProductCart:', productCart);
        const savedProductCart = await productCartService.saveProductCart(productCart);
        return savedProductCart;
    }

    async updateProductCart(id, productCart) {
        // console.log('updateProductCart:', id, productCart);
        const updatedProductCart = await productCartService.updateProductCart(id, productCart);
        return updatedProductCart;
    }

    async deleteProductCart(id) {
        // console.log('deleteProductCart:', id);
        const deletedProductCart = await productCartService.deleteProductCart(id);
        return deletedProductCart;
    }

}

const productCartController = new ProductCartController();
export default productCartController;

