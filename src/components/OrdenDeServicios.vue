<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card class="mb-4">
                    <v-card-title> Ordenes de servicio </v-card-title>
                    <v-data-table :headers="encabezado" :items="ordenes" :loading="myLoading"
                            loading-text="Cargando... Por favor espera">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-row>
                                <v-btn @click="infoOrdenEditar(item)" icon>
                                    <font-awesome-icon style="font-size:20px" icon="fa-solid fa-file-pen" />
                                </v-btn>
                                <div v-if="item.estado==1">
                                    <v-btn color='red' icon @click="estadoOrden(item)">
                                        <font-awesome-icon style="font-size:20px" icon="fa-solid fa-ban" />
                                    </v-btn>
                                </div>
                                <div v-else>
                                    <v-btn color="blue" icon @click="estadoOrden(item)">
                                        <font-awesome-icon style="font-size:20px" icon="fa-regular fa-circle-check" />
                                    </v-btn>
                                </div>
                            </v-row>
                        </template>
                        <template v-slot:[`item.estado`]="{ item }">
                            <div v-if="item.estado==1">
                                <b>
                                    <span class="blue--text">Activo</span>
                                </b>
                            </div>
                            <div v-else>
                                <b>
                                    <span class="red--text">Inactivo</span>
                                </b>
                            </div>
                        </template>
                    </v-data-table>
                    <v-card-actions> </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <!--   segmento de cuadro de dialog -->

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
                        <validation-provider v-slot="{ errors }" name="resultado" rules="required">
                            <v-text-field v-model="resultado" :error-messages="errors" label="Resultado" outlined
                                required></v-text-field>
                        </validation-provider>
                        <validation-provider v-slot="{ errors }" name="incertidumbre" rules="required">
                            <v-text-field v-model="incertidumbre" :error-messages="errors" label="Incertidumbre"
                                outlined required></v-text-field>
                        </validation-provider>
                        <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded
                            @click="editarOrdenServicio" block>
                            Actualizar orden de servicio
                        </v-btn>
                    </form>
                </validation-observer>
            </v-card>
        </v-dialog>
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

import axios from "axios";
export default {
    name: "pageOrdenServicio",
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            myLoading: true,
            dialog: false,
            resultado: "",
            incertidumbre: "",
            encabezado: [
                {
                    text: "Muestra",
                    align: "start",
                    sortable: false,
                    value: "idMuestra.codMuestra",
                },
                { text: "observaciones", value: "observaciones", sortable: false },
                { text: "estado", value: "estado", sortable: false },
                { text: "Acciones", value: "actions", sortable: false },
            ],
            ordenes: [],
            ordenEditar: {},
        };
    },
    methods: {
        traerOrdenes() {
            axios
                .get("https://labficat.herokuapp.com/api/orden")
                .then((res) => {
                    this.myLoading=false;
                    this.ordenes = res.data.orden;
                    console.log(this.ordenes);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        infoOrdenEditar(orden) {
            console.log(orden);
            this.dialog = true;
            this.ordenEditar = orden;
        },
        editarOrdenServicio() {
            axios
                .put(
                    `https://labficat.herokuapp.com/api/orden/completado/${this.ordenEditar._id}`,
                    {
                        itemsorden: [
                            {
                                resultado: this.resultado,
                                incertidumbre: this.incertidumbre,
                            },
                        ],
                    }
                )
                .then((res) => {
                    console.log(res.data.orden);
                    this.$swal({
                        icon: "success",
                        title: "Actualizacion de la orden de servicio exitoso",
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.$swal({
                        icon: "error",
                        title: "Error al actualizar la orden de servicio",
                    });
                });
        },
        estadoOrden(orden) {
            console.log("estado: " + orden.estado);
            if (orden.estado == 1) {
                axios.put(`https://labficat.herokuapp.com/api/orden/desactivar/${orden._id}`)
                    .then((res) => {
                        console.log(res);
                        this.$swal({
                            icon: "success",
                            title: "Orden desactivada Exitosamente",
                        });
                        this.traerOrdenes()
                    })
                    .catch((err) => {
                        console.log(err);

                        this.$swal({
                            icon: "error",
                            title: "Error al desactivar la orden de servicio",
                        });
                    })
            } else {
                axios.put(`https://labficat.herokuapp.com/api/orden/activar/${orden._id}`)
                    .then((res) => {
                        console.log(res);
                        this.$swal({
                            icon: "success",
                            title: "Orden activada Exitosamente",
                        });
                        this.traerOrdenes()
                    })
                    .catch((err) => {
                        console.log(err);
                        this.$swal({
                            icon: "error",
                            title: "Error al activar la orden de servicio",
                        });
                    })
            }
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
        this.traerOrdenes();
    },
};
</script>

<style scoped>

</style>