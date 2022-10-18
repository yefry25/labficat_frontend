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
          <v-data-table :headers="encabezadoCotizacion" :items="cotizaciones" :search="busqueda" :loading="myLoading"
            loading-text="Cargando... Por favor espera">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn @click="editarCotizacion(item)" icon>
                <font-awesome-icon style="font-size:20px" icon="fa-solid fa-pencil" />
              </v-btn>
            </template>
            <template v-slot:[`item.fechaEmision`]="{ item }">
              <span>{{fecha(item.createdAt)}}</span>
            </template>
            <template v-slot:[`item.estado`]="{ item }">
              <div v-if="item.estado==1">
                <b>
                  <span class="blue--text">Activo</span>
                </b>
              </div>
              <div v-else>
                <b>
                  <span class="red--text">Inactivo</span>
                </b>
              </div>
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
      myLoading: true,
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
        { text: "Cliente", value: "idCliente.nombre", sortable: false },
        { text: "Elaborador", value: "idElaboradoPor.nombre", sortable: false },
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
        const cliente = user.idCliente.nombre.toLowerCase();
        const Elaborador = user.idElaboradoPor.nombre.toLowerCase();
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
          this.myLoading = false
          this.cotizaciones = res.data.cotizacion;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editarCotizacion(cotizacion) {
      this.$store.dispatch('setCotizacionEditar', cotizacion)
      console.log(this.$store.state.cotizacionEditar);
      this.$router.push('/cotizacion')
    },
    fecha(r) {
      let d = new Date(r);
      return d.toLocaleDateString()+' ' + '-' + ' '+d.toLocaleTimeString()
    }
  },
  created() {
    this.traerCotizaciones();
    
  },
};
</script>
