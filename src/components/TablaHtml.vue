<template>
    <div>
        <v-row align="center" >
            <v-col justify="center">
                <table id="tableau" class="table">
                    <thead>
                        <!-- <tr>
                    <h5 class="enca">LISTADO MAESTRO DE MUESTRAS</h5>
                </tr>
                <tr class="enca">
                    <h5 class="enca">CENTRO AGROTURÍSTICO – SAN GIL, SANTANDER</h5>
                </tr>
                <tr >
                    <h5 class="enca">CÓDIGO
                        CAT–ST–MI–F–003
                    </h5>
                    <h5 class="enca">CÓDIGO
                        APROBACIÓN
                        2021-10-25
                    </h5>
                    <h5 class="enca">CÓDIGO
                        VERSIÓN:
                        1
                    </h5>
                </tr> -->
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Documento</th>
                            <th>Edad</th>
                            <th>Contacto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jefferson</td>
                            <td>Becerra</td>
                            <td>11016228584</td>
                            <td>18</td>
                            <td>Sergio Alexander</td>
                        </tr>
                    </tbody>
                </table>
                <v-btn @click="excel">excel</v-btn>
            </v-col>
        </v-row>

    </div>

</template>

<script>
/* import DataTable from ''; */
import XLSX from 'xlsx/dist/xlsx.full.min';

export default {
    name: "pageHtml",
    data() {
        return {
            color: this.$store.state.color
        }
    },
    methods: {
        excel() {
            let workbook = XLSX.utils.table_to_book(document.getElementById("tableau"));
            return XLSX.writeFile(workbook, "tabla" + "." + "xlsx")

        },
        colores() {
            this.color = this.$store.state.color
        }
    },
    created() {
        this.colores() 
    }
}
</script>


<style scoped>
.enca {
    border: solid 2px black;
    width: 1000px;
    text-align: center;
}
</style>