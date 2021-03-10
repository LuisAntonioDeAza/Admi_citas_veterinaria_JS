import Cita from './Class/Citas.js';
import UI from './Class/UI.js'

import {
    ipPropetario,
    ipMascota,
    ipFecha,
    ipHora,
    ipSintomas,
    ipTelefono,
    Formulario
} from './selectores.js'

//instancias a las clases
const ui = new UI();
const administradorDeCitas = new Cita();

let editado;

let datosCitasOBJ = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

export function datosCitas(e) {
    datosCitasOBJ[e.target.name] = e.target.value;
}


export function agregarCita(e) {
    e.preventDefault();

    if (Formulario.querySelector('button[type="submit"]').classList.contains('btn-warning')) {
        Formulario.querySelector('button[type="submit"]').classList.remove('btn-warning');
        Formulario.querySelector('button[type="submit"]').classList.add('btn-success');
    }

    const { mascota, propietario, telefono, fecha, hora, sintomas } = datosCitasOBJ;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirMensaje('Ningun campo puede estar vacio', 'alert-danger');
        return;
    }

    if (editado) {
        Formulario.querySelector('button[type="submit"]').textContent = 'Crear nueva cita';
        administradorDeCitas.editarDatosCita({ ...datosCitasOBJ });
        ui.imprimirMensaje('Cita Editada con exito', 'alert-primary');
        editado = false;

    } else {

        datosCitasOBJ.id = Date.now();
        administradorDeCitas.agregarcita({ ...datosCitasOBJ });
        ui.imprimirMensaje('Cita agreagada con exito', 'alert-success');

    }

    Formulario.reset();
    ui.imprimirCitas(administradorDeCitas);
    reiniciarOBJ();

}
//
export function reiniciarOBJ() {
    datosCitasOBJ.mascota = '';
    datosCitasOBJ.propietario = '';
    datosCitasOBJ.telefono = '';
    datosCitasOBJ.fecha = '';
    datosCitasOBJ.hora = '';
    datosCitasOBJ.sintomas = '';

}



//
export function elimiarCita(id) {
    administradorDeCitas.elimiarCit(id);
    ui.imprimirMensaje('Cita Eliminada con exito', 'alert-warning');
    ui.imprimirCitas(administradorDeCitas);
}
//
export function editarCita(citas) {

    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = citas;
    ui.imprimirMensaje(`Editando cita mascota : ${mascota}`, 'alert-info');
    ipMascota.value = mascota;
    ipPropetario.value = propietario;
    ipTelefono.value = telefono;
    ipFecha.value = fecha;
    ipHora.value = hora;
    ipSintomas.value = sintomas;

    datosCitasOBJ.mascota = mascota;
    datosCitasOBJ.propietario = propietario;
    datosCitasOBJ.telefono = telefono;
    datosCitasOBJ.fecha = fecha;
    datosCitasOBJ.hora = hora;
    datosCitasOBJ.sintomas = sintomas;
    datosCitasOBJ.id = id;

    Formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    Formulario.querySelector('button[type="submit"]').classList.remove('btn-success');
    Formulario.querySelector('button[type="submit"]').classList.add('btn-warning');
    editado = true;
}
