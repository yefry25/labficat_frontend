<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <v-text-field v-model="busqueda" append-icon="mdi-magnify" label="buscar" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" to="recepcionMuestra">
              agregar nueva muestra
            </v-btn>
          </v-card-title>
          <v-data-table :headers="headers" :items="muestras" :search="busqueda" :loading="myLoading"
            loading-text="Cargando... Por favor espera">
            <template v-slot:[`item.actions`]="{ item }">
              <v-row>
                <div v-if="item.estado == 1">
                  <v-btn @click="facturaMuestra(item)" icon>
                    <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-file-invoice" />
                  </v-btn>
                  <v-btn @click="infoMuestraEditar(item)" icon>
                    <font-awesome-icon style="font-size:20px" icon="fa-solid fa-pencil" />
                  </v-btn>
                  <v-btn color='red' icon @click="estadoMuestra(item)">
                    <font-awesome-icon style="font-size:20px" icon="fa-solid fa-ban" />
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn disabled icon>
                    <font-awesome-icon style="font-size:20px" icon="fa-solid fa-pencil" />
                  </v-btn>
                  <v-btn color="blue" icon @click="estadoMuestra(item)">
                    <font-awesome-icon style="font-size:20px" icon="fa-regular fa-circle-check" />
                  </v-btn>
                </div>
              </v-row>
            </template>
            <template v-slot:[`item.fechaRecoleccion`]="{ item }">
              <span>{{ fecha(item.fechaRecoleccion) }}</span>
            </template>
            <template v-slot:[`item.estado`]="{ item }">
              <div v-if="item.estado == 1">
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
            <template v-slot:no-data>
              <h2>No hay información</h2>
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
      busqueda: "",
      muestras: [],
      headers: [
        {
          text: "Código de Muestra",
          align: "start",
          sortable: false,
          value: "codMuestra",
        },
        { text: "Dirección de toma de muestra", value: "direccionTomaMuestra" },
        { text: "Lugar de toma de muestra", value: "lugarTomaMuestra" },
        { text: "Fecha de recolección", value: "fechaRecoleccion" },
        { text: "Cotización", value: "cotizacion.numCotizacion" },
        { text: "Estado", value: "estado" },
        { text: "Acciones", value: "actions" },
      ],
    };
  },
  computed: {
    buscar() {
      return this.muestras.filter((user) => {
        const codMuestra = user.codMuestra.toLowerCase();
        const direccion = user.direccionTomaMuestra.toLowerCase();
        const lugar = user.lugarTomaMuestra.toLowerCase();
        const fecha = user.fechaRecoleccion.toLowerCase();
        const Cotización = user.Cotización.toLowerCase();
        const busqueda = this.busqueda.toLowerCase();
        const estado = user.estado.toLowerCase();
        return (
          codMuestra.includes(busqueda) ||
          direccion.includes(busqueda) ||
          lugar.includes(busqueda) ||
          fecha.includes(busqueda) ||
          Cotización.includes(busqueda) ||
          estado.includes(busqueda)
        );
      });
    },
  },
  methods: {
    traerMuestra() {
      axios
        .get("https://labficat-backend.vercel.app/api/muestra")
        .then((res) => {
          this.muestras = res.data.muestra;
          this.myLoading = false
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
    infoMuestraEditar(muestra) {
      this.$router.push("/recepcionMuestra");
      this.$store.dispatch("setMuestraEditar", muestra);
      console.log(this.$store.state.muestraEditar);
    },
    estadoMuestra(muestra) {
      let header = { headers: { "x-token": this.$store.state.token } };
      if (muestra.estado == 1) {
        axios.put(`https://labficat-backend.vercel.app/api/muestra/desactivar/${muestra._id}`, {}, header)
          .then((res) => {
            console.log(res);
            this.$swal({
              icon: "success",
              title: "Muestra desactivada Exitosamente",
            });
            this.traerMuestra()
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
            } else{
              this.$swal({
              icon: "error",
              title: "Error al desactivar la orden de servicio",
            });
            }
          })
      } else {
        axios.put(`https://labficat-backend.vercel.app/api/muestra/activar/${muestra._id}`, {}, header)
          .then((res) => {
            console.log(res);
            this.$swal({
              icon: "success",
              title: "Muestra activada Exitosamente",
            });
            this.traerMuestra()
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
            } else{
              this.$swal({
              icon: "error",
              title: "Error al activar la muestra",
            });
            }
          })
      }
    },
    facturaMuestra(muestra){
      this.$store.dispatch("setFacturaMuestra", muestra)
      this.$router.push("/facturaMuestra")
      console.log(this.$store.state.facturaMuestra);
    },
    fecha(r) {
      
      let d = new Date(r);
      let f = d.toISOString();
      return f.split('T')[0].replace(/-/g, "/")
  
    },
  },
  created() {
    this.traerMuestra();
  },
};
</script>