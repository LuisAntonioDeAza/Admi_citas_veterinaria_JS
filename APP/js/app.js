const ipMascota = document.querySelector('#mascota');
const ipPropetario = document.querySelector('#propietario');
const ipTelefono = document.querySelector('#telefono');
const ipFecha = document.querySelector('#fecha');
const ipHora = document.querySelector('#hora');
const ipSintomas = document.querySelector('#sintomas');

const Formulario = document.querySelector('#nueva-cita');
const ContenedorCita = document.querySelector('#citas');
let editado;

//Clases
class Cita {

    constructor() {
        this.cita = [];
    }

    agregarcita(citas) {
        this.cita = [...this.cita, citas];
    }
    elimiarCit(ids) {
        this.cita = this.cita.filter(date => date.id !== ids);
    }
    editarDatosCita(citaA){
        this.cita = this.cita.map(cita => cita.id === citaA.id ? citaA : cita);
    }
}
//

class UI {
    imprimirMensaje(mensje, tipo) {
        const msjE = document.querySelector('#contenido');
        if (msjE.children[0].classList.contains('alert')) {
            msjE.children[0].remove();
        }

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12', tipo);

        divMensaje.textContent = mensje;
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
    }

    imprimirCitas(citas) {
        const { cita } = citas;

        while (ContenedorCita.firstChild) {
            ContenedorCita.removeChild(ContenedorCita.firstChild);
        }

        cita.forEach(cit => {
         const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cit;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            const Pmascota = document.createElement('h2');
            Pmascota.classList.add('card-title', 'font-weigth-border');
            Pmascota.textContent = mascota;

            const propetarioP = document.createElement('p');
            propetarioP.innerHTML = `
            <span class="font-weigth-border">Propetario : </span> ${propietario}
            
            `;

            const TelPropetario = document.createElement('p');
            TelPropetario.innerHTML = `
            <span class="font-weigth-border">Telefono: </span> ${telefono}
            
            `;
            const ConsultaFecha = document.createElement('p');
            ConsultaFecha.innerHTML = `
            <span class="font-weigth-border">Fecha : </span> ${fecha}
            
            `;
            const ConsultaHora = document.createElement('p');
            ConsultaHora.innerHTML = `
            <span class="font-weigth-border">Hora : </span> ${hora}
            
            `;
            const Sintomas = document.createElement('p');
            Sintomas.innerHTML = `
            <span class="font-weigth-border">Sintomas : </span> ${sintomas}
            
            `;

            //btnEmilinar cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger');
            btnEliminar.innerHTML = `Eliminar`;

            //btn editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar`;

            btnEliminar.onclick = () => {
                elimiarCita(id);
            }
            btnEditar.onclick = () => {
                editarCita(cit);
            }

            divCita.appendChild(Pmascota);
            divCita.appendChild(propetarioP);
            divCita.appendChild(TelPropetario);
            divCita.appendChild(ConsultaFecha);
            divCita.appendChild(ConsultaHora);
            divCita.appendChild(Sintomas);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            ContenedorCita.appendChild(divCita);

        });

    }

}
//instancias a las clases
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
}

function agregarCita(e) {
    e.preventDefault();
    if(Formulario.querySelector('button[type="submit"]').classList.contains('btn-warning')){
        Formulario.querySelector('button[type="submit"]').classList.remove('btn-warning');
        Formulario.querySelector('button[type="submit"]').classList.add('btn-success');
    }
    
    const { mascota, propietario, telefono, fecha, hora, sintomas } = datosCitasOBJ;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirMensaje('Ningun campo puede estar vacio', 'alert-danger');
        return;
    } 

    if(editado){
        Formulario.querySelector('button[type="submit"]').textContent = 'Crear nueva cita';
        administradorDeCitas.editarDatosCita({...datosCitasOBJ});
        ui.imprimirMensaje('Cita Editada con exito', 'alert-primary');
        editado = false;
        
    }else{
        
        datosCitasOBJ.id = Date.now();
        administradorDeCitas.agregarcita({ ...datosCitasOBJ });
        ui.imprimirMensaje('Cita agreagada con exito', 'alert-success');
       
    }
        
        Formulario.reset();
        ui.imprimirCitas(administradorDeCitas);
        reiniciarOBJ();
    
}
//
function reiniciarOBJ() {
    datosCitasOBJ.mascota = '';
    datosCitasOBJ.propietario = '';
    datosCitasOBJ.telefono = '';
    datosCitasOBJ.fecha = '';
    datosCitasOBJ.hora = '';
    datosCitasOBJ.sintomas = '';

}
//
function elimiarCita(id) {
    administradorDeCitas.elimiarCit(id);
    ui.imprimirMensaje('Cita Eliminada con exito', 'alert-warning');
    ui.imprimirCitas(administradorDeCitas);
}
//
function editarCita(citas) {
    
    const { mascota, propietario, telefono, fecha, hora, sintomas,id } = citas;
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
