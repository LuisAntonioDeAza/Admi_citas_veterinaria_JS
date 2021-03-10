import {datosCitas,agregarCita}from '../funciones.js';

import {
    ipPropetario,
    ipMascota,
    ipFecha,
    ipHora,
    ipSintomas,
    ipTelefono,
    Formulario}from '../selectores.js';

class App{
    constructor(){
       
        this.initApp();
    }

    initApp(){
       
        ipMascota.addEventListener('input', datosCitas);
        ipPropetario.addEventListener('input', datosCitas);
        ipTelefono.addEventListener('input', datosCitas);
        ipFecha.addEventListener('input', datosCitas);
        ipHora.addEventListener('input', datosCitas);
        ipSintomas.addEventListener('input', datosCitas);
        Formulario.addEventListener('submit', agregarCita);
        
    
    }
}

export default App;