<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-img
          width="164"
          height="162"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/1200px-Sena_Colombia_logo.svg.png"
        >
        </v-img>
      </v-col>
      <v-col cols="10" class="mt-5">
        <v-row class="texto">
          <h3>Recepcion Muestras</h3>
        </v-row>
        <v-row class=" texto">
          <p class="font-weight-black" >
            CENTRO AGROTURÍSTICO – SAN GIL, SANTANDER <br> 
            LABORATORIO LABFICAT
          </p>
        </v-row>
        <v-row >
          <v-col cols="5" class="justificar">
            <p class="font-weight-black">
              CÓDIGO <br />
              CAT–ST–MI–F–002
            </p>
          </v-col>
          <v-col cols="5">
            <p class="font-weight-black" style="border: 1px solid black">
              APROBACIÓN <br />
              2022-04-01
            </p>
          </v-col >
          <v-col cols="2">
            <p class="font-weight-black" style="border: 1px solid black">
              VERSIÓN: <br />
              2
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "PageRecepcion",
  data: () => ({}),
};
</script>
<style scoped>

  .texto {
    border: 2px solid black;
    text-align: center;
    justify-content: center;
  }

  .justificar {
    text-align: center;
    justify-content: center
  }
</style>
