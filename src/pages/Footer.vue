<template>
  <v-container>
    <v-footer padless absolute>
      <v-col class="text-center primary" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
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