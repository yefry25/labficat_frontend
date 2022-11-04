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
              <div v-if="item.estado==1">
                <v-btn @click="editarCotizacion(item)" icon>
                  <font-awesome-icon style="font-size:20px" icon="fa-solid fa-pencil" />
                </v-btn>
              </div>
              <div v-else>
                <v-btn disabled icon>
                  <font-awesome-icon style="font-size:20px" icon="fa-solid fa-pencil" />
                </v-btn>
              </div>
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
          sortable: true,
          value: "numCotizacion",
        },
        { text: "Fecha de emision", value: "fechaEmision", sortable: false },
        { text: "Cliente", value: "idCliente.nombre", sortable: true },
        { text: "Elaborador", value: "idElaboradoPor.nombre", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Estado", value: "estado", sortable: true },
        { text: "Acciones", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    buscar() {
      return this.cotizaciones.filter((user) => {
        const numero = user.numCotizacion.toLowerCase();
        const cliente = user.idCliente.nombre.toLowerCase();
        const Elaborador = user.idElaboradoPor.nombre.toLowerCase();
        const busqueda = this.busqueda.toLowerCase();

        return (
          numero.includes(busqueda) ||
          cliente.includes(busqueda) ||
          Elaborador.includes(busqueda)

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
          this.cotizaciones = res.data.cotizacion.reverse();
        })
        .catch((err) => {
          console.log(err);
          if (
              err.response.data.msg ==
              "Token expiró, por favor inicie sesión nuevamente"
            ) {
              this.$swal({
                icon: "error",
                title: `${err.response.data.msg}`,
                confirmButtonText: "Ir a inicio de sesión",
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  this.$router.push("/");
                  this.$store.state.token = undefined;
                  localStorage.removeItem("token");
                  localStorage.removeItem("elaborador");
                }
              });
            }
        });
    },
    editarCotizacion(cotizacion) {
      this.$store.dispatch('setCotizacionEditar', cotizacion)
      console.log(this.$store.state.cotizacionEditar);
      this.$router.push('/cotizacion')
    },
    fecha(r) {
      let d = new Date(r);
      let f = d.toISOString();
      return f.split('T')[0].replace(/-/g, "/")
      // return f.toISOString() + ' ' + '-' + ' ' + d.toLocaleTimeString()
    }
  },
  created() {
    this.traerCotizaciones();

  },
};
</script>
