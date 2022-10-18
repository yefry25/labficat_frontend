<template>
    <v-container fluid>
        <v-row class="my-12 justify-center text-center white--text pa-4 text-center">
            <v-col cols="8">
                <v-card class="rounded-xl rounded-bl-0" outlined>
                    <validation-observer ref="observer" v-slot="{ invalid }">
                        <form @submit.prevent="registrar" class="py-7 px-7">
                            <validation-provider v-slot="{ errors }" name="tipo de persona" rules="required">
                                <v-select v-model="select" :items="items" :error-messages="errors" outlined
                                    label="Tipo de persona" data-vv-name="tipo de persona" required></v-select>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="nombre" rules="required">
                                <v-text-field v-model="nombre" :error-messages="errors" label="Nombre" outlined
                                    required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="documento" rules="required">
                                <v-text-field v-model="documento" :error-messages="errors" label="Documento" outlined
                                    required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="dirección" rules="required">
                                <v-text-field v-model="direccion" :error-messages="errors" label="Dirección" outlined
                                    required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="departamento" rules="required">
                                <v-select v-model="departamento" :items="departa" item-text="departamento"
                                    item-key="departa" item-value="_id" :error-messages="errors" outlined
                                    label="Departamento" data-vv-name="departamento" @change="traerCiudades(departa)"
                                    required></v-select>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="ciudad" rules="required">
                                <v-select v-model="ciudad" :items="ciudades" item-text="Ciudad" item-key="ciudades"
                                    item-value="_id" :error-messages="errors" outlined label="Cuidad"
                                    data-vv-name="ciudad" required></v-select>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="contacto" rules="required">
                                <v-text-field v-model="contacto" :error-messages="errors" label="Contacto" outlined
                                    required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="teléfono del contacto" rules="required">
                                <v-text-field v-model="celularContacto" :error-messages="errors"
                                    label="Telefono contacto" outlined required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="teléfono" rules="required">
                                <v-text-field v-model="telefono" :error-messages="errors" label="Teléfono" outlined
                                    required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="Email" rules="required|email">
                                <v-text-field v-model="email" :error-messages="errors" label="E-mail"
                                    prepend-icon='mdi-email' outlined required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="contraseña" vid="password"
                                :rules="{required:true , min:8 }">
                                <v-text-field v-model="password" :error-messages="errors" label="Contraseña"
                                    type="password" outlined prepend-icon='mdi-lock' required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="confirmar contraseña"
                                rules='required|confirmed:password'>
                                <v-text-field v-model="confirmation" :error-messages="errors"
                                    label="confirmar contraseña" outlined type="password" required></v-text-field>
                            </validation-provider>
                            <validation-provider v-slot="{ errors }" name="rol" rules="required">
                                <v-select v-model="rol" :items="roles" :error-messages="errors" outlined label="Roles"
                                    data-vv-name="roles" required></v-select>
                            </validation-provider>
                            <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block
                                @click="registrar">
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
    name: "pageRegistro",
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data: () => ({
        select: null,
        nombre: '',
        documento: '',
        direccion: '',
        departamento: '',
        ciudad: '',
        contacto: '',
        celularContacto: '',
        telefono: '',
        email: '',
        password: '',
        confirmation: '',
        rol: '',
        items: [
            'Natural',
            'Jurídica'
        ],
        roles: [
            'cliente',
            'secretario',
            'administrador',
            'director',
            'especialista',
            'supervisor'
        ],
        departa: [],
        ciudades: []
    }),
    methods: {
        traerDepartamentos() {
            axios.get('https://labficat.herokuapp.com/api/ciudad/departamentos')
                .then((response) => {
                    console.log(response.data.departamentos);
                    this.departa = response.data.departamentos
                    console.log(this.departa);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        traerCiudades(ciudad) {
            console.log(ciudad);
            axios.post('https://labficat.herokuapp.com/api/ciudad/nombreDepartamento', { departamento: this.departamento })
                .then((response) => {
                    console.log(response.data.ciudades);
                    this.ciudades = response.data.ciudades
                    console.log(this.ciudades);
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        registrar() {
            axios.post('https://labficat.herokuapp.com/api/usuario', {
                tipoPersona: this.select,
                nombre: this.nombre,
                documento: this.documento,
                direccion: this.direccion,
                ciudad: this.ciudad,
                contacto: this.contacto,
                celularContacto: this.celularContacto,
                telefono: this.telefono,
                correo: this.email,
                password: this.password,
                rol: this.rol
            })
                .then((res) => {
                    console.log(res.data);
                    this.$swal({
                        icon: "success",
                        title: "Registro exitoso",
                        text: `${res.data.usuario.nombre} registrado exitosamente`,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.$swal({
                        icon: "error",
                        title: "Error al registrar el usuario",
                    });
                })
        }
    },
    created() {
        this.traerDepartamentos()
    },
    mounted() {

    }
}
</script>