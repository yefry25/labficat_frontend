<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              <v-text-field v-model="busqueda" append-icon="mdi-magnify" label="buscar" single-line hide-details>
              </v-text-field>
  
              <v-spacer></v-spacer>
  
              <v-btn color="blue darken-1" to="recepcionMuestra">
                agregar nueva muestra
              </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="muestras" :search="busqueda">
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon @click="traerCotizaciones(item)"> mdi-pencil </v-icon>
              </template>
              <template v-slot:[`item.fechaRecoleccion`]="{ item }">
                <span>{{fecha(item.fechaRecoleccion)}}</span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <script>
  import axios from "axios";
  export default {
    name: "PageMostrar",
    data() {
      return {
        busqueda: "",
        muestras:[],
        headers: [
      {
        text: "Código de Muestra",
        align: "start",
        sortable: false,
        value: "codMuestra",
      },
      { text: "Dirección de toma de muestra", value: "direccionTomaMuestra" },
      { text: "Lugar de toma de muestra", value: "lugarTomaMuestra" },
      { text: "Fecha y hora de recolección", value: 'fechaRecoleccion' },
      { text: "Cotización", value: "cotizacion" },
      { text: 'Acciones', value: 'actions' }
    ],
      };
    },
    computed: {
      buscar() {
        return this.muestras.filter((user) => {
          const codMuestra = user.codMuestra.toLowerCase();
          const direccion = user.direccionTomaMuestra.toLowerCase();
          const lugar = user.lugarTomaMuestra.toLowerCase();
          const fecha = user.fechaRecoleccion.toLowerCase();
          const Cotización = user.Cotización.toLowerCase();
          const busqueda = this.busqueda.toLowerCase();
  
          
  
          return (
            codMuestra.includes(busqueda) ||
            direccion.includes(busqueda) ||
            lugar.includes(busqueda) ||
            fecha.includes(busqueda) ||
            Cotización.includes(busqueda)
          );
  
        });
      },
    },
    methods: {
      traerMuestra(){
        axios.get('https://labficat.herokuapp.com/api/muestra')
        .then((res)=>{
            this.muestras=res.data.muestra
        })
        .catch((err) => {
            console.log(err)
        })
      },
      fecha(r) {
        let d = new Date(r);
        return d.toLocaleDateString() + " - " + d.toLocaleTimeString()
      },
    },
    created() {
      this.traerMuestra();
    },
  };
  </script>