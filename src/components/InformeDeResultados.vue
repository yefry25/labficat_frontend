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
            <p class="parrafo font-weight-black">Fecha y hora de recepción de la muestra:</p>
          </v-col>
          <v-col cols="6">
            <p class="parrafo font-weight-black">Fecha y hora de emisión del informe de resultados:</p>
          </v-col>
        </v-row>
        <v-row class="mx-0 my-0 px-0 py-0">
          <v-col class="px-0 py-0" cols="6">
            <p class="mt-2 red--text">AAAA-MM-DD; hh:mm</p>
          </v-col>
          <v-col class="px-0 py-0" cols="6">
            <p class="mt-2 red--text">AAAA-MM-DD; hh:mm</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" class="text-center">
        <p class="parrafo font-weight-black">
          Código <br />
          CAT–ST–OC–F–002 <br> <br />
          Aprobación <br />2022-04-01 <br> <br />
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
      { text: "Método", value: "metodo" },
      { text: "Técnica", value: "tecnica" },
      { text: "Resultado", value: "protein" },
      { text: "Incertidumbre expandida", value: "iron" },
      { text: "Valor Máximo NTC 1311:2009", value: "valormaximo"},
      { text: "Valor Mínimo NTC 1311:2009", value:"valorminimo" },
      { text: "Unidades", value:"unidades"},
    ],
    desserts: [
      {
        name: "Cenizas",
        metodo:"NTC 570:2012. NTC 1311:2009.",
        tecnica:"Gravimetría",
        valormaximo:"N.A.",
        valorminimo:"0,8",
        unidades:"fracción en masa en %",
      },
      {
        name: "Humedad",
        metodo:"NTC 572:2012. AOAC 925.45. NTC 1311:2009.",
        tecnica:"Gravimetría",
        valormaximo:"9,0",
        valorminimo:"N.A.",
        unidades:"fracción en masa en %"
      },
      {
        name: "° Brix",
        metodo:"ISO 2173:2003",
        tecnica:"Refractometría-Sacarosa",
        valormaximo:"N.A.",
        valorminimo:"N.A."
      },
      {
        name:"grasas",
        metodo:"AOAC 920.39 C. NTC 1311:2009.",
        tecnica:"Gravimetría",
        valormaximo:"N.A.",
        valorminimo:"N.A.",
      },
      {
        name: "Fenoles Totales",
        metodo:"Folin, O., Ciocalteu, V. (1927).Folin, O., Denis, W. (1912).",
        tecnica:"Espectrofotometría Uv-Vis.λ = 760 nm",
        valormaximo:"N.A.",
        valorminimo:"N.A.",
      },
      {
        name: "Sacarosa",
        metodo:"ISO 10504:2013",
        tecnica:"Cromatografía HPLC-RID",
        valormaximo:"93,0",
        valorminimo:"N.A.",
      },
      {
        name: "Glucosa",
        metodo:"ISO 10504:2013",
        tecnica:"Cromatografía HPLC-RID",
        valormaximo:"N.A.",
        valorminimo:"N.A.",
      },
      {
        name: "Fructosa",
        metodo:"ISO 10504:2013",
        tecnica:"Cromatografía HPLC-RID",
        valormaximo:"N.A.",
        valorminimo:"N.A.",
      },
      {
        name: "Azúcares Reductores (Glucosa + Fructosa)",
        metodo:"Calculado a partir del contenido de glucosa y fructosa.",
        tecnica:"Calculado, a partir de datos obtenidos con Cromatografía HPLC-RID",
        valormaximo:"N.A.",
        valorminimo:"5,0",
      },
      {
        name: "Azúcares Totales (Sacarosa + Glucosa + Fructosa)",
        metodo:"Calculado a partir del contenido de sacarosa,  glucosa y fructosa.",
        tecnica:"Calculado, a partir de datos obtenidos con Cromatografía HPLC-RID",
        valormaximo:"N.A.",
        valorminimo:"N.A.",
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