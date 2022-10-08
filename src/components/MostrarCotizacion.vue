<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-text-field v-model="busqueda" append-icon="mdi-magnify" label="buscar" single-line hide-details>
            </v-text-field>

            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" to="cotizacion">
              agregar nueva cotizacion
            </v-btn>
          </v-card-title>
          <v-data-table :headers="encabezadoCotizacion" :items="cotizaciones" :search="busqueda">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="traerCotizaciones(item)"> mdi-pencil </v-icon>
            </template>
            <template v-slot:[`item.fechaEmision`]="{ item }">
              <span>{{fecha(item.fechaEmision)}}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "PageMostrar",
  data() {
    return {
      cotizaciones: [],
      busqueda: "",
      encabezadoCotizacion: [
        {
          text: "Numero de cotización",
          align: "start",
          sortable: false,
          value: "numCotizacion",
        },
        { text: "Fecha de emision", value: "fechaEmision", sortable: false },
        { text: "Cliente", value: "idCliente", sortable: false },
        { text: "Elaborador", value: "idElaboradoPor", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    buscar() {
      return this.cotizaciones.filter((user) => {
        const numero = user.numCotizacion.toLowerCase();
        const fecha = user.fechaEmision.toLowerCase();
        const cliente = user.idCliente.toLowerCase();
        const Elaborador = user.idElaboradoPor.toLowerCase();
        const total = user.total.toLowerCase();
        const estado = user.estado.toLowerCase();
        const busqueda = this.busqueda.toLowerCase();

        

        return (
          numero.includes(busqueda) ||
          cliente.includes(busqueda) ||
          fecha.includes(busqueda) ||
          Elaborador.includes(busqueda) ||
          total.includes(busqueda) ||
          estado.includes(busqueda)
        );

      });
    },
  },
  methods: {
    traerCotizaciones() {
      axios
        .get("https://labficat.herokuapp.com/api/cotizacion")
        .then((res) => {
          console.log(res.data.cotizacion);
          this.cotizaciones = res.data.cotizacion;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fecha(r) {
      let d = new Date(r);
      return d.toLocaleDateString() + " - " + d.toLocaleTimeString()
    },
  },
  created() {
    this.traerCotizaciones();
   
  },
};
</script>
