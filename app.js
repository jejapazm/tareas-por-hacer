
require('colors');
const { 
    inquirerMenu,
    pausa,
    leerInput,
    listadoParaBorrar,
    confirmar,
    listadoParaSeleccionar
} = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/Archivo_IO');
const Tareas = require('./models/tareas');

const main = async() => {
    let option = '';
    const tareas = new Tareas();
    const tareasFromDB = leerDB();

    if ( tareasFromDB ) {
        tareas.cargarTareasFromArr( tareasFromDB );
    }
    do {
        option = await inquirerMenu();
        
        switch ( option ) {
            case '1':
                const description = await leerInput( 'Descripción:' );
                tareas.crearTarea( description );
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPorEstado();
                break;
            case '4':
                tareas.listarPorEstado(false);
                break;
            case '5':
                const ids = await listadoParaSeleccionar( tareas.listadoArr );
                tareas.marcarTareas( ids );
                break;
            case '6':
                const id = await listadoParaBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('¿Estas seguro?');
                    if ( ok ) {
                        tareas.borrarTarea(id);
                    }
                }
                break;
        }

        guardarDB( tareas.listadoArr );
        
        await pausa();

    } while(option !== '0');
}

main();