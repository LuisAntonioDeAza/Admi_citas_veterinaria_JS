const ipMascota = document.querySelector('#mascota');
const ipPropetario = document.querySelector('#propietario');
const ipTelefono = document.querySelector('#telefono');
const ipFecha = document.querySelector('#fecha');
const ipHora = document.querySelector('#hora');
const ipSintomas = document.querySelector('#sintomas');

const Formulario = document.querySelector('#nueva-cita');
const cita = document.querySelector('#citas');

//Clases
class Cita{
    constructor(){
        this.cita = [];
    }
}
//
class UI{
    imprimirMensaje(mensje,tipo){
        const msjE =document.querySelector('#contenido');
        if(msjE.children[0].classList.contains('alert')){
            msjE.children[0].remove();
        }
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12', tipo);
     
        divMensaje.textContent = mensje;
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
    }

}
const ui = new UI();
const administradorDeCitas = new Cita();
//Funciones
EventListener();

function EventListener() {
    ipMascota.addEventListener('input', datosCitas);
    ipPropetario.addEventListener('input', datosCitas);
    ipTelefono.addEventListener('input', datosCitas);
    ipFecha.addEventListener('input', datosCitas);
    ipHora.addEventListener('input', datosCitas);
    ipSintomas.addEventListener('input', datosCitas);
    Formulario.addEventListener('submit', agregarCita);
}

let datosCitasOBJ = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

function datosCitas(e) {
    datosCitasOBJ[e.target.name] = e.target.value;
    console.log(datosCitasOBJ);
}

function agregarCita(e){
e.preventDefault();
    const {mascota,propietario,telefono,fecha,hora,sintomas} = datosCitasOBJ;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirMensaje('Ningun campo puede estar vacio','alert-danger');
        return;
    }else{
        ui.imprimirMensaje('Cita agreagada con exito','alert-success');
    }
}