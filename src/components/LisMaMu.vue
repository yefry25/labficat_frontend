<template>
    <v-container fluid>
        <v-row>
            <v-col>
                    <v-data-table :headers="header" :items="lismamu" :loading="myLoading"
                        loading-text="Cargando... Por favor espera">
                        <template v-slot:[`item.createdAt`]="{ item }">
                            <span>{{ fechaCompleta(item.createdAt) }}</span>
                        </template>
                        <template v-slot:[`item.fechaRecoleccion`]="{ item }">
                            <span>{{ fecha(item.fechaRecoleccion) }}</span>
                        </template>
                        <template v-slot:[`item.cotizacion.entregaResultados`]="{ item }">
                            <span>{{ fecha(item.cotizacion.entregaResultados) }}</span>
                        </template>
                    </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from "axios";
export default {
    name: 'pageLisMaMu',
    data() {
        return {
            myLoading: true,
            header: [
                {
                    text: "Fecha ingreso muestra",
                    align: "start",
                    sortable: false,
                    value: "createdAt",
                },
                { text: "Código muestra", value: "codMuestra", sortable: false },
                { text: "Solicitante", value: "solicitante.nombre", sortable: false },
                { text: "NIT/CC", value: "solicitante.documento", sortable: false },
                { text: "Dirección", value: "solicitante.direccion", sortable: false },
                { text: "Ciudad", value: "solicitante.ciudad.Ciudad", sortable: false },
                { text: "Departamento", value: "solicitante.ciudad.departamento", sortable: false },
                { text: "Contacto", value: "solicitante.contacto", sortable: false },
                { text: "Teléfono", value: "solicitante.telefono", sortable: false },
                { text: "Correo", value: "solicitante.correo", sortable: false },
                { text: "Municipio de recolección", value: "munRecoleccion.Ciudad", sortable: false },
                { text: "Dirección toma muestra", value: "direccionTomaMuestra", sortable: false },
                { text: "Lugar toma muestra", value: "lugarTomaMuestra", sortable: false },
                { text: "Muestra recolectada por", value: "muestraRecolectadaPor", sortable: false },
                { text: "Procedimiento muestreo", value: "procedimientoMuestreo", sortable: false },
                { text: "Tipo muestra", value: "tipoMuestra.tipos", sortable: false },
                { text: "Matriz muestra", value: "matrizMuestra", sortable: false },
                { text: "Fecha recoleccion muestra", value: "fechaRecoleccion", sortable: false },
                { text: "Cotización", value: "cotizacion.numCotizacion", sortable: false },
                { text: "Item cotización", value: "item", sortable: false },
                { text: "Fecha recepción muestra", value: "metodo", sortable: false },
                { text: "Fecha emisión muestra", value: "metodo", sortable: false },
                { text: "Fecha entrega resultados", value: "cotizacion.entregaResultados", sortable: false },
                { text: "Seguimiento entrega resultados", value: "metodo", sortable: false },
                { text: "Estado muestra", value: "estado", sortable: false },
                { text: "Diligenciado", value: "metodo", sortable: false },
                { text: "Supervisado", value: "metodo", sortable: false },
            ],
            lismamu: []
        }
    },
    methods: {
        traerListado() {
            axios.get('https://labficat.herokuapp.com/api/muestra/lismamu')
                .then((res) => {
                    console.log(res.data.muestra);
                    this.lismamu = res.data.muestra
                    this.myLoading = false
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        fechaCompleta(r) {
            let d = new Date(r);
            return d.toLocaleDateString() + ' ' + '-' + ' ' + d.toLocaleTimeString()
        },
        fecha(r) {
            let fecha = r.split('T')[0].replace(/-/g, "/")
            console.log(fecha);
            let d = new Date(r);
            return d.toLocaleDateString();
        },
    },
    created() {
        this.traerListado()
    }
}
</script>