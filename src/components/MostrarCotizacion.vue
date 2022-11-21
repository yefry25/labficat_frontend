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
              <div v-if="item.estado == 1">

                <v-btn @click="editarCotizacion(item)" icon>
                  <font-awesome-icon style="font-size:20px" icon="fa-solid fa-pencil" />
                </v-btn>
                <v-btn color="blue" icon @click="aceptarCotizacion(item)">
                  <font-awesome-icon style="font-size:20px" icon="fa-regular fa-circle-check" />
                </v-btn>
              </div>
              <div v-if="item.estado == 0">
                <v-btn disabled icon>
                  <font-awesome-icon style="font-size:20px" icon="fa-solid fa-pencil" />
                </v-btn>
                <!-- <v-btn color='red' @click="rechazarCotizacion(item)" icon>
                  <font-awesome-icon style="font-size:20px" icon="fa-solid fa-ban" />
                </v-btn> -->
                <v-btn color="blue" icon @click="aceptarCotizacion(item)">
                  <font-awesome-icon style="font-size:20px" icon="fa-regular fa-circle-check" />
                </v-btn>
              </div>
              <div v-if="item.estado == 2">
                <v-btn @click="facturaCotizacion(item)" icon>
                  <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-file-invoice" />
                </v-btn>
                <v-btn disabled icon>
                  <font-awesome-icon style="font-size:20px" icon="fa-solid fa-pencil" />
                </v-btn>
                <v-btn color='red' @click="llenarInfoCotiRechazar(item)" icon>
                  <font-awesome-icon style="font-size:20px" icon="fa-solid fa-ban" />
                </v-btn>
              </div>
            </template>
            <template v-slot:[`item.fechaEmision`]="{ item }">
              <span>{{ fecha(item.createdAt) }}</span>
            </template>
            <template v-slot:[`item.total`]="{ item }">
              <span>{{ valores(item.total) }}</span>
            </template>
            <template v-slot:[`item.estado`]="{ item }">
              <div v-if="item.estado == 1">
                <b>
                  <span class="orange--text">Enviada</span>
                </b>
              </div>
              <div v-if="item.estado == 0">
                <b>
                  <span class="red--text">Rechazada</span>
                </b>
              </div>
              <div v-if="item.estado == 2">
                <b>
                  <span class="blue--text">Aceptada</span>
                </b>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialog para la observación de rechazo -->

    <v-row>
      <v-col>
        <v-dialog v-model="dialog" max-width="1000px" persistent>
          <v-card>
            <v-card-title>
              <v-hover v-slot="{ hover }">
                <v-btn icon @click="{ dialog = false }" :style="{ color: hover ? 'red' : '' }">
                  <font-awesome-icon style="fontsize: 20px" icon="fa-solid fa-xmark" />
                </v-btn>
              </v-hover>
              Observación del rechazo
            </v-card-title>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit" class="py-7 px-7">
                <validation-provider v-slot="{ errors }" name="observacion del rechazo" rules="required">
                  <v-text-field v-model="observacionRechazo" :error-messages="errors" label="Observacion del rechazo"
                    outlined required>
                  </v-text-field>
                </validation-provider>
                <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded
                  @click="rechazarCotizacion" block>
                  Enviar informe de rechazo
                </v-btn>
              </form>
            </validation-observer>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} no puede estar vacio",
});

import axios from "axios";
export default {
  name: "PageMostrar",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      dialog: false,
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
        { text: "Observacion rechazo", value: "observacionRechazo", sortable: false },
        { text: "Estado", value: "estado", sortable: true },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      observacionRechazo: "",
      confirmar: false,
      cotizacionRechazar: ''
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
    aceptarCotizacion(cotizacion) {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios.put(`https://labficat.herokuapp.com/api/cotizacion/aceptar/${cotizacion._id}`, {}, header)
        .then((res) => {
          console.log(res);
          this.traerCotizaciones();
          this.$swal({
            icon: "success",
            title: "Cotización aceptada Exitosamente",
          });
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
        })
    },
    llenarInfoCotiRechazar(cotizacion) {
      this.cotizacionRechazar = cotizacion;
      this.dialog = true;
    },
    rechazarCotizacion() {
      let header = { headers: { "x-token": this.$store.state.token } };

      axios.put(`https://labficat.herokuapp.com/api/cotizacion/observacion/${this.cotizacionRechazar._id}`, {
        observacionRechazo: this.observacionRechazo
      }, header)
        .then((res) => {
          console.log(res);
          this.$swal({
            icon: "success",
            title: "Cotización actualizada con la observación de rechazo",
          });
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
        })

      axios.put(`https://labficat.herokuapp.com/api/cotizacion/rechazar/${this.cotizacionRechazar._id}`, {}, header)
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            this.$swal({
              icon: "success",
              title: "Cotización rechazada Exitosamente",
            });
          }, 4000)
          this.traerCotizaciones();
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
        })

    },
    facturaCotizacion(cotizacion) {
      this.$store.dispatch("setFacturaCotizacion", cotizacion)
      this.$router.push('/facturaCotizacion')
      console.log(this.$store.state.facturaCotizacion);
    },
    fecha(r) {
      let d = new Date(r);
      let f = d.toISOString();
      return f.split('T')[0].replace(/-/g, "/")
      // return f.toISOString() + ' ' + '-' + ' ' + d.toLocaleTimeString()
    },
    valores(valor) {
      const plata = valor;
      const currency = (number) => {
        return new Intl.NumberFormat('en-US',
          {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
          }
        ).format(number);
      };
      return currency(plata)
    }
  },
  created() {
    this.traerCotizaciones();
    this.valores()

  },
};
</script>
