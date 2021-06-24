
const Tarea = require("./tarea");
require('colors');

class Tareas {

    _listado = {}; 

    // {
    //    'id_value': { id: 'id_value', description: '...', completadoEn: },
    //    'id_value': { id: 'id_value', description: '...', completadoEn: },
    //    'id_value': { id: 'id_value', description: '...', completadoEn: }
    // }

    // [
    //    { id: 'id_value', description: '...', completadoEn: },
    //    { id: 'id_value', description: '...', completadoEn: },
    //    { id: 'id_value', description: '...', completadoEn: }
    // ]


    constructor() {
        this._listado = {};
    }

    // borra una tarea usando como argumento el id en el objeto _listado
    borrarTarea(id = '') {
        // existe la tarea?
        if ( this._listado[id] ) {
            delete this._listado[id];  // elimina la tarea
        }
    }

    // recibe el arreglo de tareas de la data y llena el objeto _listado de tareas con tarea.id como id del objeto
    cargarTareasFromArr( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    // devuelve el objeto _listado y lo retorna como un arreglo de tareas
    get listadoArr() {
        const listado = [];
        // obtenemos las llaves de cada tarea (el id) y con push lo ponemos en el nuevo arreglo
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push( tarea );
        } );
        return listado;
    }


    // crea una tarea y recibe la descripcion de esta como argumento, la agrega a _listado
    crearTarea( description = '' ) {
        const tarea = new Tarea(description);
        this._listado[tarea.id] = tarea;
    }

    // recibe el listado del get y lo imprime un formato amigable
    listadoCompleto() {
        console.log();
        this.listadoArr.forEach( (tarea, i) => {
            const idx = `${ i + 1 }`.green;
            const desc = `${ tarea.description }`;
            if ( tarea.completadoEn ) {
                console.log(`${ idx }. ${desc} :: ${ 'Completada'.green }`);
            } else {
                console.log(`${ idx }. ${desc} :: ${ 'Pendiente'.red }`);
            }
        })
    }

    // lista las tareas completadas o las tareas pendientes obtenidas del get
    listarPorEstado( completadas = true ) {
        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {
            const desc = `${ tarea.description }`;
            const estado = ( tarea.completadoEn )
                                ? tarea.completadoEn.green
                                : 'Pendiente'.red;
            if ( completadas && tarea.completadoEn ) {
                contador += 1;
                console.log(`${ (contador + '.').toString().green } ${desc} :: ${ estado }`);
            }
            if ( !completadas && !tarea.completadoEn ) {
                contador += 1;
                console.log(`${ (contador + '.').toString().green } ${desc} :: ${ estado }`);
            }
        });

        if ( contador === 0 ) {
            ( completadas ) 
                    ? console.log( 'No existen tareas completadas' )
                    : console.log( 'No existen tareas pendientes' );
        }
    }


    // recibe un arreglo de ids de tareas para marcarlas o desmarcarlas
    marcarTareas( ids = [] ) {
        ids.forEach( id => {
            const tarea = this._listado[id]; // afectamos al listado ya que obtenemos la referencia a los objetos de _listado
            if ( !tarea.completadoEn ) { // si esta en null
                // le asignamos la fecha de completado
                tarea.completadoEn = new Date().toISOString();
            }
        });

        // leyendo del get de tareas existentes, si el id de cada tarea no existe en ids, entonces 
        this.listadoArr.forEach( tarea => {
            if ( !ids.includes(tarea.id) ) {
                // cambiamos a null el valor de completadoEn
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;