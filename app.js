import express from 'express';
import routerProducts from './routers/products.js';
import routerProductsCart from './routers/productscart.js';
// import ProductModelMongoDB from './models/products-mongodb.js';
import config from './config.js';

// await ProductModelMongoDB.connectDB();
// ProductModelMongoDB.connectDB();

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/api/products', routerProducts);
app.use('/api/productscart', routerProductsCart);


const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));
