<template>
  <v-container >
    <v-footer padless >
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