<template>
  <v-container fluid v-if="this.$router.history.current['path']!=='/facturaMuestra' && this.$router.history.current['path']!=='/facturaCotizacion' && this.$router.history.current['path']!=='/facturaInforme'">
    <v-footer padless app>
      <v-col class="text-center primary" cols="12">
        {{ new Date().getFullYear() }} — <strong>SENA</strong>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: "pageFooter",
  data: () => ({}),
};
</script>