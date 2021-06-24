
require('colors');
const inquirer = require('inquirer');



// muestra las opciones para que el usuario seleccione una de ellas
const inquirerMenu = async() => {

    // console.clear();
    console.log( '========================='.green );
    console.log( '  Seleccione una opción  '.white );
    console.log( '=========================\n'.green );

    const preguntasMenu = [
        {
            type: 'list',
            name: 'opcionMenu',
            message: '¿Que desea hacer?',
            choices: [
                {
                    value: '1',
                    name: `${'1.'.green} Crear tarea`
                },
                {
                    value: '2',
                    name: `${'2.'.green} Listar tareas`
                },
                {
                    value: '3',
                    name: `${'3.'.green} Listar tareas completadas`
                },
                {
                    value: '4',
                    name: `${'4.'.green} Listar tareas pendientes`
                },
                {
                    value: '5',
                    name: `${'5.'.green} Completar tarea(s)`
                },
                {
                    value: '6',
                    name: `${'6.'.green} Borrar tarea`
                },
                {
                    value: '0',
                    name: `${'0.'.green} Salir`
                }
            ]
        }
    ];

    // Desestructuramos opcionMenu de la respuesta del inquirer
    const { opcionMenu } = await inquirer.prompt( preguntasMenu );
    return opcionMenu;
};

// pregunta de confirmacion para hacer más visible lo que estamos haiendo
const pausa = async() => {

    // objeto tipo input para generar la pausa
    const pausar = [
        {
            type: 'input',
            name: 'entrada',
            message: `Presione ${'ENTER'.green } para continuar`,
        }
    ];
    console.log('\n');
    // retornamos el inquirer sin desestrucurar entrada porque no es necesaria la respuesta
    return await inquirer.prompt( pausar );
};

// recibe una peticion como argumento y espera por una entrada de caracteres
const leerInput = async( message ) => {

    const pregunta = [
        {
            type: 'input',
            name: 'descripcion',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    // Desestructuramos descripcion de la respuesta del inquirer
    const { descripcion } = await inquirer.prompt(pregunta);
    return descripcion;
}

// recibe el arreglo de tareas, muetra el inquirer para seleccionar una tarea y devuelve el id de la seleccionada
const listadoParaBorrar = async( tareas = [] ) => {
    // agregamos cada tarea al arreglo choices con el value y name correspondientes
    const choices = tareas.map(( tarea, i ) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.description }`
        }
    });

    // agregamos al inicio la opcion de cancelar con value = 0
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

// pregunta de confirmacion para efectuar o rechazar cambios
const confirmar = async( message ) => {

    const question = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const { ok } = await inquirer.prompt(question);
    return ok;

}

// recibe el arreglo de tareas y devuelve un arreglo de los ids seleccionado del checkbox
const listadoParaSeleccionar = async( tareas = [] ) => {
    // agregamos cada tarea al arreglo choices con el value y name correspondientes
    const choices = tareas.map(( tarea, i ) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${ idx } ${ tarea.description }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoParaBorrar,
    confirmar,
    listadoParaSeleccionar
}