<template>
  <v-container fluid style="padding: 0;" v-if="this.$router.history.current['path']!=='/facturaMuestra' && this.$router.history.current['path']!=='/facturaCotizacion' && this.$router.history.current['path']!=='/facturaInforme'">
    <v-app-bar color="primary" dark flat>
      <v-app-bar-nav-icon v-if="this.$store.state.token != undefined" @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-black black--text">LABFICAT</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="this.$store.state.token != undefined" class="font-weight-black" icon @click="cerrarSesion">
        <!-- <v-list-item-title class="black--text">Salir</v-list-item-title> -->
        <font-awesome-icon style="font-size:30px; color: black" icon="fa-solid fa-right-from-bracket" />
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary bottom dark expand-on-hover>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item to="perfil">
            <v-row class="my-5">
              <v-col class="text-center">
                <v-avatar size="100">
                  <img
                    :src="this.$store.state.elaborador.foto"
                    alt="imagen perfil">
                </v-avatar>
                <h5 class="mt-4">{{ this.$store.state.elaborador.nombre }}</h5>
                <h5>{{ this.$store.state.elaborador.rol }}</h5>
              </v-col>
            </v-row>
          </v-list-item>
          <v-list-item to="inicio">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item>

          <v-list-item to="mostrarCotizacion"
          v-if="this.$store.state.elaborador.rol=='Responsable de Laboratorio' || this.$store.state.elaborador.rol=='Responsable de Calidad'">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-hand-holding-dollar" />
            </v-list-item-icon>
            <v-list-item-title>Cotizacion</v-list-item-title>
          </v-list-item>

          <v-list-item to="mostrarMuestra"
          v-if="this.$store.state.elaborador.rol=='Responsable de Calidad' || this.$store.state.elaborador.rol=='Responsable de Gestión' || this.$store.state.elaborador.rol=='Personal Técnico'">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-book" />
            </v-list-item-icon>
            <v-list-item-title>Muestra</v-list-item-title>
          </v-list-item>

          <v-list-item to="ordenServicio" v-if="this.$store.state.elaborador.rol=='Responsable de Calidad'">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-check-to-slot" />
            </v-list-item-icon>
            <v-list-item-title>orden de servicio</v-list-item-title>
          </v-list-item>

          <v-list-item to="informeDeResultados" v-if="this.$store.state.elaborador.rol=='Responsable de Calidad' || this.$store.state.elaborador.rol=='Personal Técnico' || this.$store.state.elaborador.rol=='Responsable de Laboratorio'">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-table-list" />
            </v-list-item-icon>
            <v-list-item-title>informe de resultados</v-list-item-title>
          </v-list-item>

          <v-list-item to="mostrarUsuarios"
          v-if="this.$store.state.elaborador.rol=='Responsable de Laboratorio' || this.$store.state.elaborador.rol=='Responsable de Calidad' || this.$store.state.elaborador.rol=='Responsable de Gestión'">
            <v-list-item-icon>
              <font-awesome-icon icon="fa-solid fa-user-pen" />
            </v-list-item-icon>
            <v-list-item-title>registro de usuarios</v-list-item-title>
          </v-list-item>

          <v-list-item to="configuracion" v-if="this.$store.state.elaborador.rol=='Responsable de Calidad'">
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