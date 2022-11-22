import express from 'express';
import routerProducts from './routers/products.js';
import routerProductsCart from './routers/productscart.js';
// import ProductModelMongoDB from './models/products-mongodb.js';
import config from './config.js';
import cors from 'cors';



// ***********************ocultar access_token*******************

import mercadopago from 'mercadopago';
mercadopago.configure({
    // access_token: "TEST-1866277456518650-111516-167af884686fe8913a0a42afa8665f56-59138622",    //gmosci
    access_token: "TEST-6055126754063483-112209-0ed2fa572e20b229042ad663a67b9131-1244851160", //test
});



// await ProductModelMongoDB.connectDB();
// ProductModelMongoDB.connectDB();

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());


app.use('/api/products', routerProducts);
app.use('/api/productscart', routerProductsCart);


//////////////////////////////////////////////////////////////////////
//                           Mercado Pago                           //
//////////////////////////////////////////////////////////////////////

app.post("/create_preference", (req, res) => {
	
	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			},
		],
		back_urls: {
			"success": "http://localhost:8080/",
			"failure": "http://localhost:8080/",
			"pending": "http://localhost:8080/"
		},
		// back_urls: {
		// 	"success": "http://localhost:8080/feedback",
		// 	"failure": "http://localhost:8080/feedback",
		// 	"pending": "http://localhost:8080/feedback"
		// },
		auto_return: "approved",
		binary_mode: true,
	};


	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});


const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));
