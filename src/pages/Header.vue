<template>
  <v-container fluid style="padding: 0;">
    <v-app-bar color="primary" dark flat>
      <v-app-bar-nav-icon v-if="this.$store.state.token!=undefined" @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-black black--text">LABFICAT</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="font-weight-black" icon @click="cerrarSesion">
        <!-- <v-list-item-title class="black--text">Salir</v-list-item-title> -->
        <font-awesome-icon style="font-size:30px; color: black" icon="fa-solid fa-right-from-bracket" />
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary bottom dark expand-on-hover>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item to="inicio">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item to="mostrarCotizacion">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
            </v-list-item-icon>
            <v-list-item-title>Cotizacion</v-list-item-title>
          </v-list-item>

          <v-list-item to="mostrarMuestra">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-book" />
            </v-list-item-icon>
            <v-list-item-title>Muestra</v-list-item-title>
          </v-list-item>

          <v-list-item to="ordenServicio">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-check-to-slot" />
            </v-list-item-icon>
            <v-list-item-title>orden de servicio</v-list-item-title>
          </v-list-item>

          <v-list-item to="informeDeResultados">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-table-list" />
            </v-list-item-icon>
            <v-list-item-title>informe de resultados</v-list-item-title>
          </v-list-item>

          <v-list-item to="mostrarUsuarios">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-user-pen" />
            </v-list-item-icon>
            <v-list-item-title>registro de usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item to="configuracion">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-users-gear" />
            </v-list-item-icon>
            <v-list-item-title>configuracion</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "pageHeader",
  data() {
    return {
      drawer: false,
      group: null,
    }
  },
  methods: {
    cerrarSesion() {
      this.$router.push('/');
      this.$store.state.cotizacionEditar = '';
      this.$store.state.cotizacionVer = false;
      this.$store.state.token = undefined;
      localStorage.removeItem('token');
      localStorage.removeItem('elaborador');
    }
  },
  created() {
    console.log('token: ' + this.$store.state.token);
  }
};
</script>
<style scoped>

</style>