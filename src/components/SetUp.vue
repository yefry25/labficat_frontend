<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table :headers="encabezado" :items="consecutivos" :loading="myLoading"
            loading-text="Cargando... Por favor espera">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="editarConsecutivos(item)"> mdi-pencil </v-icon>
              <v-btn icon @click="resetearConsecutivos(item)">
                <font-awesome-icon style="font-size: 24px" icon="fa-solid fa-spinner" />
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-toolbar-title color="orange">
              <v-avatar @click="close">
                <v-icon>mdi-close</v-icon>
              </v-avatar>
              <span>Editar orden de servicio</span>
            </v-toolbar-title>
            <validation-observer ref="observer" v-slot="{ invalid }">
              <form @submit.prevent="submit" class="py-7 px-7">
                <validation-provider v-slot="{ errors }" name="Consecutivo muestra" >
                  <v-text-field v-model="consecutivoMuestra" :error-messages="errors" label="consecutivo muestra"
                    outlined required>
                  </v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Consecutivo oferta" >
                  <v-text-field v-model="consecutivoOferta" :error-messages="errors" label="consecutivo oferta" outlined
                    required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Iva">
                  <v-text-field v-model="iva" :error-messages="errors" label="iva" outlined required></v-text-field>
                </validation-provider>
                <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded
                  @click="consecutivoActualizar" block>
                  Actualizar consecutivos
                </v-btn>
              </form>
            </validation-observer>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required, email, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} no puede estar vacio",
});
extend("email", {
  ...email,
  message: "Email must be valid",
});
extend("min", {
  ...min,
  message: "El campo {_field_} debe tener {length} caracteres o más",
});
import axios from 'axios'
export default {
  name: "pageSetup",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      dialog: false,
      myLoading: true,
      encabezado: [
        {
          text: "Consecutivo de muestra",
          align: "start",
          sortable: false,
          value: "consecutivoMuestra",
        },
        { text: "Consecutivo oferta", value: "consecutivoOferta", sortable: false },
        { text: "Iva", value: "iva", sortable: false },
        { text: "Acciones", value: 'actions', sortable: false },
      ],
      consecutivoMuestra: 1,
      consecutivoOferta: 1,
      iva: 19,
      consecutivos: [],
      consecutivoEditar:{}
    }
  },
  methods: {
    traerConsecutivos() {
      axios.get('https://labficat.herokuapp.com/api/setup')
        .then((res) => {
          this.consecutivos = res.data.consecutivos;
          this.myLoading = false
        })
        .catch((err) => {
          console.log(err);
        })
    },
    editarConsecutivos(consecutivo) {
      this.dialog = true
      this.consecutivoEditar=consecutivo
    },
    consecutivoActualizar(){
        axios.put(`https://labficat.herokuapp.com/api/setup/modificar/${this.consecutivoEditar._id}`, {
          consecutivoMuestra: this.consecutivoMuestra,
          consecutivoOferta: this.consecutivoOferta,
          consecutivoInforme: 1,
          iva: this.iva
        })
          .then((res) => {
            console.log(res.data.modificar);
            this.traerConsecutivos()
            this.$swal({
              icon: "success",
              title: "Actualizacion de los consecutivos exitoso",
            });
          })
          .catch((err) => {
            console.log(err);
            this.$swal({
              icon: "error",
              title: "Error al actualizar los consecutivos",
            });
          })
    },
    resetearConsecutivos(consecutivo){
      axios.put(`https://labficat.herokuapp.com/api/setup/modificar/${consecutivo._id}`, {
          consecutivoMuestra: 1,
          consecutivoOferta: 1,
          consecutivoInforme: 1,
          iva: 19
        })
          .then((res) => {
            console.log(res.data.modificar);
            this.traerConsecutivos()
            this.$swal({
              icon: "success",
              title: "Actualizacion de los consecutivos exitoso",
            });
          })
          .catch((err) => {
            console.log(err);
            this.$swal({
              icon: "error",
              title: "Error al actualizar los consecutivos",
            });
          })
      this.traerConsecutivos()
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.traerConsecutivos();
  },
};
</script>