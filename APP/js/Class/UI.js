
import{elimiarCita,editarCita}from'../funciones.js';
import{ContenedorCita}from'../selectores.js';

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

export default UI;