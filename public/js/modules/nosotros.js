import {waitProgress} from '../main.js';
console.warn('🆗: Módulo PageNosotros cargado.');

class PageNosotros {
    static async init() {
        console.log('PageNosotros.init()');

        waitProgress.style.display = 'none'; 
    }
}

export default PageNosotros;