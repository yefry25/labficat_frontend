<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table :headers="encabezadoBitacora" :items="bitacora" :loading="myLoading"
          loading-text="Cargando... Por favor espera">
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "pageBitacora",
  data() {
    return {
      myLoading: true,
      encabezadoBitacora: [
        {
          text: "Usuario",
          align: "start",
          sortable: false,
          value: "usuario",
        },
        { text: "Mensaje", value: "mensaje", sortable: false },
      ],
      bitacora: []
    }
  },
  methods: {
    traerBitacora() {
      axios.get('https://labficat.herokuapp.com/api/bitacora')
        .then((res) => {
          this.bitacora = res.data.bitacoras
          this.myLoading = false;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  created() {
    this.traerBitacora()
  }
};
</script>