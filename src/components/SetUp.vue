<template>
    <v-container fluid>
        <v-row>
            <v-col cols="2" align="center" class="mx-auto px-0 py-0" style="border: 1px solid black; ">
                <v-img position="center center"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/1200px-Sena_Colombia_logo.svg.png">
                </v-img>
            </v-col>
        </v-row>
        <v-row>
            <v-col align="center" class="px-0 py-0">
                <h1 class="primary">Consecutivos</h1>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4" class=" text-center px-0 py-0" id="border">
            <p id="border" class="mb-0 ">Cotización</p>
            <p id="border" class="mb-0 ">Muestra</p>
            <p id="border" class="mb-0 ">Iva</p>
          </v-col>
          <v-col cols="2" class="px-0 py-0 " id="border">
            <v-text-field id="border" v-model="cotizacion" class="maximo px-0 py-0 mx-0 my-0" height="26"></v-text-field>
            <v-text-field id="border" v-model="muestra" class="maximo px-0 py-0 mx-0 my-0" height="26"></v-text-field>
            <v-text-field id="border" v-model="iva" class="maximo px-0 py-0 mx-0 my-0" height="26"></v-text-field>
          </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'pageSetup',
    data: () => ({
        consecutivos: [],
        cotizacion: '',
        muestra: '',
        iva: ''
    }),
    methods: {
        traerConsecutivos() {
            axios.get('https://labficat.herokuapp.com/api/setup/listar')
                .then((response) => {
                    console.log(response);
                    this.consecutivos = response.data.consecutivos
                    this.cotizacion=response.data.consecutivos[0].consecutivoOferta
                    this.muestra=response.data.consecutivos[0].consecutivoMuestra
                    this.iva=response.data.consecutivos[0].iva
                    console.log(this.consecutivos);
                    console.log(this.cotizacion);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },
    created() {

    },
    mounted() {
        this.traerConsecutivos()
    }
}
</script>

<style scoped>
    #border {
        border: 1px solid black;
    }

    .maximo {
        max-height: 26px;
    }
</style>
