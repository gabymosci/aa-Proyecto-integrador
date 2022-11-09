import config from '../config.js';
// import Model from '../models/products-mem.js';
// import Model from '../models/products-fs.js';
// import Model from '../models/products-mongodb.js';
import Model from '../models/products.js';

// const model = new Model();
// const model = Model.get('MEM');
// const model = Model.get('FILE');
const model = Model.get(config.PERSISTENCE_TYPE);
// creates PARA TESTING:
// model.createProduct({name: 'Licuadora', description: 'Con botón turbo', price: 24000});
// model.createProduct({name: 'TV', description: 'Smart TV de 55 pulgadas', price: 115000});
// model.createProduct({name: 'Parlante', description: 'Con batería', price: 21800});
// model.createProduct({name: 'PlayStation 4', description: 'Con 2 juegos', price: 175000});
// model.createProduct({name: 'PlayStation 5', description: 'Color blanco', price: 290000});

// Todos los productos incluyendo las ofertas del carrousel (propiedad card: true)

model.createProduct({name: 'Cámara digital',price: 4500,stock: 4,brand: 'Samsung',category: 'Educación',shortDescription: 'Es el regalo perfecto que le podrás hacer para que desarrolle sus habilidades creativas',fullDescription: 'Si a tu hija le gusta la fotografía esta cámara digital es uno de los mejores regalos que le podrás hacer para que desarrolle sus habilidades creativas y pueda convertirse en una fotógrafa de élite. Sin duda, uno de los mejores juguetes para niñas de 7 años y uno de los juguetes innovadores para niños. Esta cámara digital para niños contiene una pantalla IPS 2 pulgadas capaz de mostrar imágenes realistas y a una buena calidad, una lente de 5 megapíxeles con gran angular de 100 grados para satisfacer las necesidades de los niños y una tarjeta TF de 32 GB con lo que podrán almacenar más de 1000 fotos. Otra gran ventaja es que no vas a tener que estar pendiente de cambiar la batería. Porque integra una batería recargable que se carga con un cable USB. Cable con el que te podrás conectar a tu ordenador para transferir las imágenes si lo deseas. Entre las funcionalidades de esta cámara digital destaca los 15 marcos de fotos distintos que tiene, los 5 filtros, disparos a intervalos, disparos triples, disparos en espejo. Todas estas funcionalidades ayudaran a tu hija a estimular la creatividad y a capturar todos sus momentos importantes. Es uno de los juguetes de moda para niñas de 7 años.',freeDelivery: 0,fromAge: 7,toAge: 12,ageYM: 'Y',image: 'j-camara_digital.jpg',card: true});
model.createProduct({name: 'Dinosaurio',price: 4499,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-dinosaurio.jpg',card: true});
model.createProduct({name: 'Uno',price: 1200,stock: 12,brand: 'Get Wild',category: 'Infantil',shortDescription: 'Disfruta de uno de los juegos mas utilizados y un clásico para jugar en cualquier lugar con amigos o familia',fullDescription: 'Durante más de 40 años, UNO ha sido uno de los juegos familiares más clásicos y divertidos y considerado también como uno de los mejores juguetes para niños y uno de los juguetes que están de moda siempre. Lo recibirás en una caja cuadrada de 30 x 30 x 30 y con un peso reducido de apenas 10 gramos. Sin duda, que conoces este juego de cartas, ya que ha sido durante casi 50 años uno de los juegos familiares más reconocidos y dentro de los mejores nombres de juguetes para niños. Es un juguete para niñas de 7 años en adelante, pues empiezan hacerse mayores y las muñecas se les quedan muy infantiles. Pueden participar de 2 a 10 jugadores, es por esto que podrás jugar con tus hijas e hijos en familia. Todo esto lo convierte en uno de los mejores juguetes del mundo para niños. Ya sabemos cual es el objetivo, ser el primero en quedarse sin cartas en la mano, y una vez conseguido grita ¡Uno! El contenido del juego es el siguiente. UNO dispone de 112 cartas, dentro de éstas hay 19 cartas de 4 colores diferentes (rojo, verde, azul y amarillo). Adicionalmente dispone de 8 cartas «roba dos», «cambio de sentido» y «pierde turno», 4 comodines, cuatro cartas «roba cuatro», una carta «Intercambio de manos», tres cartas personalizables y las instrucciones del juego.',freeDelivery: 0,fromAge: 7,toAge: 15,ageYM: 'Y',image: 'j-uno.jpg',card: true});
model.createProduct({name: 'Tren',price: 5999,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-tren.jpg',card: true});
model.createProduct({name: 'DigHealth Dinosaurios',price: 2100,stock: 4,brand: 'Duravit',category: 'Educación',shortDescription: 'Entretenimiento y educación unidos para dar a conocer el mundo de los dinosaurios a los mas pequeños de la casa',fullDescription: 'El DigHealth dinosaurios juguetes es uno de los mejores juegos y mas divertidos para niños de 5 años el cual ayudará a tus hijos a conocer el mundo del Jurásico con todas las especies de dinosaurios y el entorno donde vivian. Les resultara entretenido a la vez que aprenderán cosas nuevas y les ayudara a desarrollar su memoria y capacidad de aprendizaje. El pack cuenta con una alfombra de 85 cm * 99,3 cm con 13 piezas de dinosaurios con un diseño muy realista entre los que se incluyen Tyrannosaurus, Stegosaurus, Spinosaurus, Triceratops, y otras 10 razas y variedades más de dinosaurios reales de la época. Estas figuras están fabricadas de un PVC especial sin ser dañino ni toxico para los pequeños, además cuentan con pintura realizada a mano lo que aporta un realismo y durabilidad superior. Además de los dinosaurios trae otros elementos como 3 tipos de árboles de la época jurásica, 2 montañas, troncos y huevos de dinosaurios para que nuestros pequeños desarrollen su imaginación colocando todas estas figuras a lo largo del tapete. Este tapete esta hecho de tejidos suaves que garantizan una limpieza duradera y fácil sin que pierdan el color con lavados o por el uso. Es bastante grande como para que 2 a 4 niños puedan usarlo a la vez. Los brillantes colores y el diseño realista del paisaje Jurásico ayudan a los pequeños a que construyan el mundo que tienen en su imaginación.',freeDelivery: 0,fromAge: 5,toAge: 7,ageYM: 'Y',image: 'j-dinosaurios.jpg',card: true});
model.createProduct({name: 'Camion',price: 2999,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-camion.jpg',card: true});
model.createProduct({name: 'Chicco First Bike',price: 1100,stock: 4,brand: 'Chicco',category: 'Aire libre',shortDescription: 'Juguemos a ser ciclistas con la bici sin pedales de Chicco',fullDescription: 'Si a tu hijo le gusta el ciclismo este es el regalo perfecto que le podrás hacer para que desarrolle sus habilidades espaciales y pueda convertirse en un corredor de élite. Sin duda, uno de los mejores juguetes para 4 años. La bicicleta Chicco es uno de los mejores juguetes para niños y niñas , ya que podrán aprender a montar en bici desde bien temprano para que vayan desarrollando sus capacidades motoras. Fabricada por la famosa marca Chicco y un 80 % de plástico, es muy ligera (2,7 kg), y de dimensiones reducidas 12 x 45 x 60 cm. Perfectamente ideal para niños de 5 años en adelante. Esta bici dispone de ruedas anti-pinchazos, con un manillar y sillín ajustable para las diferentes alturas. No obstante, no dispone de pedales aunque no le costará en absoluto a tu hijo, dar el paso hacia una bici más grande. A pesar de sus materiales de calidad y venir de una marca reconocida, podrás tener esta bicicleta por menos de 30 euros en dos colore: rojo y rosa.',freeDelivery: 0,fromAge: 4,toAge: 6,ageYM: 'Y',image: 'j-bicicleta.jpg',card: true});
model.createProduct({name: 'Helicóptero',price: 8299,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-helicoptero.jpg',card: true});
model.createProduct({name: 'Muñeca llorona',price: 2530,stock: 23,brand: 'Dreamy',category: 'Niñas',shortDescription: 'Muñeca llorona vestida de unicornio muy ideal para niñas',fullDescription: 'Considerado un juguete para niñas de 2 años y 3 años, además de ser uno de los juguetes más divertidos para niñas. Estamos ante la muñeca llorona Dreamy, considerado como un precioso unicornio que habita en el mundo fantástico, un juguete bonito con el que tu hija se lo pasará genial. Fabricado casi en su totalidad por plástico, poliéster y un 5 % de metal. Son necesarias 2 pilas LR3, las cuales vienen incluidas. ¡Mucho cuidado! es recomendable no dejar al alcance de los más pequeños, debemos asegurarnos que una vez introducidas en el bebe llorón se encuentran herméticamente cerradas. Este juguete para niñas de 3 años tiene unas dimensiones medias de 23.6 x 14 x 28.5 cm, y un peso de medio kilogramos. Es ideal para una sola niña y el manual de instrucciones viene en español. El funcionamiento de este bebe Dreamy supone un gran aprendizaje para las niñas, pues consiste en el cuidado de un bebe como si fuese real. Este bebe llorón es uno de los muñecos de moda para niños actuales el cual llorará lágrimas de verdad si le quitamos el chupete, para esto deberemos echarle agua. Sin embargo, podremos calmarla si la acostamos y la empezamos acariciar. Adicionalmente, este bebe llorón articulable, viene con un pijama intercambiable blanco de unicornio.',freeDelivery: 0,fromAge: 2,toAge: 3,ageYM: 'Y',image: 'j-muneca.jpg',card: true});
model.createProduct({name: 'Auto Mickey',price: 3799,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-mickey.jpg',card: true});
model.createProduct({name: 'Torre de bloques Nene',price: 1500,stock: 4,brand: 'Funny Toys',category: 'Educación',shortDescription: 'La Torre de Bloques Infantil de Madera ofrece 4 juegos en 1',fullDescription: 'La Torre de Bloques Infantil Nene Toys es un divertido juego para niños el cual incorpora una novedad muy interesante. La novedad es que puedes jugar de 4 modos distintos. El primero, consiste en construir la torre utilizando un dado para saber que bloque debes sacar. En el segundo se tienen que utilizar unas cartas de animales en vez del dado para adivinar y sacar el bloque. El tercer modo consiste en crear creativas construcciones y el cuarto modo es crear una cadena de domino. Este juguete es capaz de fomentar hasta 6 capacidades cognitivas. Al tratarse de un juego educativo e interactivo tu hijo podrá estimular la física básica, la creatividad, el reconocimiento de colores, el razonamiento, las habilidades motrices finas, la coordinación y las habilidades para resolver problemas. La fabricación de este juguete ha sido pensada para que sea seguro. Elaborado con madera natural, con pintura a base de agua no tóxica y con una superficie bien pulida con bordes redondos que lo hace más seguro. Este juguete ofrece una calidad premium y una seguridad máxima, ya que cuenta con las certificaciones de seguridad europea de Aprobación ASTM y Certificación CE.',freeDelivery: 0,fromAge: 4,toAge: 10,ageYM: 'Y',image: 'j-bloques.jpg',card: true});
model.createProduct({name: 'Fútbol',price: 9999,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-arcos.jpg',card: true});
model.createProduct({name: 'Mesas y Sillas',price: 1199,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-ositos.jpg',card: true});
model.createProduct({name: 'Moto Andarin',price: 8499,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-triciclo.jpg',card: true});
model.createProduct({name: 'Juego de playa',price: 3199,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-balde.jpg',card: true});

// Los últimos 9 productos son las ofertas que cargan el carrousel (propiedad card: false)
model.createProduct({name: 'Dinosaurio',price: 4499,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-dinosaurio.jpg',card: false});
model.createProduct({name: 'Tren',price: 5999,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-tren.jpg',card: false});
model.createProduct({name: 'Camion',price: 2999,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-camion.jpg',card: false});
model.createProduct({name: 'Helicóptero',price: 8299,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-helicoptero.jpg',card: false});
model.createProduct({name: 'Auto Mickey',price: 3799,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-mickey.jpg',card: false});
model.createProduct({name: 'Fútbol',price: 9999,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-arcos.jpg',card: false});
model.createProduct({name: 'Mesas y Sillas',price: 1199,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-ositos.jpg',card: false});
model.createProduct({name: 'Moto Andarin',price: 8499,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-triciclo.jpg',card: false});
model.createProduct({name: 'Juego de playa',price: 3199,stock: 0,brand: '',category: '',shortDescription: 'Oferta imperdible!!!',fullDescription: '',freeDelivery: 0,fromAge: 0,toAge: 0,ageYM: '',image: 'o-balde.jpg',card: false});


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////
const getProducts = async () => {
    const products = await model.readProducts();
    return products;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get One                                //
///////////////////////////////////////////////////////////////////////////////
const getProduct = async id => {
    const product = await model.readProduct(id);
    return product;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Create                                 //
////////////////////////////////////////////////////////////////////////////////

const createProduct = async product => {
    const createdProduct = await model.createProduct(product);
    return createdProduct;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Update                                 //
////////////////////////////////////////////////////////////////////////////////

const updateProduct = async (id, product) => {
    const updatedProduct = await model.updateProduct(id, product);
    return updatedProduct;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Delete                                 //
////////////////////////////////////////////////////////////////////////////////

const deleteProduct = async id => {
    const removedProduct = await model.deleteProduct(id);
    return removedProduct;
};


export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
