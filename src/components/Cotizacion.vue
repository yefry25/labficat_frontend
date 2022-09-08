<template>
  <v-container fluid style="height: 100%;">
    <v-row style="border: 1px solid black">
      <v-col cols="2">
        <v-img width="164" height="162"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/1200px-Sena_Colombia_logo.svg.png">
        </v-img>
      </v-col>
      <v-col cols="6" class="texto">
        <h2 class="mt-0 text-decoration-underline">Oferta de servicios</h2>
        <p class="parrafo font-weight-black">Laboratorio de Caracterización Fisicoquímica de Alimentos del Centro
          Agroturístico <br> “LABFICAT” de San Gil, Santander <br> 899.999.034 <br>
          Dirección: Calle 22 No. 09 – 82, San Gil, Santander <br> Teléfono: (607)
          7248113 <br> Correo electrónico: labficat@sena.edu.co
          Agroturístico</p>

      </v-col>
      <v-col cols="2" class="text-center">
        <h3 class="mt-0 font-weight-black">cotización No.</h3>
        <h2 class="mt-2 red--text"> xxxxx </h2>
        <h3 class="mt-2 font-weight-black">fecha de emisión:</h3>
        <h2 class="mt-2 red--text"> xxxx-xx-xx</h2>
      </v-col>
      <v-col cols="2" class="codigo font-weight-black">
        <p>
          Código <br>
          CAT–ST–OC–F–002
        </p>
        <p>Aprobación <br>
          2021-08-30
        </p>
        <p>
          Versión <br>
          1
        </p>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">1. Datos del cliente</h5>
    </v-row>
    <v-row id="border">
      <v-col cols="6" class="py-0 pl-0">
        <label for="Name" class="label ">Cliente</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Dirección</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Departamento</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Contacto</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Celular</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Validez de la oferta</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Elaborado por</label>
        <input type="text" id="Name" name="Name" /> <br>
      </v-col>
      <v-col cols="6" id="border" class="py-0 pl-0">
        <label for="Name" class="label ">NIT / C.C.</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Ciudad</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Teléfono</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Cargo</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Correo electrónico</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Entrega de resultados</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Cargo</label>
        <input type="text" id="Name" name="Name" /> <br>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">2. Propuesta técnica y económica</h5>
    </v-row>
    <v-row id="border">
      <h5 class="primary text-center white--text" style="width: 100%">Item 1</h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card >
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" :search="search">
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row id="border">
      <v-col cols="8" id="border" class="py-0 px-0">
        <h5 class="primary text-center white--text px-0 py-0" style="width: 100%">Observaciones de la propuesta técnica y económica</h5>
      </v-col>
      <v-col cols="4" class="px-0 py-0">
        <label for="Name" class="label">Subtotal</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Iva</label>
        <input type="text" id="Name" name="Name" /> <br>
        <label for="Name" class="label">Total</label>
        <input type="text" id="Name" name="Name" /> <br>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "PageCotizacion",
  data: () => ({
    search: '',
    headers: [
      {
        text: 'Código de referencia',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: 'Descripción del ensayo', value: 'calories' },
      { text: 'unidades', value: 'fat' },
      { text: 'Técnica analítica', value: 'carbs' },
      { text: 'Método analítico', value: 'protein' },
      { text: 'Límite de cuantificación', value: 'iron' },
      { text: 'Costo del ensayo' }
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: '7%',
      },
    ],
  }),
};
</script>
<style>
#border {
  border: 1px solid black;
}

.texto {
  text-align: center;

}

.parrafo {
  font-size: 12px;
  font-style: italic;
}

.codigo {
  text-align: center;
  font-size: 14px;
}

.cuadros {
  border: solid 3px rgb(247, 113, 4);

}

.label {
  background-color: #ED7D31;
  color: white;
  padding: 2px 66px;
}
</style>
