<template>
  <v-container>
    <v-row>
      <v-col cals="6">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                COTIZACION
              </v-list-item-title>
              <v-list-item-subtitle
                >ingresar datos del usuario para realizar la
                cotizacion</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="font-weight-black black--text">mdi-test-tube</v-icon>
          </v-list-item>
          <v-card-actions>
            <v-btn to="cotizacion" outlined rounded text> INGRESAR </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cals="6">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                aca va el otro :)
              </v-list-item-title>
              <v-list-item-subtitle
                >ingresar datos del usuario para realizar la
                cotizacion</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="font-weight-black black--text">mdi-test-tube</v-icon>
          </v-list-item>
          <v-card-actions>
            <v-btn to="cotizacion" outlined rounded text> INGRESAR </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cals="6">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                COTIZACION
              </v-list-item-title>
              <v-list-item-subtitle
                >ingresar datos del usuario para realizar la
                cotizacion</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="font-weight-black black--text">mdi-test-tube</v-icon>
          </v-list-item>
          <v-card-actions>
            <v-btn to="cotizacion" outlined rounded text> INGRESAR </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cals="6">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                COTIZACION
              </v-list-item-title>
              <v-list-item-subtitle
                >ingresar datos del usuario para realizar la
                cotizacion</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="font-weight-black black--text">mdi-test-tube</v-icon>
          </v-list-item>
          <v-card-actions>
            <v-btn to="cotizacion" outlined rounded text> INGRESAR </v-btn>
          </v-card-actions>
        </v-card>
    
      </v-col>
      <v-col cals="12">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-overline mb-4">labficat</div>
              <v-list-item-title class="text-h5 mb-1">
                COTIZACION
              </v-list-item-title>
              <v-list-item-subtitle
                >ingresar datos del usuario para realizar la
                cotizacion</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon class="font-weight-black black--text">mdi-test-tube</v-icon>
          </v-list-item>
          <v-card-actions>
            <v-btn to="cotizacion" outlined rounded text> INGRESAR </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "pageInicio",
  data: () => ({}),

  methods: {
    ingreso() {
      axios
        .post("https://labficat.herokuapp.com/api/cotizacion")
        .then((response) => {
          console.log(response);
          this.$router.push("/cotizacion");
          this.$swal({
            icon: "success",
            title: "Ingreso exitoso",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

