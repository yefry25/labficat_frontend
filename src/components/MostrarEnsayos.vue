<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-actions>
                        <h2>Ensayos</h2>
                        <v-spacer></v-spacer>
                        <v-btn class="primary" to="ensayo">Agregar ensayos</v-btn>
                    </v-card-actions>
                    <v-data-table :headers="headerEnsayo" :items="ensayos" :loading="myLoading"
                        loading-text="Cargando... Por favor espera">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-row>
                                <v-btn icon @click="editar(item)">
                                    <font-awesome-icon style="font-size:20px" icon="fa-solid fa-file-pen" />
                                </v-btn>
                            </v-row>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>

        <!-- dialog -->

        <v-row>
            <v-col>
                <v-dialog v-model="dialogEditar" max-width="1000px">
                    <v-card>
                        <v-toolbar-title color="orange">
                            <v-avatar @click="close">
                                <v-icon>mdi-close</v-icon>
                            </v-avatar>
                            <span>Agregar nuevo formato</span>
                        </v-toolbar-title>
                        <validationObserver ref="observer" v-slot="{ invalid }">
                            <form @submit.prevent="submit" class="py-7 px-7">
                                <validation-provider v-slot="{ errors }" name="ensayo" rules="required">
                                    <v-text-field v-model="ensayo" :error-messages="errors" label="Ensayo" outlined
                                        required></v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="metodo" rules="required">
                                    <v-text-field v-model="metodo" :error-messages="errors" label="Metodo" outlined
                                        required>
                                    </v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="tecnica" rules="required">
                                    <v-text-field v-model="tecnica" :error-messages="errors" label="Técnica" type="text"
                                        outlined required>
                                    </v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="valor mínimo" rules="required">
                                    <v-text-field v-model="valorMinimo" :error-messages="errors" label="Valor Mínimo"
                                        type="number" outlined required>
                                    </v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="valor maximo" rules="required">
                                    <v-text-field v-model="valorMaximo" :error-messages="errors" label="Valor Máximo"
                                        type="number" outlined required>
                                    </v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="unidades" rules="required">
                                    <v-text-field v-model="unidades" :error-messages="errors" label="Unidades"
                                        type="number" outlined required>
                                    </v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="costo" rules="required">
                                    <v-text-field v-model="costo" :error-messages="errors" label="Costo" type="number"
                                        outlined required>
                                    </v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="descripcion" rules="required">
                                    <v-text-field v-model="descripcion" :error-messages="errors" label="Descripción"
                                        outlined required>
                                    </v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="limite cuantificación" rules="required">
                                    <v-text-field v-model="limiteCuantificacion" :error-messages="errors" type="number"
                                        label="Límite cuantificación" outlined required>
                                    </v-text-field>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="titular" rules="required">
                                    <v-autocomplete v-model="responsables.titular" :error-messages="errors"
                                        :items="usuarios" item-text="nombre" item-value="._id" dense filled
                                        label="Titular"></v-autocomplete>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" name="suplente" rules="required">
                                    <v-autocomplete v-model="responsables.suplente" :error-messages="errors"
                                        :items="usuarios" item-text="nombre" item-value="._id" dense filled
                                        label="Suplente"></v-autocomplete>
                                </validation-provider>
                                <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded block
                                    @click="editarEnsayo">
                                    Registrar
                                </v-btn>
                            </form>
                        </validationObserver>
                    </v-card>
                </v-dialog>
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
    name: 'pageMostrarEnsayo',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            myLoading: true,
            dialogEditar: false,
            idEnsayo: '',
            ensayos: [],
            headerEnsayo: [
                {
                    text: "Ensayo",
                    align: "start",
                    sortable: false,
                    value: "ensayo",
                },
                { text: "Método", value: "metodo", sortable: false },
                { text: "Técnica", value: "tecnica", sortable: false },
                { text: "Valor mínimo", value: "valorMinimo", sortable: false },
                { text: "Valor maximo", value: "valorMaximo", sortable: false },
                { text: "Unidades", value: "unidades", sortable: false },
                { text: "Costo", value: "costo", sortable: false },
                { text: "Estado", value: "estado", sortable: false },
                { text: "Descripción", value: "descripcion", sortable: false },
                { text: "Límite cuantificación", value: "limiteCuantificacion", sortable: false },
                { text: "Acciones", value: "actions", sortable: false },
            ],
            ensayo: '',
            metodo: '',
            tecnica: '',
            valorMinimo: null,
            valorMaximo: null,
            unidades:null,
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
        traerEnsayos() {
            axios.get('https://labficat.herokuapp.com/api/ensayo')
                .then((res) => {
                    this.ensayos = res.data.ensayos
                    this.myLoading = false
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        editarEnsayo() {
            axios.put(`https://labficat.herokuapp.com/api/ensayo/${this.idEnsayo}`, {
                ensayo: this.ensayo,
                metodo: this.metodo,
                tecnica: this.tecnica,
                valorMinimo: this.valorMinimo,
                valorMaximo: this.valorMaximo,
                unidades:this.unidades,
                costo: this.costo,
                descripcion: this.descripcion,
                limiteCuantificacion: this.limiteCuantificacion,
                responsables: this.responsables,
            })
                .then((res) => {
                    console.log(res.data.modificar);
                    this.traerEnsayos()
                    this.$swal({
                        icon: "success",
                        title: "Registro exitoso",
                        text: `Ensayo modificado exitosamente`,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    this.$swal({
                        icon: "error",
                        title: "Error al modificar el ensayo",
                    });
                })
        },
        editar(ensayo) {
            console.log(ensayo);
            this.dialogEditar = true
            this.idEnsayo = ensayo._id
            this.ensayo = ensayo.ensayo,
            this.metodo = ensayo.metodo,
            this.tecnica = ensayo.tecnica,
            this.valorMinimo = null,
            this.valorMaximo = null,
            this.costo = ensayo.costo,
            this.descripcion = ensayo.descripcion,
            this.limiteCuantificacion = ensayo.limiteCuantificacion
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
        close() {

            this.dialogEditar = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
    },
    created() {
        this.traerEnsayos();
        this.traerUsuarios();
    }
}
</script>