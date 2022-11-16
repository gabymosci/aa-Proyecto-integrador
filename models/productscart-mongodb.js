import mongoose from 'mongoose';
import DBMongoDB from './DB/MongoDB.js';

const productCartSchema = mongoose.Schema({
    productId: String,
    name: String,
    image: String,
    price: Number,
    qty: Number,
    partial: Number,
    time: String,
    paidUp : Boolean
});

// Modelo del documento almacenado en la colección
const ProductsCartModel = mongoose.model('productscarts', productCartSchema);

class ProductCartModelMongoDB {

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async createProductCart (productCart) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            const newProductCart = new ProductsCartModel(productCart);
            await newProductCart.save();
            const productAddedToCart = DBMongoDB.getObjectWithId(newProductCart.toObject());

            console.log('--------- Producto comprado ' + new Date().toLocaleString() + '---------\n', productAddedToCart);
            
            return productAddedToCart;
        } catch (error) {
            console.error('Error al intentar dar de alta el producto:', error.message);
            return {};
        }

    }


    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////

    async readProductsCart () {
        if (! await DBMongoDB.connectDB()) {
            return [];
        }
        try {
            const productsCart = await ProductsCartModel.find({}).lean();
            return DBMongoDB.getObjectWithId(productsCart);
        } catch (error) {
            console.error('Error al intentar leer los productos:', error.message);
            return [];
        }
        
    }

    async readProductCart (id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            // const productsCart = await ProductsCartModel.find({_id: id});
            // if (!productsCart.length) {
            //     return {};
            // }
            // return productsCart[0];
            // const productCart = await ProductsCartModel.findOne({_id: id}) || {};
            // return productCart;
            const productCart = await ProductsCartModel.findById(id).lean() || {};
            return DBMongoDB.getObjectWithId(productCart);
        } catch (error) {
            console.error(`Error al intentar leer el producto #:${id}`, error.message);
        }
        return {};
    }


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async updateProductCart (id, productCart) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            // const updatedProductCart = await ProductsCartModel.updateOne({_id: id}, {$set: productCart});
            // console.log('updatedProductCart:', updatedProductCart);
            
            // const updatedProductCart = await ProductsCartModel.findOneAndUpdate({_id: id}, {$set: productCart});
            // const updatedProductCart = await ProductsCartModel.findOneAndUpdate({_id: id}, {$set: product}, {
            //     returnDocument: 'after'
            // });
            const updatedProductCart = await ProductsCartModel.findByIdAndUpdate(id, {$set: productCart}, {
                returnDocument: 'after'
            }).lean() || {};
            return DBMongoDB.getObjectWithId(updatedProductCart);
        } catch (error) {
            console.error(`Error al intentar actualizar el producto #:${id}`, error.message);
            return {};
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////

    async deleteProductCart (id) {
        if (! await DBMongoDB.connectDB()) {
            return {};
        }
        try {
            // await ProductsCartModel.deleteOne({_id: id});
            const deletedProductCart = await ProductsCartModel.findByIdAndDelete(id).lean() || {};
            return DBMongoDB.getObjectWithId(deletedProductCart);
        } catch (error) {
            console.error(`Error al intentar eliminar el producto #:${id}`, error.message);
            return {};
        }
    }

}

export default ProductCartModelMongoDB;
