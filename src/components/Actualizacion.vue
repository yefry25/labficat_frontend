<template>
    <v-container fluid>
        <v-row justify="center" class="mb-5">
            <v-col cols="3" class="text-center">
                <h2>Cambio de color</h2>
                <v-card>
                    <v-color-picker v-model="color" class="ma-2 " show-swatches></v-color-picker>
                    <v-card-actions>
                        <v-btn :color="this.$store.state.color" @click="actualizarColor">Guardar color</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    name: "pageActualizacion",
    data() {
        return {
            color: "#FF00FF"
        }
    },
    methods: {
        actualizarColor() {
            let header = { headers: { "x-token": this.$store.state.token } };
            let codigo = "63655c32553ec6d83aac2b0e"
            axios.put(`https://labficat.herokuapp.com/api/color/modificar/${codigo}`, {
                color: this.color
            }, header)
                .then((res) => {
                    console.log(res.data.modificar.color);
                    this.traerColor();
                })
                .catch((err) => {

                    console.log(err);
                    
                    if (
                        err.response.data.msg ==
                        "Token expiró, por favor inicie sesión nuevamente"
                    ) {
                        this.$swal({
                            icon: "error",
                            title: `${err.response.data.msg}`,
                            confirmButtonText: "Ir a inicio de sesión",
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                this.$router.push("/");
                                this.$store.state.token = undefined;
                                localStorage.removeItem("token");
                                localStorage.removeItem("elaborador");
                            }
                        });
                    } else {
                        this.$swal({
                            icon: "error",
                            title: "Error al cambiar el color de la interfaz",
                        });
                    }
                })
        },
        traerColor() {
            axios.get('https://labficat.herokuapp.com/api/color')
                .then((res) => {
                    console.log("color: " + res.data.color[0].color);
                    this.$store.dispatch("setColor", res.data.color[0].color)
                })
                .catch((err) => {
                    console.log(err);


                })
        },
    }
}
</script>