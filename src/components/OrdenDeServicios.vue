<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="mb-4">
          <v-card-title> Ordenes de servicio </v-card-title>
          <v-data-table :headers="encabezado" :items="ordenes" :loading="myLoading"
            loading-text="Cargando... Por favor espera">
            <template v-slot:[`item.actions`]="{ item }">
              <v-row>
                <div v-if="item.estado == 1">
                  <v-btn @click="infoOrdenEditar(item)" icon>
                    <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-file-pen" />
                  </v-btn>
                </div>

                <div v-if="item.estado == 0">
                  <v-btn @click="infoOrdenEditar(item)" icon>
                    <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-file-pen" />
                  </v-btn>
                </div>
                <div v-if="item.estado == 1">
                  <v-btn color="red" icon @click="estadoOrden(item)">
                    <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-ban" />
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn color="blue" icon @click="estadoOrden(item)">
                    <font-awesome-icon style="font-size: 20px" icon="fa-regular fa-circle-check" />
                  </v-btn>
                </div>
              </v-row>
            </template>
            <template v-slot:[`item.estado`]="{ item }">
              <div v-if="item.estado == 1">
                <b>
                  <span class="green--text">Analizado</span>
                </b>
              </div>
              <div v-else>
                <b>
                  <span class="red--text">En proceso</span>
                </b>
              </div>
            </template>
            <template v-slot:[`item.idMuestra.cotizacion.entregaResultados`]="{ item }">
              <v-chip v-if="semaforo(item.idMuestra.cotizacion.entregaResultados) <= 2 && semaforo(item.idMuestra.cotizacion.entregaResultados) > 0
              && item.estado == 0" color="red">
                {{ `${semaforo(item.idMuestra.cotizacion.entregaResultados)} días` }}</v-chip>
              <v-chip v-if="semaforo(item.idMuestra.cotizacion.entregaResultados) == 0 && item.estado == 0" color="red">
                {{ `${semaforo(item.idMuestra.cotizacion.entregaResultados)} días` }}</v-chip>
              <v-chip color="yellow"
                v-if="semaforo(item.idMuestra.cotizacion.entregaResultados) <= 5 && semaforo(item.idMuestra.cotizacion.entregaResultados) >= 3 && item.estado == 0">
                {{ `${semaforo(item.idMuestra.cotizacion.entregaResultados)} días` }}</v-chip>

              <v-chip v-if="semaforo(item.idMuestra.cotizacion.entregaResultados) > 5 && item.estado == 0" color="gray">
                {{ `${semaforo(item.idMuestra.cotizacion.entregaResultados)} días` }}</v-chip>

              <span v-if="semaforo(item.idMuestra.cotizacion.entregaResultados) < 0 && item.estado == 0"
                class="red--text"><strong> Esta
                  vencida hace
                  {{ `${semaforo(item.idMuestra.cotizacion.entregaResultados) * -1} días` }} </strong></span>

              <span v-if="item.estado == 1" class="green--text"><strong>{{ `Orden realizada exitosamente`
              }}</strong></span>
            </template>
          </v-data-table>
          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!--   segmento de cuadro de dialog editar orden -->

    <v-dialog v-model="dialog" max-width="1000px" persistent>
      <v-card>
        <v-card-title>
          <v-hover v-slot="{ hover }">
            <v-btn icon @click="close" :style="{ color: hover ? 'red' : '' }">
              <font-awesome-icon style="fontsize: 20px" icon="fa-solid fa-xmark" />
            </v-btn>
          </v-hover>
          Editar orden de servicio
        </v-card-title>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <form @submit.prevent="submit" class="py-7 px-7">
            <validation-provider v-slot="{ errors }" name="resultado" rules="required">
              <v-text-field v-model="resultado" :error-messages="errors" type="number" label="Resultado" outlined
                required></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="incertidumbre" rules="required">
              <v-text-field v-model="incertidumbre" :error-messages="errors" type="number" label="Incertidumbre"
                outlined required></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="estado" rules="required">
              <!-- <v-text-field v-model="estado" :error-messages="errors" label="Estado" outlined required></v-text-field> -->
              <v-select :items="estadoArray" v-model="estado" :error-messages="errors" label="Estado" solo outlined required></v-select>
            </validation-provider>
            <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded @click="ensayoItems" block>
              Enviar ensayo editado
            </v-btn>
          </form>
        </validation-observer>
      </v-card>
    </v-dialog>

    <!-- segmento de cuadro de dialogo para selecionar el ensayo que se va a editar -->

    <v-row>
      <v-col>
        <v-dialog v-model="dialogTabla" max-width="1000px" persistent>
          <v-card>
            <v-card-title>
              <v-hover v-slot="{ hover }">
                <v-btn icon @click="closeTabla" :style="{ color: hover ? 'red' : '' }">
                  <font-awesome-icon style="fontsize: 26px" icon="fa-solid fa-xmark" />
                </v-btn>
              </v-hover>
              Ensayos
            </v-card-title>
            <v-data-table :headers="headerItemOrden" :items="itemsOrden" :loading="myLoadingTabla"
              loading-text="Cargando... Por favor espera">
              <template v-slot:[`item.actions`]="{ item }">
                <v-row>
                  <v-btn @click="editarItemOrden(item)" icon>
                    <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-file-pen" />
                  </v-btn>
                </v-row>
              </template>
              <template v-slot:footer>
                <v-row>
                  <v-text-field class="ml-5" v-model="observacion" label="Observaciones" required></v-text-field>
                  <v-spacer></v-spacer>
                  <v-btn class="primary mt-5 mr-7" @click="editarOrdenServicio">Editar orden de servicio</v-btn>
                </v-row>
              </template>
            </v-data-table>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email, min } from "vee-validate/dist/rules";
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
extend("email", {
  ...email,
  message: "Email must be valid",
});
extend("min", {
  ...min,
  message: "El campo {_field_} debe tener {length} caracteres o más",
});

import axios from "axios";
export default {
  name: "pageOrdenServicio",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      myLoading: true,
      myLoadingTabla: true,
      dialog: false,
      dialogTabla: false,
      idensayo: '',
      responsable: '',
      supervisor: '',
      resultado: "",
      incertidumbre: "",
      estado:"",
      estadoArray: [
        "en proceso",
        "analizada"
      ],
      observacion: "",
      encabezado: [
        {
          text: "Muestra",
          align: "start",
          sortable: false,
          value: "idMuestra.codMuestra",
        },
        { text: "observaciones", value: "observaciones", sortable: false },
        { text: "Entrega de resultados", value: "idMuestra.cotizacion.entregaResultados", sortable: false },
        
        { text: "estado", value: "estado", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      ordenes: [],
      itemsOrden: [],
      headerItemOrden: [
        {
          text: "Ensayo",
          align: "start",
          sortable: false,
          value: "idensayo.ensayo",
        },
        { text: "Responsable", value: "responsable.nombre", sortable: false },
        { text: "Supervisor", value: "supervisor.nombre", sortable: false },
        { text: "Resultado", value: "resultado", sortable: false },
        { text: "Incertidumbre", value: "incertidumbre", sortable: false },
        { text: "Estado", value: "estado", sortable: false },

        { text: "Acciones", value: "actions", sortable: false },
      ],
      ordenEditar: {},
      ensayosOrdenes: []
    };
  },
  methods: {
    traerOrdenes() {
      axios
        .get("https://labficat-backend.vercel.app/api/orden")
        .then((res) => {
          this.myLoading = false;
          this.ordenes = res.data.orden;
          console.log(this.ordenes);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    infoOrdenEditar(orden) {
      console.log(orden);

      this.myLoadingTabla = false;
      this.dialogTabla = true;
      this.ordenEditar = orden;
      this.itemsOrden = orden.itemsorden


    },
    editarOrdenServicio() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://labficat-backend.vercel.app/api/orden/completado/${this.ordenEditar._id}`,
          {
            itemsorden: this.ensayosOrdenes,
            observaciones: this.observacion,
          },
          header
        )
        .then((res) => {
          console.log(res.data.orden);
          this.$swal({
            icon: "success",
            title: "Actualizacion de la orden de servicio exitoso",
          });
          this.traerOrdenes();
          this.limpiarInfo();
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
          } else {
            this.$swal({
              icon: "error",
              title: "Error al actualizar la orden de servicio",
            });
          }
        });
    },
    editarItemOrden(ensayo) {
      this.idensayo = ensayo.idensayo._id;
      this.responsable = ensayo.responsable._id;
      this.supervisor = ensayo.supervisor._id;
      /* this.estado = ensayo.estado; */
      console.log(ensayo);
      this.dialog = true;
    },
    limpiarInfo() {
      this.resultado = "";
      this.incertidumbre = "";
      this.observacion = "";
    },
    estadoOrden(orden) {
      let header = { headers: { "x-token": this.$store.state.token } };
      if (orden.estado == 1) {
        axios
          .put(
            `https://labficat-backend.vercel.app/api/orden/desactivar/${orden._id}`,
            {},
            header
          )
          .then((res) => {
            console.log(res);
            this.$swal({
              icon: "success",
              title: "Orden desactivada Exitosamente",
            });
            this.traerOrdenes();
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
            } else {
              this.$swal({
                icon: "error",
                title: "Error al desactivar la orden de servicio",
              });
            }
          });
      } else {
        axios
          .put(
            `https://labficat-backend.vercel.app/api/orden/activar/${orden._id}`,
            {},
            header
          )
          .then((res) => {
            console.log(res);
            this.$swal({
              icon: "success",
              title: "Orden activada Exitosamente",
            });
            this.traerOrdenes();
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
            } else {
              this.$swal({
                icon: "error",
                title: "Error al activar la orden de servicio",
              });
            }
          });
      }
    },
    ensayoItems() {
      this.ensayosOrdenes.push({
        idensayo: this.idensayo,
        responsable: this.responsable,
        supervisor: this.supervisor,
        resultado: this.resultado,
        incertidumbre: this.incertidumbre,
        estado: this.estado
      })
      this.$swal({
        icon: "success",
        title: "Información guardada",
      });
      console.log(this.ensayosOrdenes);
    },
    semaforo(fecha) {

      let fechaReal = fecha.split('T')[0].replace(/-/g, "/");
      let fechaActual = new Date().toLocaleDateString();
      let fechaActualTotal = new Date(fechaActual);
      let entregaTotal = new Date(fechaReal);
      let fechaDefinitiva = Math.floor((entregaTotal.getTime() - fechaActualTotal.getTime()) / (1000 * 60 * 60 * 24));
      /* let fechaRedondeada = Math.round(fechaDefinitiva) */
      /* console.log("dias: " + fechaRedondeada); */
      return fechaDefinitiva
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeTabla() {
      this.dialogTabla = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.traerOrdenes();
  },
};
</script>

<style scoped>

</style>