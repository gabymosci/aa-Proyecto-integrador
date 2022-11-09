import express from 'express';
// const {getProducts, getProduct, postProduct, putProduct, deleteProduct} = require('../controllers/products');
import controller from '../controllers/productscart.js';


const router = express.Router();

////////////////////////////////////////////////////////////////////////////////
//                                 GET Routes                                 //
////////////////////////////////////////////////////////////////////////////////

// router.get('/', getProducts);
router.get('/', controller.getProductsCart);

router.get('/:id', controller.getProductCart);


///////////////////////////////////////////////////////////////////////////////
//                                POST Routes                                //
///////////////////////////////////////////////////////////////////////////////

router.post('/', controller.postProductCart);


//////////////////////////////////////////////////////////////////////////////
//                                PUT Routes                                //
//////////////////////////////////////////////////////////////////////////////

router.put('/:id', controller.putProductCart);


///////////////////////////////////////////////////////////////////////////////
//                               DELETE Routes                               //
///////////////////////////////////////////////////////////////////////////////
router.delete('/:id', controller.deleteProductCart);

// Método con CommonJS
// module.exports = router;

// Método con ES Modules
export default router;
