<template>
  <v-container>
    <v-row class="my-12 justify-center text-center white--text pa-4 text-center">
      <v-col cols="8">
        <v-card class="rounded-xl rounded-bl-0" outlined>
          <v-card-title class="primary" id="" style="text-align: center; justify-content: center;">
            <font-awesome-icon style="font-size: 36px" icon="fa-solid fa-user" />
          </v-card-title>
          <h2 class="pt-4">Inicia sesión</h2>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit" class="py-7 px-7">
              <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
                <v-text-field v-model="email" :error-messages="errors" label="E-mail" prepend-icon='mdi-email' outlined
                  required></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="contraseña" rules="required|min:8">
                <v-text-field v-model="password" :error-messages="errors" label="Contraseña" type="password" outlined
                  prepend-icon='mdi-lock' required></v-text-field>
              </validation-provider>
              <h3 class="text--blue" @click="dialogRecuperar = true">¿Olvidaste la contraseña?</h3>

              <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block @click="iniciar">
                ingresar
              </v-btn>
            </form>
          </validation-observer>
        </v-card>
      </v-col>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-row>

    <!-- dialogo para recuperar contraseña -->

    <v-row>
      <v-col>
        <v-dialog v-model="dialogRecuperar" max-width="1000px" persistent>
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
              <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
                <v-text-field v-model="email" :error-messages="errors" label="E-mail" prepend-icon='mdi-email' outlined
                  required></v-text-field>
              </validation-provider>
              <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block @click="enviarEmail">
                Enviar Email
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

import { required, email, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
  ...required,
  message: '{_field_} no puede estar vacio',
})
extend('email', {
  ...email,
  message: 'Email must be valid',
})
extend('min', {
  ...min,
  message: 'El campo {_field_} debe tener {length} caracteres o más'
})
import axios from "axios";
export default {
  name: "pageLogin",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    dialogRecuperar: false,
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
    select: null,
    overlay: false,
    elaborado: {}
  }),

  methods: {
    iniciar() {
      this.$refs.observer.validate()
      this.overlay = true
      axios
        .post("https://labficat.herokuapp.com/api/usuario/login", {
          correo: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data.usuario);
          this.$router.push("/inicio");
          this.$swal({
            icon: "success",
            title: "Inicio de sesión exitoso",
            text: ` Bienvenido ${response.data.usuario.nombre}`,
          });
          this.overlay = false

          this.elaborado = {
            nombre: response.data.usuario.nombre,
            rol: response.data.usuario.rol,
            id: response.data.usuario._id
          }

          this.$store.dispatch("setToken", response.data.token);
          this.$store.dispatch('setElaborador', this.elaborado)
          console.log(this.$store.state.elaborador);
        })
        .catch((error) => {
          this.overlay = false
          console.log(error);
          this.$swal({
            icon: "error",
            title: "Error al iniciar sesión",
            text: `${error.response.data.msg}`
          });
        });
    },
    enviarEmail(){
      axios.put('https://labficat.herokuapp.com/api/usuario/recuperarPassword',{
        correo:this.email
      })
      .then((res)=>{
        console.log(res);
        this.$swal({
            icon: "success",
            title: "Email enviado exitosamente",
          });
      })
      .catch((err)=>{
        console.log(err);
        this.$swal({
            icon: "error",
            title: "Error al enviar el correo",
          });
      })
    },
    existeToken() {
      if (localStorage.token) {
        this.$router.push("/inicio");
      }
    },
    close() {
      this.dialogRecuperar = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.existeToken();
  }
};
</script>
<style scoped>
#border {
  border: 1px solid black;
}

.formulario {
  border: solid 3px rgb(247, 113, 4);
}

.mr-4 {
  color: rgb(247, 113, 4);
}
</style>
