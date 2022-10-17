<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card>
                    <v-data-table :headers="encabezado" :items="usuarios" :loading="myLoading"
                        loading-text="Cargando... Por favor espera">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-btn icon>
                                <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-pencil" />
                            </v-btn>

                            <v-btn icon @click="resetearConsecutivos(item)">
                                <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-spinner" />
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    name: 'pageVerUsuarios',
    data() {
        return {
            myLoading: true,
            encabezado: [
                {
                    text: "Nombre",
                    align: "start",
                    sortable: false,
                    value: "nombre",
                },
                { text: "Documento", value: "documento", sortable: false },
                { text: "Direccion", value: "direccion", sortable: false },
                { text: "Ciudad", value: "ciudad.Ciudad", sortable: false },
                { text: "Contacto", value: "contacto", sortable: false },
                { text: "Telefono", value: "telefono", sortable: false },
                { text: "Correo", value: "correo", sortable: false },
                { text: "Rol", value: "rol", sortable: false },
                { text: "Estado", value: "estado", sortable: false },
                { text: "Acciones", value: "actions", sortable: false },
            ],
            usuarios: []
        }
    },
    methods: {
        traerUsuarios() {
            axios.get('https://labficat.herokuapp.com/api/usuario')
                .then((res) => {
                    console.log(res.data.usuario);
                    this.usuarios = res.data.usuario
                    this.myLoading = false
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    },
    created() {
        this.traerUsuarios( )
    }
}
</script>