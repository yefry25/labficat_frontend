<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-actions>
            Formato de calidad
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1000px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Nuevo formato
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <v-hover v-slot="{ hover }">
                    <v-btn icon @click="close" :style="{ color: hover ? 'red' : '' }">
                      <font-awesome-icon style="fontsize: 20px" icon="fa-solid fa-xmark" />
                    </v-btn>
                  </v-hover>
                  Agregar nuevo formato
                </v-card-title>
                <validationObserver ref="observer" v-slot="{ invalid }">
                  <form @submit.prevent="submit" class="py-7 px-7">
                    <validation-provider v-slot="{ errors }" name="formato" rules="required">
                      <v-text-field v-model="formato" :error-messages="errors" label="Formato" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="codigo" rules="required">
                      <v-text-field v-model="codigo" :error-messages="errors" label="Formato" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="aprobacion" rules="required">
                      <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                        transition="scale-transition" offset-y min-width="auto" :error-messages="errors">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="aprobacion" prepend-icon="mdi-calendar" readonly
                            class="field px-0 py-0 my-0" height="26" v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="aprobacion" @input="menu1 = false"></v-date-picker>
                      </v-menu>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="version" rules="required">
                      <v-text-field v-model="version" :error-messages="errors" label="Version" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <v-btn color="primary" class="mr-4" type="submit" @click="agregarCalidad" :disabled="invalid"
                      rounded>
                      Agregar
                    </v-btn>
                  </form>
                </validationObserver>
              </v-card>
            </v-dialog>
          </v-card-actions>
          <v-data-table :headers="encabezado" :items="formatos" :loading="myLoading"
            loading-text="Cargando... Por favor espera">
            <template v-slot:[`item.actions`]="{ item }">
              <v-row>
                <v-btn icon @click="editar(item)">
                  <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-file-pen" />
                </v-btn>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- dialog -->

    <v-row>
      <v-col>
        <v-dialog v-model="dialogEditar" max-width="1000px">
          <v-card>
            <v-card-title>
              <v-hover v-slot="{ hover }">
                <v-btn icon @click="close" :style="{ color: hover ? 'red' : '' }">
                  <font-awesome-icon style="fontsize: 20px" icon="fa-solid fa-xmark" />
                </v-btn>
              </v-hover>
              Editar formato de calidad
            </v-card-title>
            <validationObserver ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit" class="py-7 px-7">
                <validation-provider v-slot="{ errors }" name="formato" rules="required">
                  <v-text-field v-model="formato" :error-messages="errors" label="Formato" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="código" rules="required">
                  <v-text-field v-model="codigo" :error-messages="errors" label="Código" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="aprobación" rules="required">
                  <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y min-width="auto" :error-messages="errors">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="aprobacion" prepend-icon="mdi-calendar" readonly
                        class="field px-0 py-0 my-0" height="26" v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="aprobacion" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="version" rules="required">
                  <v-text-field v-model="version" :error-messages="errors" label="Version" outlined required>
                  </v-text-field>
                </validation-provider>
                <v-btn color="primary" class="mr-4" type="submit" @click="editarCalidad" :disabled="invalid" rounded>
                  Agregar
                </v-btn>
              </form>
            </validationObserver>
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
  name: "pageCalidad",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      menu1: false,
      menu2: false,
      dialog: false,
      dialogEditar: false,
      myLoading: true,
      encabezado: [
        {
          text: "Formato",
          align: "start",
          sortable: false,
          value: "formato",
        },
        { text: "Código", value: "codigo", sortable: false },
        { text: "Aprobación", value: "aprobacion", sortable: false },
        { text: "Versión", value: "version", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      formatos: [],
      formato: "",
      codigo: "",
      aprobacion: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      version: "",
      formatoEditar: {},
    };
  },
  methods: {
    traerCalidad() {
      axios
        .get("https://labficat.herokuapp.com/api/calidad")
        .then((res) => {
          console.log(res.data.calidad);
          this.formatos = res.data.calidad;
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
    agregarCalidad() {
      axios
        .post("https://labficat.herokuapp.com/api/calidad/insertar", {
          formato: this.formato,
          codigo: this.codigo,
          aprobacion: this.aprobacion,
          version: this.version,
        })
        .then((res) => {
          console.log(res.data.calidad);
          this.$swal({
            icon: "success",
            title: "Registro exitoso del formato",
          });
          this.traerCalidad();
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
              title: "Error al registrar el formato",
            });
          }
        });
    },
    editar(formato) {
      console.log(formato);
      this.formatoEditar = formato;
      this.dialogEditar = true;
      this.formato = formato.formato;
      this.codigo = formato.codigo;
      this.aprobacion = formato.aprobacion;
      this.version = formato.version;
    },
    editarCalidad() {
      axios
        .put(
          `https://labficat.herokuapp.com/api/calidad/modificar/${this.formatoEditar._id}`,
          {
            formato: this.formato,
            codigo: this.codigo,
            aprobacion: this.aprobacion,
            version: this.version,
          }
        )
        .then((res) => {
          console.log(res.data.modificar);
          this.$swal({
            icon: "success",
            title: "Actualización exitoso del formato",
          });
          this.traerCalidad();
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
              title: "Error al actualizar un formato",
            });
          }
        });
    },
    close() {
      this.dialog = false;
      this.dialogEditar = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.traerCalidad();
  },
};
</script>