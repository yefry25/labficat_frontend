<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center" >
      <v-col cols="4" v-if="this.$store.state.elaborador.rol=='Responsable de Laboratorio' || this.$store.state.elaborador.rol=='Responsable de Calidad'">
        <v-card class="borde mx-auto rounded-xl rounded-tr-0" max-width="344" outlined >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                COTIZACION
              </v-list-item-title>
              <font-awesome-icon class="mt-2" icon="fa-solid fa-hand-holding-dollar" style="font-size: 25px" />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="mostrarCotizacion" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4" v-if="this.$store.state.elaborador.rol=='Responsable de Calidad' || this.$store.state.elaborador.rol=='Responsable de Gestión' || this.$store.state.elaborador.rol=='Personal Técnico'">
        <v-card class="borde mx-auto rounded-xl rounded-tr-0" max-width="344" outlined >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                RECEPCION MUESTRA
              </v-list-item-title>
              <font-awesome-icon class="mt-2" icon="fa-solid fa-book" style="font-size: 25px" />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="mostrarMuestra" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4" v-if="this.$store.state.elaborador.rol=='Responsable de Calidad'">
        <v-card class="borde mx-auto rounded-xl rounded-tr-0" max-width="344" outlined >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                ORDEN DE SERVICIO
              </v-list-item-title>
              <font-awesome-icon class="mt-2" icon="fa-solid fa-check-to-slot" style="font-size: 25px" />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="ordenServicio" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4" v-if="this.$store.state.elaborador.rol=='Responsable de Calidad' || this.$store.state.elaborador.rol=='Personal Técnico' || this.$store.state.elaborador.rol=='Responsable de Laboratorio'">
        <v-card class="borde mx-auto rounded-xl rounded-tr-0" max-width="344" outlined >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                INFORME DE RESULTADOS
              </v-list-item-title>
              <font-awesome-icon class="mt-2" icon="fa-solid fa-table-list" style="font-size: 25px" />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="informeDeResultados" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="4" v-if="this.$store.state.elaborador.rol=='Responsable de Laboratorio' || this.$store.state.elaborador.rol=='Responsable de Calidad' || this.$store.state.elaborador.rol=='Responsable de Gestión'">
        <v-card class="borde mx-auto rounded-xl rounded-tr-0" max-width="344" outlined >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                REGISTRO DE USUARIO
              </v-list-item-title>
              <font-awesome-icon class="mt-2" icon="fa-solid fa-user-pen" style="font-size: 25px" />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="mostrarUsuarios" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4" v-if="this.$store.state.elaborador.rol=='Responsable de Calidad'">
        <v-card class="borde mx-auto rounded-xl rounded-tr-0" max-width="344" outlined >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                CONFIGURACIÓN
              </v-list-item-title>
              <font-awesome-icon class="mt-2" icon="fa-solid fa-users-gear" style="font-size: 25px" />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="configuracion" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4" v-if="this.$store.state.elaborador.rol=='Responsable de Calidad' || this.$store.state.elaborador.rol=='Cliente'">
        <v-card class="borde mx-auto rounded-xl rounded-tr-0" max-width="344" outlined >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                PERFIL
              </v-list-item-title>
              <font-awesome-icon class="mt-2" icon="fa-solid fa-user" style="font-size: 25px" />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="perfil" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "pageInicio",
  data(){
    return {
      
    }
  },

  methods: {
    ingreso() {
      axios
        .post("https://labficat-backend.vercel.app/api/cotizacion")
        .then((response) => {
          console.log(response);
          this.$router.push("/cotizacion");
          this.$swal({
            icon: "success",
            title: "Ingreso exitoso",
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
        });
    },
  },
  created(){
    
  }
};
</script>

<style scoped>
.boton {
  text-align: center;
  justify-content: center;
}

.borde {
  border: 2px solid black;
  /* background-color: #ED7D31; */
}
</style>

