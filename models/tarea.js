
const { v4: uuidv4 } = require('uuid');  // obteniendo el v4 de uuid y lo renombramos como uuidv4


class Tarea {

    id = '';
    description = '';
    completadoEn = null;

    constructor( description ) {
        this.id = uuidv4();
        this.description = description;
        this.completadoEn = null;
    }
}


module.exports = Tarea;



