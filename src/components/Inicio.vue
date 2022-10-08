<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                COTIZACION
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-hand-holding-dollar"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="mostrarCotizacion" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                RECEPCION MUESTRA
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-tablet"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="mostrarMuestra" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                REPORTES
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-check-to-slot"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="cotizacion" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                INFORME DE RESULTADOS
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-check-to-slot"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn
              class="primary"
              to="informeDeResultados"
              outlined
              rounded
              text
            >
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    
    
      <v-col cols="4">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                REGISTRO DE USUARIO
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-user-pen"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="registro" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                CONFIGURACIÓN
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-wrench"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="configuracion" outlined rounded text>
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
  data: () => ({}),

  methods: {
    ingreso() {
      axios
        .post("https://labficat.herokuapp.com/api/cotizacion")
        .then((response) => {
          console.log(response);
          this.$router.push("/cotizacion");
          this.$swal({
            icon: "success",
            title: "Ingreso exitoso",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
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

