<template>
  <v-container fluid style="height: 100%">
    <v-row>
      <v-col cols="2">
        <v-img width="164" height="162"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/1200px-Sena_Colombia_logo.svg.png">
        </v-img>
      </v-col>
      <v-col cols="5" class="texto">
        <h2 class="mt-0 text-decoration-underline">Informe de resultados</h2>
        <p class="parrafo font-weight-black">
          Laboratorio de Caracterización Fisicoquímica de Alimentos del Centro
          Agroturístico <br />
          “LABFICAT” de San Gil, Santander <br />
          899.999.034 <br />
          Dirección: Calle 22 No. 09 – 82, San Gil, Santander <br />
          Teléfono: (607) 7248113 <br />
          Correo electrónico: labficat@sena.edu.co Agroturístico
        </p>
      </v-col>
      <v-col cols="3" class="texto">
        <h2 class="mt-0 text-decoration-underline">Informe de resultados</h2>
        <h2 class="mt-2 red--text">XXXX-AAAA</h2>
        <v-row>
          <v-col cols="6">
            <p class="parrafo font-weight-black">Fecha y hora de recepción de la muestra:</p>
          </v-col>
          <v-col cols="6">
            <p class="parrafo font-weight-black">Fecha y hora de emisión del informe de resultados:</p>
          </v-col>
        </v-row>
        <v-row class="mx-0 my-0 px-0 py-0">
          <v-col class="px-0 py-0" cols="6">
            <p class="mt-2 red--text">AAAA-MM-DD; hh:mm</p>
          </v-col>
          <v-col class="px-0 py-0" cols="6">
            <p class="mt-2 red--text">AAAA-MM-DD; hh:mm</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" class="text-center">
        <p class="parrafo font-weight-black">
          Código <br />
          CAT–ST–OC–F–002 <br> <br />
          Aprobación <br />2022-04-01 <br> <br />
          Versión <br />
          2
        </p>
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
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">
              Solicitante
              <v-dialog v-model="dialogCliente" persistent max-width="1000px">
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
                    <v-btn color="blue darken-1" text @click="close">
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </p>
            <p for="Name" class="label mb-0">NIT / C.C.</p>
            <p for="Name" class="label mb-0">Dirección</p>
            <p for="Name" class="label mb-0">Ciudad</p>
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
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">Departamento</p>
            <p for="Name" class="label mb-0">Contacto</p>
            <p for="Name" class="label mb-0">Teléfono</p>
            <p for="Name" class="label mb-0">Correo electrónico</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field v-model="person.departamento" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.contacto" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.telefono" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="person.correo" class="field px-0 py-0 my-0" height="26"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        Datos de la muestra
      </h5>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">
              Mun de recolección
              <v-dialog v-model="dialogMuestra" persistent max-width="2000px">
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
                          Muestras
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                          <v-text-field label="buscador" v-model="busqueda" single-line hide-details></v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headerMuestras" :items="muestrasDelCliente" item-text="nombre"
                          item-key="usuarios">
                          <template v-slot:[`item.actions`]="{ item }">
                            <v-icon @click="llenarInfoMuestra(item)">
                              mdi-plus
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </p>
            <p for="Name" class="label mb-0">Dirección de toma de muestra</p>
            <p for="Name" class="label mb-0">Lugar de toma de muestra</p>
            <p for="Name" class="label mb-0">Muestra recolectada por</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field v-model="muestra.munRecoleccion" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="muestra.direccionTomaMuestra" class="field px-0 py-0 my-0" height="26">
            </v-text-field>
            <v-text-field v-model="muestra.lugarTomaMuestra" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="muestra.muestraRecolectadaPor" class="field px-0 py-0 my-0" height="26">
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">Procedimiento de muestreo</p>
            <p for="Name" class="label mb-0">Tipo de muestra</p>
            <p for="Name" class="label mb-0">Matriz de la muestra</p>
            <p for="Name" class="label mb-0">Fecha y hora de recolección</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field v-model="muestra.procedimientoMuestreo" class="field px-0 py-0 my-0" height="26">
            </v-text-field>
            <v-text-field v-model="muestra.tipoMuestra" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="muestra.matrizMuestra" class="field px-0 py-0 my-0" height="26"></v-text-field>
            <v-text-field v-model="muestra.fechaRecoleccion" class="field px-0 py-0 my-0" height="26"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        Análisis de la muestra
      </h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogEnsayoNuevo" max-width="2000px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Nuevo Ensayo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <h1>ensayos</h1>
                </v-card-title>
                <validationObserver ref="observer" v-slot="{ invalid }">
                  <form @submit.prevent="submit" class="py-7 px-7">
                    <validation-provider v-slot="{ errors }" name="ensayo" rules="required">
                      <v-text-field v-model="ensayos.ensayo" :error-messages="errors"
                        label="Ensayo" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="metodo" rules="required">
                      <v-text-field v-model="ensayos.metodo" :error-messages="errors"
                        label="Metodo" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="tecnica" rules="required">
                      <v-text-field v-model="ensayos.tecnica" :error-messages="errors"
                        label="Tecnica" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="valor minimo" rules="required">
                      <v-text-field v-model="ensayos.valorMinimo" :error-messages="errors"
                        label="Valor mínimo" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="valor maximo" rules="required">
                      <v-text-field v-model="ensayos.valorMaximo" :error-messages="errors"
                        label="Valor máximo" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="costo" rules="required">
                      <v-text-field v-model="ensayos.costo" :error-messages="errors"
                        label="Costo" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="descripcion" rules="required">
                      <v-text-field v-model="ensayos.descripcion" :error-messages="errors"
                        label="Descripcion" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="limite cuantificacion" rules="required">
                      <v-text-field v-model="ensayos.limiteCuantificacion" :error-messages="errors"
                        label="Limite cuantificacion" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider>
                      <template>
                        <v-autocomplete v-model="ensayos.titular" :items="usuarios" :loading="isLoading" :search-input.sync="search"
                          chips clearable hide-details hide-selected item-text="nombre"  item-value="_id" label="titular"
                          solo></v-autocomplete>
                      </template>
                    </validation-provider>
                    <validation-provider>
                      <template>
                        <v-autocomplete v-model="ensayos.suplente" :items="usuarios" :loading="isLoading" :search-input.sync="search"
                          chips clearable hide-details hide-selected item-text="nombre"  item-value="_id" label="suplente"
                          solo></v-autocomplete>
                      </template>
                    </validation-provider>
                    <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded
                      @click="ensayoNuevo"
                      >
                      Registrar muestra
                    </v-btn>
                  </form>
                </validationObserver>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table :headers="headers" :items="desserts" :search="search">
            <template v-slot:footer>
              <v-card class="d-flex justify-end"> </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row margin="12">
      <h5 class="primary text-center white--text px-0 py-0" style="width: 100%">
        Observaciones
      </h5>
    </v-row>
    <v-row>
      <v-col cols="12" class="pl-0 px-0 py-3 my-4">
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios"
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
  name: "PageInforme",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    searchh: "",
    busqueda: '',
    dialogCliente: false,
    dialogMuestra: false,
    dialogEnsayoNuevo: false,
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null,
    usuarios: [],
    person: {
      nombre: '',
      cc: '',
      direccion: '',
      ciudad: '',
      departamento: '',
      contacto: '',
      telefono: '',
      correo: '',
      id: ''
    },
    muestra: {
      munRecoleccion: '',
      direccionTomaMuestra: '',
      lugarTomaMuestra: '',
      muestraRecolectadaPor: '',
      procedimientoMuestreo: '',
      tipoMuestra: '',
      matrizMuestra: '',
      fechaRecoleccion: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    },
    headerMuestras: [
      {
        text: "Código de Muestra",
        align: "start",
        sortable: false,
        value: "codMuestra",
      },
      { text: "Municipio de recolección", value: 'munRecoleccion.departamento' },
      { text: "Dirección de toma de muestra", value: "direccionTomaMuestra" },
      { text: "Lugar de toma de muestra", value: "lugarTomaMuestra" },
      { text: "Muestra recolectada por", value: "muestraRecolectadaPor" },
      { text: "Procedimiento de muestreo", value: "procedimientoMuestreo" },
      { text: "Tipo de muestra", value: 'tipoMuestra.tipos' },
      { text: "Matriz de la muestra", value: "matrizMuestra" },
      { text: "Fecha y hora de recolección", value: 'fechaRecoleccion' },
      { text: "Cotización", value: "cotizacion" },
      { text: "Ítem de la cotización", value: 'item' },
      { text: "Observaciones*" },
      { text: 'Acciones', value: 'actions' }
    ],
    muestrasDelCliente: [],
    ensayos:{
      ensayo:'',
      metodo:'',
      tecnica:'',
      valorMinimo:'',
      valorMaximo:'',
      costo:null,
      descripcion:'',
      limiteCuantificacion:null,
      titular:'',
      suplente:''
    },
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
    headers: [
      {
        text: "Fecha de análisis",
        align: "start",
        sortable: false,
      },
      { text: "Ensayo", value: "ensayo" },
      { text: "Método", value: "metodo" },
      { text: "Técnica", value: "tecnica" },
      { text: "Resultado", value: "protein" },
      { text: "Incertidumbre expandida", value: "iron" },
      { text: "Valor Máximo NTC 1311:2009", value: "valorMaximo" },
      { text: "Valor Mínimo NTC 1311:2009", value: "valorMinimo" },
      { text: "Unidades", value: "unidades"},
    ],
    desserts: [
      {
        name: "Cenizas",
        metodo: "NTC 570:2012. NTC 1311:2009.",
        tecnica: "Gravimetría",
        valormaximo: "N.A.",
        valorminimo: "0,8",
        unidades: "fracción en masa en %",
      },
      {
        name: "Humedad",
        metodo: "NTC 572:2012. AOAC 925.45. NTC 1311:2009.",
        tecnica: "Gravimetría",
        valormaximo: "9,0",
        valorminimo: "N.A.",
        unidades: "fracción en masa en %"
      },
      {
        name: "° Brix",
        metodo: "ISO 2173:2003",
        tecnica: "Refractometría-Sacarosa",
        valormaximo: "N.A.",
        valorminimo: "N.A."
      },
      {
        name: "grasas",
        metodo: "AOAC 920.39 C. NTC 1311:2009.",
        tecnica: "Gravimetría",
        valormaximo: "N.A.",
        valorminimo: "N.A.",
      },
      {
        name: "Fenoles Totales",
        metodo: "Folin, O., Ciocalteu, V. (1927).Folin, O., Denis, W. (1912).",
        tecnica: "Espectrofotometría Uv-Vis.λ = 760 nm",
        valormaximo: "N.A.",
        valorminimo: "N.A.",
      },
      {
        name: "Sacarosa",
        metodo: "ISO 10504:2013",
        tecnica: "Cromatografía HPLC-RID",
        valormaximo: "93,0",
        valorminimo: "N.A.",
      },
      {
        name: "Glucosa",
        metodo: "ISO 10504:2013",
        tecnica: "Cromatografía HPLC-RID",
        valormaximo: "N.A.",
        valorminimo: "N.A.",
      },
      {
        name: "Fructosa",
        metodo: "ISO 10504:2013",
        tecnica: "Cromatografía HPLC-RID",
        valormaximo: "N.A.",
        valorminimo: "N.A.",
      },
      {
        name: "Azúcares Reductores (Glucosa + Fructosa)",
        metodo: "Calculado a partir del contenido de glucosa y fructosa.",
        tecnica: "Calculado, a partir de datos obtenidos con Cromatografía HPLC-RID",
        valormaximo: "N.A.",
        valorminimo: "5,0",
      },
      {
        name: "Azúcares Totales (Sacarosa + Glucosa + Fructosa)",
        metodo: "Calculado a partir del contenido de sacarosa,  glucosa y fructosa.",
        tecnica: "Calculado, a partir de datos obtenidos con Cromatografía HPLC-RID",
        valormaximo: "N.A.",
        valorminimo: "N.A.",
        iron: "7%",
      },
    ],
  }),
  watch: {
    model (val) {
        if (val != null) this.tab = 0
        else this.tab = null
      },
      search () {
        // Items have already been loaded
        if (this.items.length > 0) return
      }
  },
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


      axios.post(`https://labficat.herokuapp.com/api/muestra/cliente`, {
        solicitante: this.person.id
      })
        .then((res) => {
          console.log(res.data.muestra);
          this.muestrasDelCliente = res.data.muestra
        })
        .catch((err) => {
          console.log(err);
        })
    },
    llenarInfoMuestra(muestra) {
      this.muestra.munRecoleccion = muestra.munRecoleccion.departamento,
        this.muestra.direccionTomaMuestra = muestra.direccionTomaMuestra,
        this.muestra.lugarTomaMuestra = muestra.lugarTomaMuestra,
        this.muestra.muestraRecolectadaPor = muestra.muestraRecolectadaPor,
        this.muestra.procedimientoMuestreo = muestra.procedimientoMuestreo,
        this.muestra.tipoMuestra = muestra.tipoMuestra.tipos,
        this.muestra.matrizMuestra = muestra.matrizMuestra,
        this.muestra.fechaRecoleccion = muestra.fechaRecoleccion
    },
    ensayoNuevo(){
      axios.post('https://labficat.herokuapp.com/api/ensayo',{
        ensayo:this.ensayos.ensayo,
        metodo:this.ensayos.metodo,
        tecnica:this.ensayos.tecnica,
        valorMinimo:this.ensayos.valorMinimo,
        valorMaximo:this.ensayos.valorMaximo,
        costo:this.ensayos.costo,
        descripcion:this.ensayos.descripcion,
        limiteCuantificacion:this.ensayos.limiteCuantificacion,
        responsables:{
          titular:this.ensayos.titular,
          suplente:this.ensayos.suplente
        }
      })
      .then((res)=>{
        console.log(res.data.ensayos)
        this.$swal({
            icon: "success",
            title: "Ensayo registrado exitosamente",
          });
      })
      .catch((err)=>{
        console.log(err)
        this.$swal({
            icon: "error",
            title: "Error al registrar el ensayo",
          });
      })
    },
    close() {
      this.dialogCliente = false;
      this.dialogMuestra = false;
      this.dialogEnsayoNuevo = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
  created() {
    this.traerClientes()
  }
};
</script>
<style scoped>
.texto {
  text-align: center;
}

.label {
  background-color: #ed7d31;
  color: white;
  border: solid 1px black;
}

.field {
  max-height: 26px;
}
</style>