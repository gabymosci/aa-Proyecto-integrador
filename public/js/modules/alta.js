import {validateInput} from '../main.js';
import productController from '/js/controllers/product.js';

console.warn('🆗: Módulo PageAlta cargado.');

class PageAlta {

    static productsTableContainer;
    static buttonToggleTable;
    static productForm;
    static fields;
    static btnCreate;
    static btnUpdate;
    static btnCancel;
    static idProduct;
    static rowEdit;

    static tableVisible  = () => document.querySelector('.section-products-table').style.display === 'flex';

    static async toggleTable () {
        if (!this.tableVisible()) {
            document.querySelector('.section-products-table').style.display = 'flex';
            PageAlta.btnUpdate.hidden = false;
            PageAlta.btnCancel.hidden = false;
            await PageAlta.loadTable();
            PageAlta.buttonToggleTable.innerHTML = 'Ocultar todos los productos'
            PageAlta.emptyForm();
    } else {
            document.querySelector('.section-products-table').style.display = 'none';
            PageAlta.btnUpdate.hidden = true;
            PageAlta.btnCancel.hidden = true;
            PageAlta.buttonToggleTable.innerHTML = 'Mostrar todos los productos'
            PageAlta.emptyForm();
        }
    }

    static async saveProduct(product) {
        const savedProduct = await productController.saveProduct(product);
        return savedProduct;
    }

    static async updateProduct(product) {
        const updatedProduct = await productController.updateProduct(product.id, product);
        return updatedProduct;
    }

    static async deleteProduct(e) {

        function confirmDialog () {
            const buttonYes = document.querySelector('.btn-submit-yes');
            const buttonNo  = document.querySelector('.btn-submit-no');
            const id = PageAlta.rowEdit.querySelector('td[data-product-property="id"]').innerHTML;
            PageAlta.rowEdit = e.target.closest('tr');
        
            document.querySelector('.main-header__delete-modalbox').style.display = 'flex';
        
            pauseUntilButtonYes(createPromise(buttonYes));
            pauseUntilButtonNo(createPromise(buttonNo));
        
            function createPromise (target) {
                return new Promise((resolve) => target.addEventListener('click', resolve)) ;
            }
        
            async function pauseUntilButtonYes (clickListenerPromise)  {
                await clickListenerPromise
                document.querySelector('.main-header__delete-modalbox').style.display = 'none';;
                const deletedProduct = await productController.deleteProduct(id);
                console.log('deletedProduct:', deletedProduct);
                PageAlta.loadTable();
                return deletedProduct;
            }
        
            async function pauseUntilButtonNo (clickListenerPromise)  {
                await clickListenerPromise
                document.querySelector('.main-header__delete-modalbox').style.display = 'none';;
                PageAlta.rowEdit.classList.remove('deleteRow');
                return false;
            }
        }
        
        confirmDialog();

    }

/*
    static async deleteProduct(e) {
        PageAlta.rowEdit = e.target.closest('tr');
        if (!confirm('¿Estás seguro de querer eliminar el producto?')) {
            return false;
        }
        const id = PageAlta.rowEdit.querySelector('td[data-product-property="id"]').innerHTML;
        const deletedProduct = await productController.deleteProduct(id);
        PageAlta.loadTable();
        return deletedProduct;
    }
*/

    static getProductFromRow(row) {
        const rowCells = row.children;
        let product = {};
        product = productController.getProduct(rowCells[0].innerHTML);
        return product;
    }

    static emptyForm() {
        const generalErrors =       document.querySelector('.general-errors');
        const _name =               document.getElementById('name');
        const _price =              document.getElementById('price');
        const _stock =              document.getElementById('stock');
        const _brand =              document.getElementById('brand');
        const _category =           document.getElementById('category');
        const _shortDescription =   document.getElementById('shortDescription');
        const _fullDescription =    document.getElementById('fullDescription');
        const _fromAge =            document.getElementById('fromAge');
        const _toAge =              document.getElementById('toAge');
        const _image =              document.getElementById('image');
        generalErrors.innerHTML = '';
        generalErrors.classList.add('ok');
        removeBorders(_name);
        removeBorders(_price);
        removeBorders(_stock);
        removeBorders(_brand);
        removeBorders(_category);
        removeBorders(_shortDescription);
        removeBorders(_fullDescription);
        removeBorders(_fromAge);
        removeBorders(_toAge);
        removeBorders(_image);

        PageAlta.fields.forEach(field => field.value = '');

        function removeBorders(field) {
            field.classList.remove('fieldBorderGreen');
            field.classList.remove('fieldBorderRed');
        }

    }

    static async completeForm(e) {
        const row = e.target.closest('tr');
        const productToEdit = await PageAlta.getProductFromRow(row);
        console.log('productToEdit:', productToEdit);
        PageAlta.idProduct=productToEdit.id;
        PageAlta.fields.forEach(field => {
            field.value = productToEdit[field.name];
        });

    }

    static async addTableEvents() {
        PageAlta.productsTableContainer.addEventListener('click', async e => {
            // ---Botón Editar
            if (e.target.classList.contains('btn-edit')) {
                PageAlta.rowEdit = e.target.closest('tr');
                PageAlta.rowEdit.classList.add('editRow');
                PageAlta.emptyForm();
                PageAlta.prepareFormForEditing();
                PageAlta.completeForm(e);
                return;
            }

            // ---Botón Eliminar
            if (e.target.classList.contains('btn-delete')) {
                PageAlta.rowEdit = e.target.closest('tr');
                PageAlta.rowEdit.classList.add('deleteRow');
                PageAlta.emptyForm();
                PageAlta.prepareFormForCreating();
                const deletedProduct = await PageAlta.deleteProduct(e);
                // console.log('deletedProduct:', deletedProduct);
                if (deletedProduct && PageAlta.objectIsEmpty(deletedProduct)) {
                    console.error('No se pudo eliminar el producto');
                }
                return;
            }
        });

        // ---Botón Mostrar todos los productos
        PageAlta.buttonToggleTable.addEventListener('click', () => {
            this.toggleTable();
        })
    }

    static async renderTemplateTable(products) {
        const hbsFile = await fetch('templates/products-table.hbs').then(r => r.text());
        const template = Handlebars.compile(hbsFile);
        const html = template({ products });
        PageAlta.productsTableContainer.innerHTML = html;


        const objToPaginate = document.querySelector('.table-products');
        if (!objToPaginate) {
            return;
        }
        let options = {
            numberPerPage:6, //Cantidad de datos por pagina
            goBar:true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
            pageCounter:true, //Contador de paginas, en cual estas, de cuantas paginas
        };
        let filterOptions = {
            el:'#searchSite-no' //Caja de texto para filtrar, puede ser una clase o un ID
        };

        paginate.init(objToPaginate,options);

        const tbody = document.getElementsByTagName('table');
        const newDiv = document.createElement('div');
        const newtfoot = 
        `
        <div class="tfoot">
            Se encontraron ${products.length} productos
        </div>
        `;
        newDiv.innerHTML = newtfoot;
        tbody[0].insertAdjacentElement('afterEnd',newDiv);

    }

    static async loadTable() {
        const products = await productController.getProducts();
        PageAlta.renderTemplateTable(products);
    }

    static async prepareTable() {
        PageAlta.productsTableContainer = document.querySelector('.products-table-container');
        PageAlta.buttonToggleTable      = document.querySelector('#show-all-products');
        await PageAlta.loadTable();
        PageAlta.addTableEvents();
    }

    static prepareFormForEditing() {
        PageAlta.productForm.querySelector('[name="name"]').focus();
        PageAlta.btnCreate.disabled = true;
        PageAlta.btnUpdate.disabled = false;
        PageAlta.btnCancel.disabled = false;
    }

    static prepareFormForCreating() {
        PageAlta.btnCreate.disabled = false;
        PageAlta.btnUpdate.disabled = true;
        PageAlta.btnCancel.disabled = true;
        if (PageAlta.rowEdit) {
            PageAlta.rowEdit.classList.remove('editRow');
        }
    }

    static validateForm() {
        const productToSave = {};
        const _name =                document.getElementById('name');
        const _price =               document.getElementById('price');
        const _stock =               document.getElementById('stock');
        const _brand =               document.getElementById('brand');
        const _category =            document.getElementById('category');
        const _shortDescription =    document.getElementById('shortDescription');
        const _fullDescription =     document.getElementById('fullDescription');
        const _fromAge =             document.getElementById('fromAge');
        const _toAge =               document.getElementById('toAge');
        const _image =               document.getElementById('image');

        let _imageValid =            validateInput('Foto', _image, regExpImage, 2, 2000, true);
        let _toAgeValid =            validateInput('Edad hasta', _toAge, regExpToAge, 0, 0, false);
        let _fromAgeValid =          validateInput('Edad desde', _fromAge, regExpFromAge, 0, 0, false);
        let _fullDescriptionValid =  validateInput('Descripción larga', _fullDescription, regExpFullDescription, 3, 2000, false);
        let _shortDescriptionValid = validateInput('Descripción corta', _shortDescription, regExpShortDescription, 3, 80, true);
        let _categoryValid =         validateInput('Categoría', _category, regExpCategory, 2, 50, false);
        let _brandValid =            validateInput('Marca', _brand, regExpBrand, 2, 40, false);
        let _stockValid =            validateInput('Stock', _stock, regExpStock, 0, 0, false);
        let _priceValid =            validateInput('Precio', _price, regExpPrice, 0, 0, false);
        let _nameValid =             validateInput('Nombre', _name, regExpName, 3, 30, true);

        if (_nameValid &&
            _priceValid &&
            _stockValid &&
            _brandValid &&
            _categoryValid &&
            _shortDescriptionValid &&
            _fullDescriptionValid &&
            _fromAgeValid &&
            _toAgeValid &&
            _imageValid) {
                for (const field of PageAlta.fields) {
                    productToSave[field.name] = field.value;
                }
                if (!productToSave.id) {
                    productToSave.id = PageAlta.idProduct;
                }
            } else {
                return false;
            }
        return productToSave;
    }

    static async addFormEvents() {
        // ---Botón Crear
        PageAlta.btnCreate.addEventListener('click', async e => {
            console.warn('btn-create');
            const productToSave = PageAlta.validateForm();
            console.log('productToSave:', productToSave);
            if (productToSave) {
                const savedProduct = await PageAlta.saveProduct(productToSave);
                console.log('savedProduct:', savedProduct);
                if (PageAlta.objectIsEmpty(savedProduct)) {
                    console.error('No se pudo crear el producto');
                    return;
                }
                const products = await productController.getProducts();
                console.log(`Ahora hay ${products.length} productos`);    
                PageAlta.renderTemplateTable(products);
                PageAlta.emptyForm();
                PageAlta.prepareFormForCreating();
            }
        });

        // ---Botón Guardar
        PageAlta.btnUpdate.addEventListener('click', async e => {
            console.warn('btn-update');
            const productToSave = PageAlta.validateForm();
            console.log('productToUpdate:', productToSave);
            if (productToSave) {
                const updatedProduct = await PageAlta.updateProduct(productToSave);
                console.log('updatedProduct:', updatedProduct);
                if (PageAlta.objectIsEmpty(updatedProduct)) {
                    console.warn('No se pudo guardar el producto');
                    return;
                }
                const products = await productController.getProducts();
                console.log(`Sigue habiendo ${products.length} productos`);    
                PageAlta.renderTemplateTable(products);        
                PageAlta.emptyForm();
                PageAlta.prepareFormForCreating();
            }
        });

        // ---Botón Cancelar
        PageAlta.btnCancel.addEventListener('click', e => {
            console.warn('btn-cancel');
            PageAlta.emptyForm();
            PageAlta.prepareFormForCreating();
        });
    }

    static objectIsEmpty(object) {
        return Object.entries(object).length === 0;
    }

    static prepareForm() {
        PageAlta.productForm = document.querySelector('.form-product');
        PageAlta.fields = PageAlta.productForm.querySelectorAll('[name]');
        PageAlta.btnCreate = PageAlta.productForm.querySelector('.form-product__btn-create');
        PageAlta.btnUpdate = PageAlta.productForm.querySelector('.form-product__btn-update');
        PageAlta.btnCancel = PageAlta.productForm.querySelector('.form-product__btn-cancel');
        PageAlta.addFormEvents();
    }


    static async init() {
        console.log('PageAlta.init()');
        
        PageAlta.prepareTable();
        PageAlta.prepareForm();

        // PageAlta.toggleTable(); //****************sacar esto */

        programInputsAdd();
    }
}



/////////////////////////////////////////////////////////////////////
//                                                                 //
//    ----------------Programa inputs form Alta----------------    //
//                                                                 //
/////////////////////////////////////////////////////////////////////

// ---Expresiones regulares Alta
const regExpName =              /^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ0-9.\,"!¡*'\s-_:\(\)%«»]{3,30}$/;
const regExpPrice =             /^([0-9]{1,10}(\.[0-9]{1,2})?)$/;            
const regExpStock =             /^-?[0-9]+$/;      
const regExpBrand =             /^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ0-9.\,"!¡*'\s-_:\(\)%«»]{2,40}$/;
const regExpCategory =          /^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ0-9.\,"!¡*'\s-_:\(\)%«»]{2,50}$/;
const regExpShortDescription =  /^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ0-9.\,"!¡*'\s-_:\(\)%«»]{2,80}$/;
const regExpFullDescription =   /^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ0-9.\,"!¡*'\s-_:\(\)%\«\»]{2,2000}$/;
const regExpFromAge =           /^[0-9]+$/;
const regExpToAge =             /^[0-9]+$/;
const regExpImage =             '';

function programInputsAdd() {
    // ---Campos
    const _name =               document.getElementById('name');
    const _price =              document.getElementById('price');
    const _stock =              document.getElementById('stock');
    const _brand =              document.getElementById('brand');
    const _category =           document.getElementById('category');
    const _shortDescription =   document.getElementById('shortDescription');
    const _fullDescription =    document.getElementById('fullDescription');
    const _fromAge =            document.getElementById('fromAge');
    const _toAge =              document.getElementById('toAge');
    const _image =              document.getElementById('image');

    // ------------------------------------Programación de campos
    // ---_name
    _name.addEventListener('input', () => {
        validateInput('Nombre', _name, regExpName, 3, 30, true, 'puede contener letras, números, caracteres especiales y espacios');
    });
    // ---_price
    _price.addEventListener('input', () => {
        validateInput('Precio', _price, regExpPrice, 0, 0, false, 'debe ser numérico positivo con o sin decimales');
    });
    // ---_stock
    _stock.addEventListener('input', () => {
        validateInput('Stock', _stock, regExpStock, 0, 0, false, 'debe ser numérico positivo o cero sin decimales');
    });
    // ---_brand
    _brand.addEventListener('input', () => {
        validateInput('Marca', _brand, regExpBrand, 2, 40, false, 'puede contener letras, números, caracteres especiales y espacios');
    });
    // ---_category
    _category.addEventListener('input', () => {
        validateInput('Categoría', _category, regExpCategory, 2, 50, false, 'puede contener letras, números, caracteres especiales y espacios');
    });
    // ---shortDescription
    _shortDescription.addEventListener('input', () => {
        validateInput('Descripción corta', _shortDescription, regExpShortDescription, 3, 80, true, 'puede contener letras, números, caracteres especiales y espacios');
    });
    // ---_fullDescription
    _fullDescription.addEventListener('input', () => {
        validateInput('Descripción larga', _fullDescription, regExpFullDescription, 3, 2000, false, 'puede contener letras, números, caracteres especiales y espacios');
    });
    // ---_fromAge
    _fromAge.addEventListener('input', () => {
        validateInput('Edad desde', _fromAge, regExpFromAge, 0, 0, false, 'debe ser numérico positivo sin decimales');
    });
    // ---_toAge
    _toAge.addEventListener('input', () => {
        validateInput('Edad hasta', _toAge, regExpToAge, 0, 0, false, 'debe ser numérico positivo sin decimales');
    });
    // ---_image
    _image.addEventListener('input', () => {
        validateInput('Foto', _image, regExpImage, 2, 2000, true);
    });
}


export default PageAlta;