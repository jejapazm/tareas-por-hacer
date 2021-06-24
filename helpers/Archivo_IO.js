
const fs = require('fs');

const archivo = './db/data.json';

// recibe informacion para escribirla en el archivo sincronicamente
const guardarDB = ( data ) => {
    fs.writeFileSync( archivo, JSON.stringify( data ) );
};

// lee el archivo de tareas sincronicamente
const leerDB = () => {

    if ( !fs.existsSync( archivo ) ) {
        return null;
    }
    const info = fs.readFileSync( archivo, { encoding: 'utf-8'} );
    const data = JSON.parse( info );
    return data;
};

// Exportacion de funciones
module.exports = {
    guardarDB,
    leerDB
}
