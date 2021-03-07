const ipMascota = document.querySelector('#mascota');
const ipPropetario = document.querySelector('#propietario');
const ipTelefono = document.querySelector('#telefono');
const ipFecha = document.querySelector('#fecha');
const ipHora = document.querySelector('#hora');
const ipSintomas = document.querySelector('#sintomas');

const Formulario = document.querySelector('#nueva-cita');
const ContenedorCita = document.querySelector('#citas');

//Clases
class Cita {
    constructor() {
        this.cita = [];
    }

    agregarcita(citas) {
        this.cita = [...this.cita, citas];
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

        while(ContenedorCita.firstChild){
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


            divCita.appendChild(Pmascota);
            divCita.appendChild(propetarioP);
            divCita.appendChild(TelPropetario);
            divCita.appendChild(ConsultaFecha);
            divCita.appendChild(ConsultaHora);
            divCita.appendChild(Sintomas);

            ContenedorCita.appendChild(divCita);

        });

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
}

function agregarCita(e) {
    e.preventDefault();
    const { mascota, propietario, telefono, fecha, hora, sintomas } = datosCitasOBJ;

    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirMensaje('Ningun campo puede estar vacio', 'alert-danger');
        return;
    } else {
        ui.imprimirMensaje('Cita agreagada con exito', 'alert-success');
        datosCitasOBJ.id = Date.now();
        administradorDeCitas.agregarcita({ ...datosCitasOBJ });

        Formulario.reset();
        ui.imprimirCitas(administradorDeCitas);

        reiniciarOBJ();
    }
}

function reiniciarOBJ() {
    datosCitasOBJ.mascota = '';
    datosCitasOBJ.propietario = '';
    datosCitasOBJ.telefono = '';
    datosCitasOBJ.fecha = '';
    datosCitasOBJ.hora = '';
    datosCitasOBJ.sintomas = '';

}
