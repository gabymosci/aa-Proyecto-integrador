
class ProductCartModelMem {

    productsCart = [];
    lastProductCartId = '0';

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async createProductCart (productCart) {
        productCart.id = String(++this.lastProductCartId);
        this.productsCart.push(productCart);

        console.log('--------- Producto comprado ' + new Date().toLocaleString() + '---------\n', productAddedToCart);
        
        return productCart;
    }


    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////

    async readProductsCart () {
        return this.productsCart;
    }

    async readProductCart (id) {
        return this.productsCart.find( productCart => productCart.id === id ) || {};
    }


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async updateProductCart (id, productCart) {
        productCart.id = id;

        const index = this.productsCart.findIndex( productCart => productCart.id === id );
        // Si no se encontró
        if (index === -1) {
            return {};
        }
        this.productsCart[index] = productCart;
        return productCart;
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////

    async deleteProductCart (id) {
        const index = this.productsCart.findIndex( productCart => productCart.id === id);
        // Si no se encontró
        if (index === -1) {
            return {};
        }
        const removedProductCart = this.productsCart.splice(index, 1)[0];
        return removedProductCart;
    }

}

export default ProductCartModelMem;
