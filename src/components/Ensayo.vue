<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="rounded-xl rounded-bl-0" outlined>
          <v-card-actions>
            <h2>Formulario de ensayos</h2>
          </v-card-actions>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit" class="py-7 px-7">
              <validation-provider v-slot="{ errors }" name="ensayo" rules="required">
                <v-text-field v-model="ensayo" :error-messages="errors" label="Ensayo" outlined required></v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="metodo" rules="required">
                <v-text-field v-model="metodo" :error-messages="errors" label="Metodo" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="tecnica" rules="required">
                <v-text-field v-model="tecnica" :error-messages="errors" label="Técnica" type="text" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="valor mínimo" rules="required">
                <v-text-field v-model="valorMinimo" :error-messages="errors" label="Valor Mínimo" type="number" outlined
                  required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="valor maximo" rules="required">
                <v-text-field v-model="valorMaximo" :error-messages="errors" label="Valor Máximo" type="number" outlined
                  required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="unidades" rules="required">
                <v-text-field v-model="unidades" :error-messages="errors" label="Unidades" type="number" outlined
                  required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="costo" rules="required">
                <v-text-field v-model="costo" :error-messages="errors" label="Costo" type="number" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="descripcion" rules="required">
                <v-text-field v-model="descripcion" :error-messages="errors" label="Descripción" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="limite cuantificación" rules="required">
                <v-text-field v-model="limiteCuantificacion" :error-messages="errors" type="number"
                  label="Límite cuantificación" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="titular" rules="required">
                <v-autocomplete v-model="responsables.titular" :error-messages="errors" :items="usuarios"
                  item-text="nombre" item-value="._id" dense filled label="Titular"></v-autocomplete>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="suplente" rules="required">
                <v-autocomplete v-model="responsables.suplente" :error-messages="errors" :items="usuarios"
                  item-text="nombre" item-value="._id" dense filled label="Suplente"></v-autocomplete>
              </validation-provider>
              <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block
                @click="ingresarEnsayo">
                Registrar
              </v-btn>
            </form>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios";
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
  ...required,
  message: '{_field_} no puede estar vacio',
})
extend('email', {
  ...email,
  message: 'Email must be valid',
})
extend('min', {
  ...min,
  message: 'El campo {_field_} debe tener {length} caracteres o más'
})
extend('confirmed', {
  ...confirmed,
  message: 'El campo {_field_} debe coincidir con contraseña'
})
export default {
  name: "pageEnsayo",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      ensayo: '',
      metodo: '',
      tecnica: '',
      valorMinimo: null,
      valorMaximo: null,
      unidades: null,
      costo: null,
      descripcion: '',
      limiteCuantificacion: '',
      responsables: {
        titular: '',
        suplente: ''
      },
      usuarios: []
    }
  },
  methods: {

    ingresarEnsayo() {
      axios.post('https://labficat.herokuapp.com/api/ensayo', {
        ensayo: this.ensayo,
        metodo: this.metodo,
        tecnica: this.tecnica,
        valorMinimo: this.valorMinimo,
        valorMaximo: this.valorMaximo,
        unidades: this.unidades,
        costo: this.costo,
        descripcion: this.descripcion,
        limiteCuantificacion: this.limiteCuantificacion,
        responsables: this.responsables,
      })
        .then((res) => {
          console.log(res.data.ensayos);
          this.$swal({
            icon: "success",
            title: "Registro exitoso",
            text: `Registro exitoso del ensayo`,
          });
          this.limpiarInfo()
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            icon: "error",
            title: "Error al registrar un ensayo",
          });
        })
    },
    traerUsuarios() {
      axios.get('https://labficat.herokuapp.com/api/usuario')
        .then((res) => {
          this.usuarios = res.data.usuario;
          console.log(this.usuarios);
        })
        .catch((err) => {
          console.log(err);
        })
    },
    limpiarInfo(){
      this.ensayo= '',
      this.metodo= '',
      this.tecnica= '',
      this.valorMinimo= null,
      this.valorMaximo= null,
      this.unidades= null,
      this.costo= null,
      this.descripcion= '',
      this.limiteCuantificacion= '',
      this.responsables= {
        titular: '',
        suplente: ''
      }
    }
  },
  created() {
    this.traerUsuarios()
  }
};
</script>