<template>
  <v-container fluid>
    <v-row class="my-12 justify-center text-center white--text pa-4 text-center">
      <v-col cols="8">
        <v-card class="rounded-xl rounded-bl-0" outlined>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit" class="py-7 px-7">
              <validation-provider v-slot="{ errors }" name="tipo de persona" rules="required">
                <v-select v-model="select" :items="items" :error-messages="errors" outlined label="Tipo de persona"
                  data-vv-name="tipo de persona" required></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="nombre" rules="required">
                <v-text-field v-model="nombre" :error-messages="errors" label="Nombre" outlined required></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="documento" rules="required">
                <v-text-field v-model="documento" :error-messages="errors" label="Documento" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="dirección" rules="required">
                <v-text-field v-model="direccion" :error-messages="errors" label="Dirección" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="departamento" rules="required">
                <v-select v-model="departamento" :items="departa" item-text="departamento" item-key="departa"
                  item-value="_id" :error-messages="errors" outlined label="Departamento" data-vv-name="departamento"
                  @change="traerCiudades(departa)" required></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="ciudad" rules="required">
                <v-select v-model="ciudad" :items="ciudades" item-text="Ciudad" item-value="_id"
                  :error-messages="errors" outlined label="Cuidad" data-vv-name="ciudad" required></v-select>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="contacto" rules="required">
                <v-text-field v-model="contacto" :error-messages="errors" label="Nombre del contacto" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="teléfono del contacto" rules="required">
                <v-text-field v-model="celularContacto" :error-messages="errors" label="Telefono contacto" outlined
                  required></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="teléfono" rules="required">
                <v-text-field v-model="telefono" :error-messages="errors" label="Teléfono del titular" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
                <v-text-field v-model="email" :error-messages="errors" label="E-mail" outlined
                  required></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="rol" rules="required">
                <v-select v-model="rol" :items="roles" :error-messages="errors" outlined label="Roles"
                  data-vv-name="roles" required></v-select>
              </validation-provider>
              <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block @click="registrar">
                Registrar
              </v-btn>
            </form>
          </validation-observer>
        </v-card>
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
  name: "pageRegistro",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    select: null,
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
    items: ["Natural", "Jurídica"],
    roles: [
      "Cliente",
      "Responsable de Laboratorio",
      "Responsable de Gestión",
      "Personal Técnico",
      "Responsable de Calidad",
    ],
    departa: [],
    ciudades: [],
  }),
  methods: {
    traerDepartamentos() {
      axios
        .get("https://labficat-backend.vercel.app/api/ciudad/departamentos")
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
        .post("https://labficat-backend.vercel.app/api/ciudad/nombreDepartamento", {
          departamento: this.departamento,
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
    registrar() {
      console.log("ciudad: "+this.ciudad);
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .post("https://labficat-backend.vercel.app/api/usuario", {
          tipoPersona: this.select,
          nombre: this.nombre,
          documento: this.documento,
          direccion: this.direccion,
          ciudad: this.ciudad,
          contacto: this.contacto,
          celularContacto: this.celularContacto,
          telefono: this.telefono,
          correo: this.email,
          rol: this.rol,
        },header)
        .then((res) => {
          console.log(res.data);
          this.$swal({
            icon: "success",
            title: "Registro exitoso",
            text: `${res.data.usuario.nombre} registrado exitosamente`,
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
              title: "Error al registrar el usuario",
            });
          }
        });
    },
    limpiarInfo() {
      this.select = "";
      this.nombre = "";
      this.documento = "";
      this.direccion = "";
      this.departamento = "";
      this.ciudad = "";
      this.contacto = "";
      this.celularContacto = "";
      this.telefono = "";
      this.email = "";
      this.rol = "";
    },
  },
  created() {
    this.traerDepartamentos();
  },
};
</script>