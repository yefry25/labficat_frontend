<template>
  <v-container fluid style="height: 100%">
    <v-row>
      <v-col cols="2">
        <v-img
          width="164"
          height="162"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/1200px-Sena_Colombia_logo.svg.png"
        >
        </v-img>
      </v-col>
      <v-col cols="5" class="texto">
        <h2 class="mt-0 text-decoration-underline">Informe de resultados</h2>
        <p class="parrafo font-weight-black">
          Laboratorio de Caracterización Fisicoquímica de Alimentos del Centro
          Agroturístico <br />
          “LABFICAT” de San Gil, Santander <br />
          899.999.034 <br />
          Dirección: Calle 22 No. 09 – 82, San Gil, Santander <br />
          Teléfono: (607) 7248113 <br />
          Correo electrónico: labficat@sena.edu.co Agroturístico
        </p>
      </v-col>
      <v-col cols="3" class="texto">
        <h2 class="mt-0 text-decoration-underline">Informe de resultados</h2>
        <h2 class="mt-2 red--text">XXXX-AAAA</h2>
        <v-row>
          <v-col cols="6">
            <p>Fecha y hora de recepción de la muestra:</p>
          </v-col>
          <v-col cols="6">
            <p>Fecha y hora de emisión del informe de resultados:</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <p class="mt-2 red--text">AAAA-MM-DD; hh:mm</p>
          </v-col>
          <v-col cols="6">
            <p class="mt-2 red--text">AAAA-MM-DD; hh:mm</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" class="text-center">
        <p>
          Código <br />
          CAT–ST–OC–F–002 <br />
          Aprobación <br />2022-04-01 <br />
          Versión <br />
          2
        </p>
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
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">Solicitante</p>
            <p for="Name" class="label mb-0">NIT / C.C.</p>
            <p for="Name" class="label mb-0">Dirección</p>
            <p for="Name" class="label mb-0">Ciudad</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">Departamento</p>
            <p for="Name" class="label mb-0">Contacto</p>
            <p for="Name" class="label mb-0">Teléfono</p>
            <p for="Name" class="label mb-0">Correo electrónico</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        Datos de la muestra
      </h5>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">Municipio de recolección</p>
            <p for="Name" class="label mb-0">Dirección de toma de muestra</p>
            <p for="Name" class="label mb-0">Lugar de toma de muestra</p>
            <p for="Name" class="label mb-0">Muestra recolectada por</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">Procedimiento de muestreo</p>
            <p for="Name" class="label mb-0">Tipo de muestra</p>
            <p for="Name" class="label mb-0">Matriz de la muestra</p>
            <p for="Name" class="label mb-0">Fecha y hora de recolección</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              class="field px-0 py-0 my-0"
              height="26"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        Análisis de la muestra
      </h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card>
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" :search="search">
            <template v-slot:footer>
              <v-card class="d-flex justify-end"> </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row margin="12">
      <h5 class="primary text-center white--text px-0 py-0" style="width: 100%">
        Observaciones
      </h5>
    </v-row>
    <v-row>
      <v-col cols="12" class="pl-0 px-0 py-3 my-4">
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "PageInforme",
  data: () => ({
    search: "",
    headers: [
      {
        text: "Fecha de análisis",
        align: "start",
        sortable: false,
      },
      { text: "Ensayo", value: "name" },
      { text: "Método", value: "fat" },
      { text: "Técnica", value: "carbs" },
      { text: "Resultado", value: "protein" },
      { text: "Incertidumbre expandida", value: "iron" },
      { text: "Valor Máximo NTC 1311:2009" },
      { text: "Valor Mínimo NTC 1311:2009" },
      { text: "Unidades" },
    ],
    desserts: [
      {
        name: "Cenizas",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Humedad",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "° Brix",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Fenoles Totales",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Sacarosa",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Glucosa",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Fructosa",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Azúcares Reductores (Glucosa + Fructosa)",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Azúcares Totales (Sacarosa + Glucosa + Fructosa)",
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
<style>
.texto {
  text-align: center;
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