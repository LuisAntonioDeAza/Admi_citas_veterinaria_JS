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

export default Cita;