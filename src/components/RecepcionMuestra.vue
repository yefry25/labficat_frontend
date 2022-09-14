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
        <v-row class="texto">
          <p class="font-weight-black">
            CENTRO AGROTURÍSTICO – SAN GIL, SANTANDER <br />
            LABORATORIO LABFICAT
          </p>
        </v-row>
        <v-row>
          <v-col cols="5" class="justificar">
            <p class="font-weight-black" style="border: 1px solid black">
              CÓDIGO <br />
              CAT–ST–MI–F–002
            </p>
          </v-col>
          <v-col cols="5">
            <p
              class="justificar font-weight-black"
              style="border: 1px solid black"
            >
              APROBACIÓN <br />
              2022-04-01
            </p>
          </v-col>
          <v-col cols="2">
            <p
              class="justificar font-weight-black"
              style="border: 1px solid black"
            >
              VERSIÓN: <br />
              2
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        Datos del solicitante
      </h5>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class=" text-center px-0">
            <p for="Name" class="label mb-0 ">Solicitante</p>
            <p for="Name" class="label mb-0 ">NIT/C.C.</p>
            <p for="Name" class="label mb-0 ">Dirección</p>
            <p for="Name" class="label mb-0 ">Ciudad</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class=" text-center px-0">
            <p for="Name" class="label mb-0 ">Departamento</p>
            <p for="Name" class="label mb-0 ">Contacto</p>
            <p for="Name" class="label mb-0 ">Teléfono</p>
            <p for="Name" class="label mb-0 ">Correo Electrónico</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        Datos de la Muestra
      </h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" :search="search">

            <template v-slot:footer>
              <v-card class="d-flex justify-end">
            </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" class="py-0 px-0">
        <h5 class=" primary text-center white--text px-0 py-0" style="width: 100%">
          *Observaciones preestablecidas</h5>
      </v-col>
      <v-col cols="4" class="py-0 px-0">
        <h5 class=" primary text-center white--text px-0 py-0" style="width: 100%">
          Condiciones del servicio</h5>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "PageRecepcion",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Código de Muestra",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Municipio de recolección",},
      { text: "Dirección de toma de muestra", value: "fat" },
      { text: "Lugar de toma de muestra", value: "carbs" },
      { text: "Muestra recolectada por", value: "protein" },
      { text: "Procedimiento de muestreo", value: "iron" },
      { text: "Tipo de muestra" },
      { text: "Matriz de la muestra" },
      { text: "Fecha y hora de recolección" },
      { text: "Cotización" },
      { text: "Ítem de la cotización" },
      { text: "Observaciones*" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
    ],
  }),
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
  justify-content: center;
}

.label {
  background-color: #ed7d31;
  color: white;
  border: solid 1px black;
}

.field {
  max-height: 26px;
}
</style>
