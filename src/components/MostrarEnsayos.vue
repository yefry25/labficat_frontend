<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-actions>
            <h2>Ensayos</h2>
            <v-spacer></v-spacer>
            <v-btn class="primary" to="ensayo">Agregar ensayos</v-btn>
          </v-card-actions>
          <v-data-table :headers="headerEnsayo" :items="ensayos" :loading="myLoading"
            loading-text="Cargando... Por favor espera">
            <template v-slot:[`item.actions`]="{ item }">
              <v-row>
                <div v-if="item.estado==1">
                  <v-btn icon @click="editar(item)">
                  <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-file-pen" />
                </v-btn>
                </div>
                <div v-if="item.estado==0">
                  <v-btn icon disabled>
                  <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-file-pen" />
                </v-btn>
                </div>
                <div v-if="item.estado == 1">
                  <v-btn color="red" icon @click="estadoEnsayo(item)">
                    <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-ban" />
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn color="blue" icon @click="estadoEnsayo(item)">
                    <font-awesome-icon style="font-size: 20px" icon="fa-regular fa-circle-check" />
                  </v-btn>
                </div>
              </v-row>
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
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialog -->

    <v-row>
      <v-col>
        <v-dialog v-model="dialogEditar" max-width="1000px" persistent>
          <v-card>
            <v-card-title>
              <v-hover v-slot="{ hover }">
                <v-btn icon @click="close" :style="{ color: hover ? 'red' : '' }">
                  <font-awesome-icon style="fontsize: 20px" icon="fa-solid fa-xmark" />
                </v-btn>
              </v-hover>
              Editar ensayos
            </v-card-title>
            <validationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit" class="py-7 px-7">
                <validation-provider v-slot="{ errors }" name="ensayo" rules="required">
                  <v-text-field v-model="ensayo" :error-messages="errors" label="Ensayo" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="metodo" rules="required">
                  <v-text-field v-model="metodo" :error-messages="errors" label="Metodo" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="tecnica" rules="required">
                  <v-text-field v-model="tecnica" :error-messages="errors" label="Técnica" type="text" outlined
                    required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="valor mínimo" rules="required">
                  <v-text-field v-model="valorMinimo" :error-messages="errors" label="Valor Mínimo" type="number"
                    outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="valor maximo" rules="required">
                  <v-text-field v-model="valorMaximo" :error-messages="errors" label="Valor Máximo" type="number"
                    outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="unidades" rules="required">
                  <v-text-field v-model="unidades" :error-messages="errors" label="Unidades" type="number" outlined
                    required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="costo" rules="required">
                  <v-text-field v-model="costo" :error-messages="errors" label="Costo" type="number" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="descripcion" rules="required">
                  <v-text-field v-model="descripcion" :error-messages="errors" label="Descripción" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="limite cuantificación" rules="required">
                  <v-text-field v-model="limiteCuantificacion" :error-messages="errors" type="number"
                    label="Límite cuantificación" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="titular" rules="required">
                  <v-autocomplete v-model="responsables.titular" :error-messages="errors" :items="usuarios"
                    item-text="nombre" item-value="._id" dense filled label="Titular"></v-autocomplete>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="suplente" rules="required">
                  <v-autocomplete v-model="responsables.suplente" :error-messages="errors" :items="usuarios"
                    item-text="nombre" item-value="._id" dense filled label="Suplente"></v-autocomplete>
                </validation-provider>
                <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block
                  @click="editarEnsayo">
                  Editar ensayo
                </v-btn>
              </form>
            </validationObserver>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-hover v-slot="{ hover }">
                <v-btn class="ml-5" text @click="close" :style="{ background: hover ? 'red' : '' }">
                  Cerrar
                </v-btn>
              </v-hover>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { required, email, min, confirmed } from "vee-validate/dist/rules";
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
extend("confirmed", {
  ...confirmed,
  message: "El campo {_field_} debe coincidir con contraseña",
});
export default {
  name: "pageMostrarEnsayo",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      myLoading: true,
      dialogEditar: false,
      idEnsayo: "",
      ensayos: [],
      headerEnsayo: [
        {
          text: "Ensayo",
          align: "start",
          sortable: false,
          value: "ensayo",
        },
        { text: "Método", value: "metodo", sortable: false },
        { text: "Técnica", value: "tecnica", sortable: false },
        { text: "Valor mínimo", value: "valorMinimo", sortable: false },
        { text: "Valor maximo", value: "valorMaximo", sortable: false },
        { text: "Unidades", value: "unidades", sortable: false },
        { text: "Costo", value: "costo", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        {
          text: "Límite cuantificación",
          value: "limiteCuantificacion",
          sortable: false,
        },
        { text: "Estado", value: "estado", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      ensayo: "",
      metodo: "",
      tecnica: "",
      valorMinimo: null,
      valorMaximo: null,
      unidades: null,
      costo: null,
      descripcion: "",
      limiteCuantificacion: "",
      responsables: {
        titular: "",
        suplente: "",
      },
      usuarios: [],
    };
  },
  methods: {
    traerEnsayos() {
      axios
        .get("https://labficat.herokuapp.com/api/ensayo")
        .then((res) => {
          this.ensayos = res.data.ensayos;
          this.myLoading = false;
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
    editarEnsayo() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://labficat.herokuapp.com/api/ensayo/${this.idEnsayo}`,
          {
            ensayo: this.ensayo,
            metodo: this.metodo,
            tecnica: this.tecnica,
            valorMinimo: this.valorMinimo,
            valorMaximo: this.valorMaximo,
            unidades: this.unidades,
            costo: this.costo,
            descripcion: this.descripcion,
            limiteCuantificacion: this.limiteCuantificacion,
            responsables: this.responsables,
          },
          header
        )
        .then((res) => {
          console.log(res.data.modificar);
          this.traerEnsayos();
          this.$swal({
            icon: "success",
            title: "Moficiación exitosa",
            text: `Ensayo modificado exitosamente`,
          });
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
              title: "Error al modificar el ensayo",
            });
          }
        });
    },
    editar(ensayo) {
      console.log(ensayo);
      this.dialogEditar = true;
      this.idEnsayo = ensayo._id;
      this.ensayo = ensayo.ensayo;
      this.metodo = ensayo.metodo;
      this.tecnica = ensayo.tecnica;
      this.valorMinimo = ensayo.valorMinimo;
      this.valorMaximo = ensayo.valorMaximo;
      this.unidades = ensayo.unidades;
      this.costo = ensayo.costo;
      this.descripcion = ensayo.descripcion;
      this.limiteCuantificacion = ensayo.limiteCuantificacion;
      this.responsables = {
        titular: ensayo.responsables.titular,
        suplente: ensayo.responsables.suplente,
      };
    },
    traerUsuarios() {
      axios
        .get("https://labficat.herokuapp.com/api/usuario")
        .then((res) => {
          this.usuarios = res.data.usuario;
          console.log(this.usuarios);
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
    estadoEnsayo(ensayo) {
      let header = { headers: { "x-token": this.$store.state.token } };
      if (ensayo.estado == 1) {
        axios
          .put(
            `https://labficat.herokuapp.com/api/ensayo/desactivar/${ensayo._id}`,
            {},
            header
          )
          .then((res) => {
            console.log(res.data);
            this.traerEnsayos();
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
                title: "Error al desactivar el ensayo",
              });
            }
          });
      } else {
        axios
          .put(
            `https://labficat.herokuapp.com/api/ensayo/activar/${ensayo._id}`,
            {},
            header
          )
          .then((res) => {
            console.log(res.data);
            this.traerEnsayos();
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
                title: "Error al activar el ensayo",
              });
            }
          });
      }
    },
    limpiarInfo() {
      (this.ensayo = ""),
        (this.metodo = ""),
        (this.tecnica = ""),
        (this.valorMinimo = null),
        (this.valorMaximo = null),
        (this.unidades = null),
        (this.costo = null),
        (this.descripcion = ""),
        (this.limiteCuantificacion = ""),
        (this.responsables = {
          titular: "",
          suplente: "",
        });
    },
    close() {
      this.dialogEditar = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.traerEnsayos();
    this.traerUsuarios();
  },
};
</script>