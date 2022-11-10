import productController from '/js/controllers/product.js';
import productCartController from '/js/controllers/productcart.js';
import {toggleCart, cartContentVisible} from '../main.js';

console.warn('🆗: Módulo PageInicio cargado.');

// Borra todos los productos que pudieran estar en el cart content del servidor
async function initializeProductsCart() {
    const productsCart = await productCartController.getProductsCart({});
    for (let productCart of productsCart) {
        await productCartController.deleteProductCart(productCart.id);;
    }
}

initializeProductsCart();

class PageInicio {

    static async renderTemplateCards(products) { 
        const textToRender = await fetch('/templates/card.hbs').then(r =>r.text());
        const template = Handlebars.compile(textToRender);
        const html = template({ products });
        document.querySelector('.cards-container').innerHTML = html;
        let offer = document.querySelectorAll('.card__description p');
        for (let i=0; i < offer.length; i++) {
            if (offer[i].innerHTML === 'Oferta imperdible!!!') {
                offer[i].classList.add('offer');
            }
        }
        programCart();
    }

    static async renderTemplateCarrousel(products) {
        if (!products.length) {
            document.getElementById('offert').innerHTML = 'No se encontraron productos';
            return;
        }
        const textToRender = await fetch('/templates/carrousel.hbs').then(r =>r.text());
        const template = Handlebars.compile(textToRender);
        let resultText = '';
        let classItem = 0;
        let carrItem;
        let index = products.length - 9;
        for (let i=0; i < 9; i++) {
            if(i % 3 === 0) {
                resultText = '';
                classItem++;
                carrItem = document.getElementById(`carrousel__item-${classItem}`);
            }
            resultText += template(products[index]);
            carrItem.innerHTML = resultText;
            index++;
        }
        programCarrousel();
    }

    static async init() {
        console.log('PageInicio.init()');

        const products = await productController.getProducts();
        PageInicio.renderTemplateCards(products);
        PageInicio.renderTemplateCarrousel(products);



        console.log(`Se encontraron ${products.length} productos.`);
    }
}

//////////////////////////////////////////////////////////////////////
//            Programa cada cart para agregar al carrito            //
//////////////////////////////////////////////////////////////////////
function programCart () {
    document.querySelector('.cards-container').addEventListener('click', e => {
        if (e.target.classList.contains('card__link-add')) {
            e.preventDefault();
            let product = e.target.parentNode;
            // Producto a Agregar
            const productId  = product.querySelector('.card_id').innerHTML;
            const productImg = product.querySelector('.card__article img').src;
            const productDes = product.querySelector('.card__article h2').innerHTML;
            const productPri = product.querySelector('.card__article span').innerHTML;
            // Productos que ya tiene el carrito
            const productsImg = document.querySelectorAll('#product-image');
            const productsDes = document.querySelectorAll('#product-description');
            const productsPri = document.querySelectorAll('#product-price');
            const productsQty = document.querySelectorAll('#product-quantity');
            const productContainer = document.querySelectorAll('.main-header__cart-content-products');
            const cartContainer = document.querySelector('.main-header__cart-content');

            let quanty = 1;
            let subTotal;
            // ---Si ya está sólo aumenta cantidad
            for (let i=0; i<productsImg.length; i++) {
                if (productImg == productsImg[i].src && productDes == productsDes[i].innerHTML && productPri == productsPri[i].innerHTML.slice(1,10)) {
                    productsQty[i].value ++;
                    quanty = productsQty[i].value;
                    productsQty[i].setAttribute('value', quanty);
                    productContainer[i].classList.add('add');
                    refreshCartContent();
                    if (!cartContentVisible()) { toggleCart(true); }
                    return;
                } 
            }
            
            // ---No está, lo agrega
            subTotal = quanty * productPri;
            let newDiv;
            let newProduct = 
            `
            <button class="main-header__cart-content-products-delete" title="Eliminar"></button>
            <span class="card_id" hidden>${productId}</span>
            <div class="main-header__cart-content-products-image">
                <img id="product-image" src="${productImg}" alt="${productDes}">
            </div>
            <div class="main-header__cart-content-products-description">
                <p id="product-description">${productDes}</p>
            </div>
            <div class="main-header__cart-content-products-price">
                <p id="product-price">$${productPri}</p>
            </div>
            <div class="main-header__cart-content-products-quantity">
                x<input id="product-quantity" type="number" min="1" max="99" value="${quanty}">
            </div>
            <div class="main-header__cart-content-products-subtotal">
                <p id="product-subtotal">= $${subTotal}</p>
            </div>
            `;
        
            newDiv = document.createElement('div');
            newDiv.innerHTML = newProduct;
            newDiv.classList.add('main-header__cart-content-products');
            newDiv.classList.add('add');
            if (productsImg.length < 6) {
                cartContainer.style.overflow = 'visible';
            }
            document.getElementById('cart-title').insertAdjacentElement('afterEnd',newDiv);
        
            refreshCartContent();
            if (!cartContentVisible()) { toggleCart(true)}; 
        
            // Botón eliminar producto del carrito
            const buttonDel = document.querySelector('.main-header__cart-content-products-delete');
            buttonDel.addEventListener('click', e => {
                const productContainer = e.target.closest('.main-header__cart-content-products');
                productContainer.classList.add('delete');
                setTimeout(() => {
                    productContainer.remove();
                    refreshCartContent();
                },690);
        
            });
        
            // Input de cantidad
            const inputQty = document.querySelector('#product-quantity');
            inputQty.addEventListener('input', e => {
                const productContainer = e.target.closest('.main-header__cart-content-products');
                let currentQty = productContainer.querySelector('#product-quantity');
                quanty = currentQty.value;
                if (quanty <= 0) { quanty = '1'; }
                currentQty.setAttribute('value', quanty);
                productContainer.classList.add('change');
                refreshCartContent();
            });
        
        }
    });
}

async function refreshCartContent () {
    const productId         = document.querySelectorAll('.card_id')
    const prices            = document.querySelectorAll('#product-price');
    const quanty            = document.querySelectorAll('#product-quantity');
    const subtot            = document.querySelectorAll('#product-subtotal');
    const cartRedQty        = document.querySelector('.main-header__cart-button-container-qty');
    const productContainer  = document.querySelectorAll('.main-header__cart-content-products');
    const cartContainer     = document.querySelector('.main-header__cart-content');
    let deleteDiv           = document.getElementById('main-header__cart-content-footer');
    let productRead ;
    let cartQty = 0;
    let subTotal;
    let total = 0;
    let price =0;
    // Calcula Total
    for (let i=0; i<prices.length; i++) {
        // Lee el precio del servidor por si se manipulan los datos en el front
        productRead = await productController.getProduct(productId[i].innerHTML);
        price= productRead.price;
        subTotal = price * Number(quanty[i].value);
        subtot[i].innerHTML = `= $${subTotal}`;
        total += subTotal;
        cartQty += Number(quanty[i].value);
        setTimeout(() => {
            productContainer[i].classList.remove('add');
            productContainer[i].classList.remove('change');
            cartContainer.style.overflow = 'auto';
        },1000);

    }
    
    let newDiv;
    let cartFooter = 
    `
        <div class="main-header__cart-content-footer-total">Total: $${total}</div>
        <div class="main-header__cart-content-btn-buy"><button>Comprar</button></div>
    `;

    if (cartQty > 0) {
        cartRedQty.innerHTML = cartQty;
        let lastProduct = document.querySelectorAll('.main-header__cart-content-products');
        if (deleteDiv) { deleteDiv.remove(); }
        cartRedQty.style.display = 'flex';
        newDiv = document.createElement('div');
        newDiv.innerHTML = cartFooter;
        newDiv.classList.add('main-header__cart-content-footer');
        newDiv.id = 'main-header__cart-content-footer';
        lastProduct[lastProduct.length - 1].insertAdjacentElement('afterEnd',newDiv);
        // ---Botón comprar
        const buyButton = document.querySelector('.main-header__cart-content-btn-buy');
        buyButton.addEventListener('click', () => {
            buyOperation()
        })
    } else {
        if (deleteDiv) { deleteDiv.remove(); }
        cartRedQty.innerHTML = '';
        cartRedQty.style.display = 'none';
        if (cartContentVisible()) { toggleCart(); }
    }

    return total;
}

/////////////////////////////////////////////////////////////////////
//                          Botón Comprar                          //
/////////////////////////////////////////////////////////////////////
async function buyOperation () {
    const productCartToSave = {};
    const productId         = document.querySelectorAll('.main-header__cart-content .card_id')
    const quanty            = document.querySelectorAll('#product-quantity');
    const cartModalBox      = document.querySelector('.main-header__cart-modalbox');
    const cartContent       = document.querySelector('.main-header__cart-content')
    let productRead;
    let productCartSaved;
    for (let i=0 ; i<productId.length ; i++) {
        productRead = await productController.getProduct(productId[i].innerHTML);
        productCartToSave.productId = productId[i].innerHTML;
        productCartToSave.name = productRead.name;
        productCartToSave.price = productRead.price;
        productCartToSave.qty = Number(quanty[i].value);
        productCartToSave.partial = productRead.price * Number(quanty[i].value);
        productCartSaved = await productCartController.saveProductCart(productCartToSave);
    }
    // Vacía cart container
    cartContent.innerHTML= 
    `
    <button class="main-header__cart-content-button-close" title="Cerrar"></button>
    <div class="main-header__cart-content-title"><h4 id="cart-title">Productos en tu carrito</h4></div>
    </div>
    `
    // si se puede hacer andar el pago debería limpiar el cart content del servidor para no volver a procesarlo
    // initializeProductsCart();
    refreshCartContent();
    toggleCart();
}


function programCarrousel () {
    // ========================================Definición de variables
    const slidesContainer   = document.getElementById('slides-container');
    const slide             = document.querySelector('.carrousel__slide');
    const itemN             = document.querySelectorAll('.carrousel__item-n');
    const prevButton        = document.getElementById('slide-arrow-prev');
    const nextButton        = document.getElementById('slide-arrow-next');
    let press = ['R','R','L','L'];
    let inter = -1;
    
    function showSlide(n) {
        const slideWidth = slide.clientWidth;
        if (n > 0) {
            slidesContainer.scrollLeft += slideWidth;
            if (slidesContainer.scrollLeft === slideWidth * (slidesContainer.childElementCount - 1)) {
                slidesContainer.scrollLeft = 0;
            }
        } else {
            slidesContainer.scrollLeft -= slideWidth;
            if (slidesContainer.scrollLeft === 0) {
                slidesContainer.scrollLeft = slideWidth * (slidesContainer.childElementCount - 1);
            }
        }
    }
    
    nextButton.addEventListener("click", () => {
        showSlide(+1);
        clearInterval(nextSlideTimeout);
    });
    
    prevButton.addEventListener("click", () => {
        showSlide(-1);
        clearInterval(nextSlideTimeout);
    });
    
    itemN.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            clearInterval(nextSlideTimeout);
        });
    });
    
    let nextSlideTimeout = setInterval(() => {
        inter++;
        if (inter === 4) { inter = 0; }
        press[inter] === 'R' ? showSlide(+1) : showSlide(-1);
    }, 8000); //8000

}


export {refreshCartContent, PageInicio as default };