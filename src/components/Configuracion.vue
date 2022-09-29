<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                SETUP
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-list-ol"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="setup" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                ENSAYOS
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-flask-vial"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="ensayo" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                BITACORA
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-book-open"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="bitacora" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="borde mx-auto rounded-xl rounded-tr-0"
          max-width="344"
          outlined
        >
          <v-list-item three-line class="text-center">
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                CALIDAD
              </v-list-item-title>
              <font-awesome-icon
                class="mt-2"
                icon="fa-solid fa-pen-to-square"
                style="font-size: 25px"
              />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="boton">
            <v-btn class="primary" to="calidad" outlined rounded text>
              INGRESAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from 'axios'

export default {
  name: "pageConfiguracion",
  data: () => ({}),
  methods: {

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
