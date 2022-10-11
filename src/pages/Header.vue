<template>
  <v-container fluid style="padding: 0;">
    <v-app-bar color="primary" dark flat>
      <v-app-bar-nav-icon v-if="this.$store.state.token!=''" @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-black black--text">LABFICAT</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  class="font-weight-black" icon @click="cerrarSesion">
        <v-list-item-title class="black--text">Salir</v-list-item-title>
        <v-icon class="black--text">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary bottom dark expand-on-hover>
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item to="inicio">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
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
    cerrarSesion(){
      this.$router.push('/');
      this.$store.state.token='';
      this.$store.state.elaborador='';
      this.$store.state.cotizacionEditar=''
      this.$store.state.cotizacionVer=false
    }
  }
};
</script>
<style scoped>

</style>