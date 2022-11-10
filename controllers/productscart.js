import api from '../api/productscart.js';


////////////////////////////////////////////////////////////////////////////////
//                                 GET Controller                             //
////////////////////////////////////////////////////////////////////////////////

const getProductsCart = async (req, res) => {
    res.json(await api.getProductsCart());
};

const getProductCart = async(req, res) => {
    const id = req.params.id;
    res.json(await api.getProductCart(id));
};


///////////////////////////////////////////////////////////////////////////////
//                                POST Controller                            //
///////////////////////////////////////////////////////////////////////////////

const postProductCart = async (req, res) => {
    const productCart = req.body;
    const newProductCart = await api.createProductCart(productCart);
    res.json(newProductCart);
};


///////////////////////////////////////////////////////////////////////////////
//                                PUT Controller                             //
///////////////////////////////////////////////////////////////////////////////

const putProductCart = async (req, res) => {
    const id = req.params.id;
    const productCart = req.body;

    const updatedProductCart = await api.updateProductCart(id, productCart);
    res.json(updatedProductCart);
};


///////////////////////////////////////////////////////////////////////////////
//                               DELETE Controller                           //
///////////////////////////////////////////////////////////////////////////////

const deleteProductCart = async (req, res) => {
    const id = req.params.id;
    const removedProductCart = await api.deleteProductCart(id);
    res.json(removedProductCart);
};


export default {
    getProductsCart,   //getProducts: getProducts
    getProductCart,
    postProductCart,
    putProductCart,
    deleteProductCart
};
