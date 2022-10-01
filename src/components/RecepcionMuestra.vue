<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2" class="py-1 " align="center">
        <v-img width="130" height="120"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/1200px-Sena_Colombia_logo.svg.png">
        </v-img>
      </v-col>
      <v-col cols="10" class="mx-0 my-0 py-0 px-0">
        <v-row class="texto">
          <h3>Recepcion Muestras</h3>
        </v-row>
        <v-row class="texto">
          <p class="font-weight-black mb-0">
            CENTRO AGROTURÍSTICO – SAN GIL, SANTANDER <br />
            LABORATORIO LABFICAT
          </p>
        </v-row>
        <v-row class="mx-0 my-0 px-0 py-0">
          <v-col cols="5" class="justificar px-0 py-0">
            <p class="font-weight-black mb-0" style="border: 1px solid black">
              CÓDIGO <br />
              CAT–ST–MI–F–002
            </p>
          </v-col>
          <v-col cols="5 px-0 py-0">
            <p class="justificar font-weight-black mb-0" style="border: 1px solid black">
              APROBACIÓN <br />
              2022-04-01
            </p>
          </v-col>
          <v-col cols="2 px-0 py-0">
            <p class="justificar font-weight-black mb-0" style="border: 1px solid black">
              VERSIÓN: <br />
              2
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        Datos del solicitante
      </h5>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class=" text-center px-0">
            <p for="Name" class="label mb-0 ">
              Solicitante
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="field" v-bind="attrs" v-on="on">
                    <font-awesome-icon icon="fa-solid fa-user" />
                  </v-btn>
                </template>
                <v-card>
                  <v-row>
                    <v-col>
                      <v-card>
                        <v-card-title>
                          Usuarios
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                          <v-text-field label="buscador" v-model="busqueda" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headerUsuarios" :items="buscar" item-text="nombre" item-key="usuarios">
                          <template v-slot:[`item.actions`]="{ item }">
                            <v-icon @click="llenarInfo(item)">
                              mdi-plus
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </p>
            <p for="Name" class="label mb-0 ">NIT/C.C.</p>
            <p for="Name" class="label mb-0 ">Dirección</p>
            <p for="Name" class="label mb-0 ">Ciudad</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field v-model="person.nombre" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.cc" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.direccion" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.ciudad" class="field px-0 py-0 my-0" height="26"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class=" text-center px-0">
            <p for="Name" class="label mb-0 ">Departamento</p>
            <p for="Name" class="label mb-0 ">Contacto</p>
            <p for="Name" class="label mb-0 ">Teléfono</p>
            <p for="Name" class="label mb-0 ">Correo Electrónico</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field v-model ="person.departamento" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.contacto" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.telefono" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.correo" class="field px-0 py-0 my-0" height="26"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        Datos de la Muestra
      </h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" :search="search">
            <template v-slot:footer>
              <v-card class="d-flex justify-end">
              </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" class="py-0 px-0">
        <h5 class=" primary text-center white--text px-0 py-0" style="width: 100%">
          *Observaciones preestablecidas</h5>
      </v-col>
      <v-col cols="4" class="py-0 px-0">
        <h5 class=" primary text-center white--text px-0 py-0" style="width: 100%">
          Condiciones del servicio</h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1" class="px-0 py-0">
        <p class="texto font-weight-black">
          1
        </p>
        <p class="texto font-weight-black">
          2
        </p>
        <p class="texto font-weight-black">
          3
        </p>
        <p class="texto font-weight-black">
          4
        </p>
        <p class="texto font-weight-black">
          5
        </p>
        <p class="texto font-weight-black">
          6
        </p>
        <p class="texto font-weight-black">
          7
        </p>
      </v-col>
      <v-col cols="6" class="px-0 py-0">
        <p class="texto">
          Recipientes de recolección inadecuados.
        </p>
        <p class="texto">
          Envase roto, abierto o agujereado.
        </p>
        <p class="texto">
          Evidencias visibles de microrganismos.
        </p>
        <p class="texto">
          Evidencias de fermentación.
        </p>
        <p class="texto">
          Cantidad de muestra sea insuficiente.
        </p>
        <p class="texto">
          Falta de información o incongruencias en la identificación de los recipientes.
        </p>
        <p class="texto">
          Otro (explique la situación presentada):
        </p>
      </v-col>
      <v-col cols="5" class="texto py-0 px-0 ">
        <p class="servicio mb-0">
          El solicitante al firmar la presente acta de recepción de muestras acepta lo siguiente: <br>
          1. Que a las muestras se le realicen todos los ensayos de acuerdo al ítem de la <br>
          cotización indicado en el presente formato y los mismos sean reportados en el <br>
          respectivo informe de resultados. <br>
          2. Que la totalidad de la información registrada a las muestras sea reportada en el <br>
          respectivo informe de resultados. <br>
          3. Todas las observaciones y anexos descritos en el formato Oferta de servicios CAT– <br>
          ST–OC–F–002 correspondiente a la versión de la cotización aceptada.
        </p>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="2" class=" text-center px-0">
        <p for="Name" class="label mb-0 ">Quien entrega las muestras</p>
        <p for="Name" class="label mb-0 ">C.C.</p>
        <p for="Name" class="label mb-0 ">Firma</p>
      </v-col>
      <v-col cols="5" class="px-0">
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
      </v-col>

      <v-col cols="3" class=" text-center px-0">
        <p for="Name" class="label mb-0 ">Fecha y hora de recepción de muestras</p>
        <p for="Name" class="label mb-0 ">Quien recibe las muestras</p>
        <p for="Name" class="label mb-0 ">Firma</p>
      </v-col>
      <v-col cols="2" class="px-0">
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
  import axios from 'axios'
export default {
  name: "PageRecepcion",
  data: () => ({
    dialog:false,
    search: "",
    headerUsuarios: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "nombre",
      },
      { text: "Rol", value: "rol", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    usuarios:[],
    busqueda:'',
    person:{
      nombre:'',
      cc:'',
      direccion:'',
      ciudad:'',
      departamento:'',
      contacto:'',
      telefono:'',
      correo:'',
      id:''
    },
    headers: [
      {
        text: "Código de Muestra",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Municipio de recolección", },
      { text: "Dirección de toma de muestra", value: "fat" },
      { text: "Lugar de toma de muestra", value: "carbs" },
      { text: "Muestra recolectada por", value: "protein" },
      { text: "Procedimiento de muestreo", value: "iron" },
      { text: "Tipo de muestra" },
      { text: "Matriz de la muestra" },
      { text: "Fecha y hora de recolección" },
      { text: "Cotización" },
      { text: "Ítem de la cotización" },
      { text: "Observaciones*" },
    ],
    desserts: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
    ],
  }),
  computed: {
    buscar() {
      return this.usuarios.filter((user) => {
        const nombre = user.nombre.toLowerCase();
        const documento = user.documento.toLowerCase();
        const busqueda = this.busqueda.toLowerCase();

        return nombre.includes(busqueda) || documento.includes(busqueda);
      });
    },
  },
  methods: {
    traerClientes() {
      axios
        .get("https://labficat.herokuapp.com/api/usuario")
        .then((res) => {
          this.usuarios = res.data.usuario;
          console.log(this.usuarios);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    llenarInfo(user) {
      console.log(user);
      this.person.id = user._id
      this.person.nombre = user.nombre;
      this.person.cc = user.documento;
      this.person.direccion = user.direccion;
      this.person.ciudad = user.ciudad.Ciudad;
      this.person.departamento = user.ciudad.departamento;
      this.person.telefono = user.telefono;
      this.person.contacto = user.contacto;
      this.person.correo = user.correo
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created(){
    this.traerClientes()
  }
};

</script>
<style scoped>
.texto {
  border: 1px solid black;
  text-align: center;
  justify-content: center;
  margin: 0 0;
}

.justificar {
  text-align: center;
  justify-content: center;
}

.label {
  background-color: #ed7d31;
  color: white;
  border: solid 1px black;
}

.field {
  max-height: 26px;
}

.servicio {
  text-align: left;
}

.imagen {
  text-align: center;
}
</style>
