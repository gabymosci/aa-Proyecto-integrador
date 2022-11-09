import config from '../config.js';
// import Model from '../models/products-mem.js';
// import Model from '../models/products-fs.js';
// import Model from '../models/products-mongodb.js';
import Model from '../models/productscart.js';

// const model = new Model();
// const model = Model.get('MEM');
// const model = Model.get('FILE');
const model = Model.get(config.PERSISTENCE_TYPE);

///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////
const getProductsCart = async () => {
    const productsCart = await model.readProductsCart();
    return productsCart;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get One                                //
///////////////////////////////////////////////////////////////////////////////
const getProductCart = async id => {
    const productCart = await model.readProductCart(id);
    return productCart;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Create                                 //
////////////////////////////////////////////////////////////////////////////////

const createProductCart = async productCart => {
    const createdProductCart = await model.createProductCart(productCart);
    return createdProductCart;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Update                                 //
////////////////////////////////////////////////////////////////////////////////

const updateProductCart = async (id, productCart) => {
    const updatedProductCart = await model.updateProductCart(id, productCart);
    return updatedProductCart;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Delete                                 //
////////////////////////////////////////////////////////////////////////////////

const deleteProductCart = async id => {
    const removedProductCart = await model.deleteProductCart(id);
    return removedProductCart;
};


export default {
    getProductsCart,
    getProductCart,
    createProductCart,
    updateProductCart,
    deleteProductCart
};
