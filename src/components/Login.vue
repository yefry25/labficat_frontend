<template>
  <v-container>
    <v-row class="
            my-12
            justify-center
            text-center
            white--text
            pa-4
            text-center
            text-no-wrap
            rounded-xl
          ">
    <v-col  cols="8"
           >
      <v-card class="formulario" 
      >
      <br>
      <br>
      <v-icon class="font-weight-black black--text">mdi-account</v-icon>
          <v-toolbar-title class="font-weight-black black--text">
            Iniciar Sesión
          </v-toolbar-title>
          <v-spacer></v-spacer>

        <v-form ref="form" v-model="valid" lazy-validation class="px-7">
          <v-text-field v-model="correo" :rules="correoRules" label="Correo" required></v-text-field>

          <v-text-field v-model="password" :rules="passwordRules" label="contraseña" required type="password">
          </v-text-field>
          <v-btn  class="mr-4 " @click="iniciar" :disabled="invalid"> Ingresar </v-btn>
          <br>
          <br>
        </v-form>
      
      </v-card>
    </v-col>
  </v-row> 
  </v-container>
</template>

<script>
import axios from "axios"
export default {
  name: "pageLogin",
  data: () => ({
    valid: true,
    correo: "",
    correoRules: [
      (v) => !!v || "Correo es requerido",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Contraseña es requerida",
    ],
  }),

  methods: {
    iniciar() {
      axios.post('https://labficat.herokuapp.com/api/usuario/login', { correo: this.correo, password: this.password })
        .then((response) => {
          console.log(response);
          this.$router.push("/inicio")
          this.$swal({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: ` Bienvenido ${response.data.usuario.nombre}`,
          })
        })
        .catch((error) => {
          console.log(error);
          this.$swal({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: `${error.response.data.errors[0].msg}`
          })
          console.log(error.response.data.errors);
          console.log(error.response.data.errors[0].msg);
        })
    }
  }
};
</script>
<style scoped>
 .formulario{
  border: solid 3px rgb(247, 113, 4);
 }
 .mr-4{
  color:  rgb(247, 113, 4);
 }
</style>