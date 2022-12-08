<template>
    <v-container fluid>

        <v-row>
            <v-col>
                <v-card class="mx-auto text-center" max-width="434" tile>

                    <div class="relative">
                        <v-avatar size="150" class="my-5 ">
                            <img :src="this.$store.state.elaborador.foto">
                        </v-avatar>
                        <div class="absolute">
                            <v-btn icon class="white">
                                <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp"
                                    placeholder="Pick an avatar" prepend-icon="mdi-camera" label="Avatar" hide-input
                                    v-model="foto" @change="subir()" class="ml-2 mt-1" style="margin-top:0; padding-top:0;">
                                </v-file-input>
                            </v-btn>
                        </div>
                    </div>

                    <v-card-text>
                        <h2 class="my-2">{{ this.$store.state.elaborador.nombre }}</h2>
                        <h3 class="my-2">{{ this.$store.state.elaborador.rol }}</h3>
                    </v-card-text>
                    <v-chip class="primary mb-5" link @click="dialog = true">
                        Cambiar contraseña
                    </v-chip>
                </v-card>
            </v-col>
        </v-row>

        <!-- dialog de cambio de contraseña -->

        <v-row>
            <v-col>
                <v-dialog v-model="dialog" max-width="800px" persistent>
                    <v-card>
                        <v-card-title>
                            <v-hover v-slot="{ hover }">
                                <v-btn icon @click="close" :style="{ color: hover ? 'red' : '' }">
                                    <font-awesome-icon style="fontsize: 20px" icon="fa-solid fa-xmark" />
                                </v-btn>
                            </v-hover>
                            Cambio de contraseña
                        </v-card-title>
                        <validation-observer ref="observer" v-slot="{ invalid }">
                            <form @submit.prevent="submit" class="py-7 px-7">
                                <validation-provider v-slot="{ errors }" name="password actual"
                                    :rules="{ required: true, min: 8 }">
                                    <v-text-field v-model="passwordActual" :error-messages="errors"
                                        label="Password actual" type="password" outlined required></v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="nueva password" vid="nuevaPassword"
                                    :rules="{ required: true, min: 8 }">
                                    <v-text-field v-model="nuevaPassword" :error-messages="errors"
                                        label="Nueva password" type="password" outlined required></v-text-field>
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
                </v-dialog>
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
    name: "pagePerfil",
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            dialog: false,
            nuevaPassword: '',
            confirmarPassword: '',
            passwordActual: '',
            foto: []
        }
    },
    methods: {
        cambiarPassword() {
            let header = { headers: { "x-token": this.$store.state.token } };
            axios.put(`https://labficat-backend.vercel.app/api/usuario/modificar/password/${this.$store.state.elaborador.id}`, {
                passwordActual: this.passwordActual,
                password: this.nuevaPassword
            }, header)
                .then((res) => {
                    console.log(res);
                    this.$swal({
                        icon: "success",
                        title: "Cambio de contraseña exitoso, por favor diríjase al inicio de sesión",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.$swal({
                        icon: "error",
                        title: "Error al cambiar la contraseña",
                    });
                })
        },
        subir() {
            console.log(this.foto);
            let fd = new FormData();
            fd.append("archivo", this.foto);
            let header = { headers: { "x-token": this.$store.state.token } };
            console.log(fd);
            axios
                .post(
                    `https://labficat-backend.vercel.app/api/usuario/uploadinary/${this.$store.state.elaborador.id}`,
                    fd,
                    header
                )
                .then((response) => {
                    console.log(response.data);
                    this.$store.state.elaborador.foto = response.data.url; /* hacer esto con un state y un commit */
                    this.$swal({
                        icon: "success",
                        title: "Imagen agregada con exito",
                    });
                })
                .catch((error) => {
                    console.log(error);
                    this.$swal({
                        icon: "error",
                        title: "Error al cargar la foto de perfil",
                    });
                });
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
    }
}
</script>

<style scoped>
.avatar img {
    position: relative;
}

.avatar .boton-avatar {
    position: absolute;
    top: 0px;
    left: 0px;
}

.relative {
    position: relative;
    background-color: antiquewhite;
}

.absolute {
    position: absolute;
    top: 10%;
    left: 35%;
    width: auto;
    height: auto;
}
</style>