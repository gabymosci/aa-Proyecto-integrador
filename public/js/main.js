//////////////////////////////////////////////////////////////////////
//                            Navegación                            //
//////////////////////////////////////////////////////////////////////
class Main {

    async ajax(url, method = 'get') {
        return await fetch(url, {method: method}).then(r => r.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || 'inicio';
    }

    getViewUrlFromId(id) {
        return `views/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            if(link.getAttribute('href') === `#/${id}`) {
                link.classList.add('main-nav__link--active');
                link.ariaCurrent = 'page';
            } else {
                link.classList.remove('main-nav__link--active');
                link.removeAttribute('aria-current');
            }
        });
    }

    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);
        try {
            const { default: module } = await import(moduleUrl);
            if (typeof module.init !== 'function') {
                console.error(`El módulo ${id} no posee un método init().`);
                return;
            }
            module.init();
        } catch (error) {
            document.querySelector('main').innerHTML =
            `
            <div style="background-color:red; 
                        color: white; 
                        width:60%; 
                        margin:2em auto; 
                        text-align:center; 
                        padding:1em;
                        box-shadow: 5px 5px 3px rgba(0, 0, 0, .5);
                        border-radius: .3em;
                        ">
                <h5>Se produjo un error al intentar cargar el contenido de la página:</h5>
                <h4>${moduleUrl}</h4>
                <h5>Reintentalo en unos minutos. Si el problema persiste, <a href="#/contacto">contactanos</a></h5>
            </div>
            `
            ;
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        const viewUrl = this.getViewUrlFromId(id);
        const viewContent = await this.ajax(viewUrl);
        document.querySelector('main').innerHTML = viewContent;

        this.setActiveLink(id);

        this.initJS(id);
        _generalErrors.innerHTML = '';
        _generalErrors.classList.remove('ok');
        _generalErrors.classList.add('ok');

    }

    async loadTemplates() {
        this.loadTemplate();
        window.addEventListener('hashchange', () => this.loadTemplate());
    }

    async start() {
        await this.loadTemplates();
        if (!CartInitialized) {
            CartInitialized = true;
            programCartContent();
            // Observación del profe: en scroll / resize no debe permanecer fijo el generalErrors
            window.onscroll = () => {  
                _generalErrors.innerHTML = '';
                _generalErrors.classList.add('ok');
            }

            window.onresize = () => {
                _generalErrors.innerHTML = '';
                _generalErrors.classList.add('ok');
            };
        }
    }
}

let CartInitialized = false;
const main = new Main();
main.start();


////////////////////////////////////////////////////////////////////////////
//    Programación botón Cart y cart content común a todas las páginas    //
////////////////////////////////////////////////////////////////////////////
const cartBtn           = document.querySelector('.main-header__cart-button-container');
const cartContent       = document.querySelector('.main-header__cart-content');
const cartModalBox      = document.querySelector('.main-header__cart-modalbox');
// const buyButton         = document.querySelector('.main-header__cart-content-btn-buy');
const _generalErrors    = document.querySelector('.general-errors');
let cartContentVisible  = () => document.querySelector('.main-header__cart-modalbox').style.display === 'flex';

// ---Abre / Cierra cart content
function toggleCart (autoClose) {
    if (!cartContentVisible()) {    // Abre 
        cartModalBox.style.display = 'flex';
        cartContent.classList.add('in');
    } else {                        // Cierra 
        close();
    }
    if (autoClose && cartContentVisible()) {    // Autocierre
        setTimeout(() => {
            close();
        },1500);
    }

    function close () {
        cartContent.classList.add('out');
        setTimeout(() => {
            cartContent.classList.remove('out');
            cartModalBox.style.display = 'none';
        },390);
    }
}

// ---Controles para abrir y cerrar cart content
const programCartContent = () => {
        // Botón carrito
        cartBtn.addEventListener('click', () => {
            toggleCart();
        });
    
        // fuera de la ventana modal / botón X cerrar contenido
        cartModalBox.addEventListener('click', e => {
            if (e.target.classList.contains('main-header__cart-modalbox') || 
                e.target.classList.contains('main-header__cart-content-button-close')) {
                toggleCart();
            }
        });

        // tecla ESC
        document.addEventListener('keyup', e => {
        if (e.key == 'Escape'  && cartContentVisible()) {
                toggleCart();
            }
        }, false);
};


//////////////////////////////////////////////////////////////////////
//                   Función validadora de inputs                   //
//////////////////////////////////////////////////////////////////////
function validateInput(label, field, regExpText, minLen, maxLen, required, customMessage) {
    const _buttonSubmit = document.querySelector('.btn-validator');
    let value = field.value.trim();
    let message ='';
    let messGral = 'no se ajusta al formato';
    if (customMessage) { messGral = customMessage; }
    let valueLength = value.length;
    let minLength = minLen;
    let maxLength = maxLen;
    let coordsInput = field.getBoundingClientRect();
    let coordsBtnSubmit = _buttonSubmit.getBoundingClientRect();

    if (valueLength === 0 && required && (window.event.type === 'click' || window.event.type === 'submit')) {      // Obligatorio
        message = `${label} es obligatorio`;
    } else if ((minLen && valueLength) && (valueLength < minLength)) {          // Long Mínima
        message = `${label} debe tener al menos ${minLength} caracteres`;
    } else if (maxLen && (valueLength > maxLength)) {
        message = `${label} debe tener ${maxLength} caracteres como máximo`;    // Long Máxima
    } else if (regExpText) {
        let textValidator = new RegExp(regExpText);                             // RegExp
        if (valueLength && !textValidator.test(value)) {
            message = `${label} ${messGral}`;
        }
    }
    if (message) {
        let triangle = '';
        if (coordsInput.y >=100) {
            triangle = '<div class="triangle"></div>';
        }
        _generalErrors.innerHTML = `<img src="img/advertencia.png" alt="Aviso"> ${message}${triangle}`;
        _generalErrors.classList.remove('ok');
        field.classList.remove('fieldBorderGreen');
        field.classList.add('fieldBorderRed');
        _generalErrors.style.left = coordsInput.x + 'px';
        if (coordsInput.y >=100) {
            _generalErrors.style.top = coordsInput.y - 150 + 'px';
        } else {
            _generalErrors.style.top = coordsBtnSubmit.y - 150 + 'px';
        }
        return false;
    } else {
        if (window.event.type === 'input') {
            _generalErrors.innerHTML = '';
            _generalErrors.classList.add('ok');
            field.classList.remove('fieldBorderGreen');
            if (value) {
                field.classList.add('fieldBorderGreen');
            }
            field.classList.remove('fieldBorderRed');
        }
        return true;
    }
}


export {toggleCart, cartContentVisible, validateInput};
