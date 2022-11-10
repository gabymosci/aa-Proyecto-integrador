import config, { PERSISTENCE_TYPE,  } from "../config.js";
import ProductCartModelMem from "./productscart-mem.js";
// import ProductCartModelFile from "./productscart-fs.js";
import ProductCartModelMongoDB from "./productscart-mongodb.js";


class ProductCartModel {
    static get(type) {
        switch (type) {
            case PERSISTENCE_TYPE.TYPE_MEM: 
                return new ProductCartModelMem();
            // case PERSISTENCE_TYPE.TYPE_FILE:
            //     return new ProductCartModelFile();
            case PERSISTENCE_TYPE.TYPE_MONGODB:
                return new ProductCartModelMongoDB();
            default:
                return new ProductCartModelMem();
        }
    }
}

export default ProductCartModel;
