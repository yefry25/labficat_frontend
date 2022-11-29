<template>
  <v-container fluid>
    <v-row>
      <v-col>

        <v-select :items="usu" label="Elije el rol que quieres ver" solo v-model="elegirUser" @change="traerUsuarios">
        </v-select>

        <v-hover v-slot="{ hover }">
          <v-card>
            <v-card-title>
              Usuarios
              <v-spacer></v-spacer>
              <v-btn color="primary" to="registro">Agregar nuevo usuario</v-btn>
            </v-card-title>
            <v-data-table :headers="encabezado" :items="usuarios" :loading="myLoading"
              loading-text="Cargando... Por favor espera">
              <template v-slot:[`item.actions`]="{ item }">
                <v-row>
                  <v-btn icon :style="{ color: hover ? 'black' : '' }" @click="actualizarInfoUsuario(item)">
                    <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-user-pen" />
                  </v-btn>
                  <div v-if="item.estado == 1">
                    <v-btn color="red" icon @click="estadoUsuario(item)">
                      <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-user-large-slash" />
                    </v-btn>
                  </div>
                  <div v-if="item.estado == 0" @click="estadoUsuario(item)">
                    <v-btn icon color="orange">
                      <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-earth-americas" />
                    </v-btn>
                  </div>
                  <div v-if="item.estado == 2" @click="estadoUsuario(item)">
                    <v-btn icon color="blue">
                      <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-user-large" />
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
                <div v-if="item.estado == 0">
                  <b>
                    <span class="red--text">Inactivo</span>
                  </b>
                </div>
                <div v-if="item.estado == 2">
                  <b>
                    <span class="orange--text">Vacaciones</span>
                  </b>
                </div>
              </template>
              <template v-slot:no-data>
                <h2>No hay información</h2>
              </template>
            </v-data-table>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <!-- dialogo de modificacion de los usuarios -->

    <v-row>
      <v-col>
        <v-dialog v-model="dialog" max-width="1000px" persistent>
          <v-card outlined>
            <v-card-title>
              <v-hover v-slot="{ hover }">
                <v-btn icon @click="close" :style="{ color: hover ? 'red' : '' }">
                  <font-awesome-icon style="fontsize: 20px" icon="fa-solid fa-xmark" />
                </v-btn>
              </v-hover>
              Editar información del usuario
            </v-card-title>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit" class="py-7 px-7">
                <validation-provider v-slot="{ errors }" name="tipo de persona" rules="required">
                  <v-select v-model="select" :items="items" :error-messages="errors" outlined label="Tipo de persona"
                    data-vv-name="tipo de persona" required></v-select>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="nombre" rules="required">
                  <v-text-field v-model="persona.nombre" :error-messages="errors" label="Nombre" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="documento" rules="required">
                  <v-text-field v-model="persona.documento" :error-messages="errors" label="Documento" outlined
                    required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="dirección" rules="required">
                  <v-text-field v-model="persona.direccion" :error-messages="errors" label="Dirección" outlined
                    required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="departamento" rules="required">
                  <v-select v-model="persona.departamento" :items="departa" item-text="departamento" item-key="departa"
                    item-value="_id" :error-messages="errors" outlined label="Departamento" data-vv-name="departamento"
                    @change="traerCiudades(departa)" required></v-select>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="ciudad" rules="required">
                  <v-select v-model="persona.ciudad" :items="ciudades" item-text="Ciudad" item-key="ciudades"
                    item-value="_id" :error-messages="errors" outlined label="Cuidad" data-vv-name="ciudad" required>
                  </v-select>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="contacto" rules="required">
                  <v-text-field v-model="persona.contacto" :error-messages="errors" label="Contacto" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="teléfono del contacto" rules="required">
                  <v-text-field v-model="persona.celularContacto" :error-messages="errors" label="Telefono contacto"
                    outlined required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="teléfono" rules="required">
                  <v-text-field v-model="persona.telefono" :error-messages="errors" label="Teléfono" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
                  <v-text-field v-model="persona.email" :error-messages="errors" label="E-mail" outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="rol" rules="required">
                  <v-select v-model="persona.rol" :items="roles" :error-messages="errors" outlined label="Roles"
                    data-vv-name="roles" required></v-select>
                </validation-provider>
                <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block
                  @click="actualizarUsuario">
                  Actualizar Usuario
                </v-btn>
              </form>
            </validation-observer>
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
  name: "pageVerUsuarios",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      select: null,
      myLoading: true,
      dialog: false,
      idPersona: "",
      encabezado: [
        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "nombre",
        },
        { text: "Documento", value: "documento", sortable: false },
        { text: "Direccion", value: "direccion", sortable: false },
        { text: "Ciudad", value: "ciudad.Ciudad", sortable: false },
        { text: "Contacto", value: "contacto", sortable: false },
        { text: "Telefono", value: "telefono", sortable: false },
        { text: "Correo", value: "correo", sortable: false },
        { text: "Rol", value: "rol", sortable: true },
        { text: "Estado", value: "estado", sortable: true },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      usuarios: [],
      departa: [],
      ciudades: [],
      roles: [
        "Cliente",
        "Responsable de Laboratorio",
        "Responsable de Gestión",
        "Personal Técnico",
        "Responsable de Calidad",
      ],
      persona: {
        nombre: "",
        documento: "",
        direccion: "",
        departamento: "",
        ciudad: "",
        contacto: "",
        celularContacto: "",
        telefono: "",
        email: "",
        rol: "",
      },
      items: ["Natural", "Jurídica"],
      usu: [
        "Cliente",
        "Responsable de Laboratorio",
        "Responsable de Gestión",
        "Personal Técnico",
        "Responsable de Calidad",
      ],
      elegirUser: ""
    };
  },
  methods: {
    traerDepartamentos() {
      axios
        .get("https://labficat.herokuapp.com/api/ciudad/departamentos")
        .then((response) => {
          console.log(response.data.departamentos);
          this.departa = response.data.departamentos;
          console.log(this.departa);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    traerCiudades(ciudad) {
      console.log(ciudad);
      axios
        .post("https://labficat.herokuapp.com/api/ciudad/nombreDepartamento", {
          departamento: this.persona.departamento,
        })
        .then((response) => {
          console.log(response.data.ciudades);
          this.ciudades = response.data.ciudades;
          console.log(this.ciudades);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    traerUsuarios() {
      axios
        .post("https://labficat.herokuapp.com/api/usuario/roles",
          {
            rol: this.elegirUser
          })
        .then((res) => {
          console.log(res.data.usuario);
          this.usuarios = res.data.usuario;
          this.myLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* traerClientes() {
      axios
        .post("https://labficat.herokuapp.com/api/usuario/roles", {
          rol: this.elegirUser
        })
        .then((res) => {
          console.log(res.data.usuario);
          this.usuarios = res.data.usuario;
          this.myLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    }, */
    estadoUsuario(user) {
      let header = { headers: { "x-token": this.$store.state.token } };
      if (user.estado == 1) {
        if (this.$store.state.elaborador.nombre == user.nombre) {
          this.$swal({
            icon: "error",
            title: "No puede inactivar a el usuario que inició sesión",
          });
        } else {
          axios
            .put(
              `https://labficat.herokuapp.com/api/usuario/desactivar/${user._id}`,
              {},
              header
            )
            .then((res) => {
              console.log(res.data.usuario);
              this.traerUsuarios();
            })
            .catch((err) => {
              console.log(err);
              console.log(err.response.data.msg);
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
                  title: "Error al inactivar al usuario",
                });
              }
            });
        }


      } else if (user.estado == 0) {
        axios
          .put(
            `https://labficat.herokuapp.com/api/usuario/vacaciones/${user._id}`,
            {},
            header
          )
          .then((res) => {
            console.log(res.data.usuario);
            this.traerUsuarios();
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
                title: "Error al cambiar el estado a vacaciones",
              });
            }
          });
      } else if (user.estado == 2) {
        axios
          .put(
            `https://labficat.herokuapp.com/api/usuario/activar/${user._id}`,
            {},
            header
          )
          .then((res) => {
            console.log(res.data.usuario);
            this.traerUsuarios();
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
                title: "Error al activar el usuario",
              });
            }
          });
      }
    },
    actualizarInfoUsuario(user) {
      this.idPersona = user._id;
      this.persona.nombre = user.nombre;
      this.persona.documento = user.documento;
      this.persona.direccion = user.direccion;
      this.persona.contacto = user.contacto;
      this.persona.celularContacto = user.celularContacto;
      this.persona.telefono = user.telefono;
      this.persona.email = user.correo;
      this.dialog = true;
    },
    actualizarUsuario() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://labficat.herokuapp.com/api/usuario/modificar/${this.idPersona}`,
          {
            tipoPersona: this.select,
            nombre: this.persona.nombre,
            documento: this.persona.documento,
            direccion: this.persona.direccion,
            ciudad: this.persona.ciudad,
            contacto: this.persona.contacto,
            celularContacto: this.persona.celularContacto,
            telefono: this.persona.telefono,
            correo: this.persona.email,
            rol: this.persona.rol,
          },
          header
        )
        .then((res) => {
          console.log(res);
          this.traerUsuarios();
          this.$swal({
            icon: "success",
            title: "Usuario actualizado exitosamente",
            text: `${res.data.modificar.nombre} actualizado exitosamente`,
          });
          this.limpiarInfo();
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            icon: "error",
            title: "Error al registrar el usuario",
          });
        });
    },
    limpiarInfo() {
      this.select = "";
      this.persona.nombre = "";
      this.persona.documento = "";
      this.persona.direccion = "";
      this.persona.ciudad = "";
      this.persona.contacto = "";
      this.persona.celularContacto = "";
      this.persona.telefono = "";
      this.persona.email = "";
      this.persona.rol = "";
    },
    close() {
      this.dialog = false;

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.traerDepartamentos();
    this.traerCiudades();
  },
};
</script>
