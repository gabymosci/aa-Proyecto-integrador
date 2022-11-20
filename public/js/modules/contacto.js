import {validateInput, waitProgress} from '../main.js';

console.warn('🆗: Módulo PageContacto cargado.');

class PageContacto {
    static async init() {
        console.log('PageContacto.init()');
        
        programInputsContact();
        programFormContact();

        waitProgress.style.display = 'none'; 
    }
}



/////////////////////////////////////////////////////////////////////////
//                                                                     //
//    ----------------Programa inputs form Contacto----------------    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////

// ---Expresiones regulares Contacto
const regExpFirstName =     "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$";
const regExpEMail =         /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;            
const regExpComment =       '';            

function programInputsContact() {
    // ---Campos
    const _firstName =     document.getElementById('firstName');
    const _eMail =         document.getElementById('eMail');
    const _comment =       document.getElementById('comment');

    // ---_firstName
    _firstName.addEventListener('input', () => {
        validateInput('Nombre', _firstName, regExpFirstName, 3, 30, true, 'puede contener letras y espacios');
    });
    // ---_eMail
    _eMail.addEventListener('input', () => {
        validateInput('Email', _eMail, regExpEMail, 0, 0, true, 'debe tener formato de email, ej: nombre@mail.com');
    });
    // ---_comment
    _comment.addEventListener('input', () => {
        validateInput('Comentarios', _comment, regExpComment, 10, 2000, true);
    });
}

// ---form Contacto (submit)
function programFormContact() {    
    const _formEvent = document.getElementById('contact-form');
    _formEvent.addEventListener('submit', e => {
        const _firstName =    document.getElementById('firstName');
        const _eMail =        document.getElementById('eMail');
        const _comment =      document.getElementById('comment');

        e.preventDefault();
        const _commentValid =   validateInput('Comentarios', _comment, regExpComment, 10, 2000, true);
        const _eMailValid =     validateInput('Email', _eMail, regExpEMail, 0, 0, true);
        const _firstNameValid = validateInput('Nombre', _firstName, regExpFirstName, 3, 30, true);

        if (_firstNameValid &&
            _eMailValid &&
            _commentValid) {
                _formEvent.submit();
        }
    });
}


export default PageContacto;