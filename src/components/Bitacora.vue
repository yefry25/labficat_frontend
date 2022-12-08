<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-card-actions>
            <h2>Bitacora</h2>
          </v-card-actions>
          <v-data-table :headers="encabezadoBitacora" :items="bitacora" :loading="myLoading" :sort-by="['createdAt']"
            :sort-desc="[true]" loading-text="Cargando... Por favor espera">
            <template v-slot:[`item.createdAt`]="{ item }">
              <span>{{ fecha(item.createdAt) }}</span>
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
  name: "pageBitacora",
  data() {
    return {
      myLoading: true,
      encabezadoBitacora: [
        {
          text: "Usuario",
          align: "start",
          sortable: true,
          value: "usuario.nombre",
        },
        { text: "Mensaje", value: "mensaje", sortable: true },
        { text: "Fecha y hora", value: "createdAt", sortable: true },
      ],
      bitacora: []
    }
  },
  methods: {
    traerBitacora() {
      axios.get('https://labficat-backend.vercel.app/api/bitacora')
        .then((res) => {
          this.bitacora = res.data.bitacoras
          this.myLoading = false;
        })
        .catch((err) => {
          console.log(err);
        })
    },
    fecha(r) {
      let d = new Date(r);
      console.log();
      return d.toLocaleDateString() + ' ' + '-' + ' ' + d.toLocaleTimeString()
    }
  },

  created() {
    this.traerBitacora()
  }
};
</script>