<template>
    <v-container fluid>
        <v-row>
            <v-col class="d-flex justify-center">
                <v-card max-width="600px">
                    <v-card-title>
                        Cambiar contraseña
                    </v-card-title>
                    <validation-observer ref="observer" v-slot="{ invalid }">
                        <form @submit.prevent="submit" class="py-7 px-7">
                            <validation-provider v-slot="{ errors }" name="nueva password" vid="nuevaPassword"
                                :rules="{ required: true, min: 8 }">
                                <v-text-field v-model="nuevaPassword" :error-messages="errors" label="Nueva password"
                                    type="password" outlined required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="Confirmar password"
                                rules="required|confirmed:nuevaPassword">
                                <v-text-field v-model="confirmarPassword" :error-messages="errors" type="password"
                                    label="Confirmar password" outlined required></v-text-field>
                            </validation-provider>
                            <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block
                                @click="cambiarPassword">
                                Cambiar contraseña
                            </v-btn>
                        </form>
                    </validation-observer>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
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
extend("confirmed", {
    ...confirmed,
    message: "El campo {_field_} debe coincidir con contraseña",
});
export default {
    name: 'pageCambiarClave',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            nuevaPassword: '',
            confirmarPassword: '',
            token: ''
        }
    },
    methods: {
        cambiarPassword() {
            let header = { headers: { "reset": this.token } };
            axios.put('https://labficat.herokuapp.com/api/usuario/nuevaPassword', {
                nuevaPassword: this.nuevaPassword
            }, header)
                .then((res) => {
                    console.log(res);
                    this.$swal({
                        icon: "success",
                        title: "Cambio de contraseña exitoso, por favor diríjase al inicio de sesión",
                    });
                    this.$store.state.emailConfirmed = undefined;
                    localStorage.removeItem('email');
                })
                .catch((err) => {
                    console.log(err);
                    this.$swal({
                        icon: "error",
                        title: "Error al cambiar la contraseña",
                    });
                })
        },
        traerUsuarioEmail() {
            axios.post("https://labficat.herokuapp.com/api/usuario/email", { email: this.$store.state.emailConfirmed })
                .then((res) => {
                    console.log(res.data.user);
                    this.token = res.data.user.resetToken
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
    created() {
        this.traerUsuarioEmail();
    }
}
</script>