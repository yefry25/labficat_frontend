<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card class="rounded-xl rounded-bl-0" outlined>
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
              <validation-provider v-slot="{ errors }" name="costo" rules="required">
                <v-text-field v-model="costo" :error-messages="errors" label="Costo" type="number" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="descripcion" rules="required">
                <v-text-field v-model="descripcion" :error-messages="errors" label="Descripción" outlined required>
                </v-text-field>
              </validation-provider>
              <validation-provider v-slot="{ errors }" name="limite cuantificación" rules="required">
                <v-text-field v-model="limiteCuantificacion" :error-messages="errors" type="number" label="Límite cuantificación"
                  outlined required>
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
      console.log(this.responsables.titular);
      console.log(this.responsables.suplente);
      axios.post('https://labficat.herokuapp.com/api/ensayo', {
        ensayo: this.ensayo,
        metodo: this.metodo,
        tecnica: this.tecnica,
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
    }
  },
  created() {
    this.traerUsuarios()
  }
};
</script>