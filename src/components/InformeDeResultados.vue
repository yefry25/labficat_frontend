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
        <h2 class="mt-2 red--text">{{ codMuestra }}</h2>
        <v-row>
          <v-col cols="6">
            <p class="parrafo font-weight-black">
              Fecha y hora de recepción de la muestra:
            </p>
          </v-col>
          <v-col cols="6">
            <p class="parrafo font-weight-black">
              Fecha y hora de emisión del informe de resultados:
            </p>
          </v-col>
        </v-row>
        <v-row class="mx-0 my-0 px-0 py-0">
          <v-col class="px-0 py-0" cols="6">
            <p class="mt-2 red--text">{{ fecha(fechaRecepcionMuestra) }}</p>
          </v-col>
          <v-col class="px-0 py-0" cols="6">
            <p class="mt-2 red--text">AAAA-MM-DD; hh:mm</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" class="text-center">
        <p class="parrafo font-weight-black">
          Código <br />
          {{ informe[0].codigo }}
          <br />
          Aprobación <br />
          {{ informe[0].aprobacion }} <br />
          <br />
          Versión <br />
          {{ informe[0].version }}
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
            <p for="Name" class="label mb-0">Solicitante</p>
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
            <p for="Name" class="label mb-0">Mun de recolección</p>
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
            <v-dialog v-model="dialogEnsayoNuevo" persistent max-width="2000px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="limpiar">
                  Nuevo Ensayo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  Ensayos
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-text-field label="buscador" v-model="busqueda" single-line hide-details></v-text-field>
                </v-card-title>
                <v-data-table :headers="headerOrden" :items="orden" :loading="isLoading"
                  loading-text="Cargando... Por favor espera">
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="black" @click="infoOrden(item)" icon>
                      <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-plus" />
                    </v-btn>
                  </template>
                  <template v-slot:[`item.estado`]="{ item }">
                    <div v-if="item.estado == 1">
                      <b>
                        <span class="blue--text">Activo</span>
                      </b>
                    </div>
                  </template>
                </v-data-table>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-hover v-slot="{ hover }">
                    <v-btn class="ml-5" text @click="close" :style="{ background: hover ? 'red' : '' }">
                      Cerrar
                    </v-btn>
                  </v-hover>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table :headers="headersEnsayo" :items="ensayosMostrar" :search="search">
            <template v-slot:footer>
              <v-card class="d-flex justify-end"> </v-card>
            </template>
            <template v-slot:no-data>
              <h2>No hay información</h2>
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
import axios from "axios";
import { required, email, min, confirmed } from "vee-validate/dist/rules";
import { extend, setInteractionMode } from "vee-validate";
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
extend("confirmed", {
  ...confirmed,
  message: "El campo {_field_} debe coincidir con contraseña",
});
export default {
  name: "PageInforme",
  data: () => ({
    informe: "", //si
    busqueda: "", //si
    dialogCliente: false, //si
    dialogMuestra: false, //si
    dialogEnsayoNuevo: false, //si
    isLoading: true,
    search: null, //si
    usuarios: [],  //si
    orden: [],  //si
    codMuestra: 'XXXX-AAAA',
    fechaRecepcionMuestra: 'AAAA-MM-DD; hh:mm',
    person: {  //si
      nombre: "",
      cc: "",
      direccion: "",
      ciudad: "",
      departamento: "",
      contacto: "",
      telefono: "",
      correo: "",
      id: "",
    },
    muestra: {  //si
      munRecoleccion: "",
      direccionTomaMuestra: "",
      lugarTomaMuestra: "",
      muestraRecolectadaPor: "",
      procedimientoMuestreo: "",
      tipoMuestra: "",
      matrizMuestra: "",
      fechaRecoleccion: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    },
    headerOrden: [  //si
      {
        text: "Codigo de muestra",
        align: "start",
        sortable: false,
        value: "idMuestra.codMuestra",
      },
      { text: "estado", value: "estado", sortable: false },
      { text: "lugar toma muestra", value: "idMuestra.lugarTomaMuestra", sortable: false },

      { text: "muestra recolectada por", value: "idMuestra.muestraRecolectadaPor", sortable: false },
      { text: "item", value: "idMuestra.item", sortable: false },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    headersEnsayo: [ //si
      {
        text: "Fecha de análisis",
        align: "start",
        sortable: false,
      },
      { text: "Ensayo", value: "ensayo", sortable: false },
      { text: "Método", value: "metodo", sortable: false },
      { text: "Técnica", value: "tecnica", sortable: false },
      { text: "Resultado", value: "protein", sortable: false },
      { text: "Incertidumbre expandida", value: "iron", sortable: false },
      {
        text: "Valor Máximo NTC 1311:2009",
        value: "valorMaximo",
        sortable: false,
      },
      {
        text: "Valor Mínimo NTC 1311:2009",
        value: "valorMinimo",
        sortable: false,
      },
      { text: "Unidades", value: "unidades", sortable: false },
    ],
    ensayosMostrar: [],  //si
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
          }
        });
    },
    limpiar() {
      console.log("si: " + this.ensayosMostrar.length);
      if (this.ensayosMostrar.length > 0) {
        this.ensayosMostrar = [];
      }
    },
    infoOrden(orden) {
      axios
        .get(
          `https://labficat.herokuapp.com/api/orden/informeDeResultados/${orden._id}`
        )
        .then((res) => {

          this.$swal({
            icon: "success",
            title: "La información se cargo exitosamente ",
          });
          this.codMuestra = res.data.informe.idMuestra.codMuestra;
          this.fechaRecepcionMuestra = res.data.informe.idMuestra.createdAt
          this.person.nombre = res.data.informe.idMuestra.solicitante.nombre;
          this.person.cc = res.data.informe.idMuestra.solicitante.documento;
          this.person.direccion = res.data.informe.idMuestra.solicitante.direccion;
          this.person.ciudad = res.data.informe.idMuestra.solicitante.ciudad.Ciudad;
          this.person.departamento = res.data.informe.idMuestra.solicitante.ciudad.departamento;
          this.person.contacto = res.data.informe.idMuestra.solicitante.contacto;
          this.person.telefono = res.data.informe.idMuestra.solicitante.telefono;
          this.person.correo = res.data.informe.idMuestra.solicitante.correo;
          this.muestra.munRecoleccion = res.data.informe.idMuestra.munRecoleccion.Ciudad;
          this.muestra.direccionTomaMuestra = res.data.informe.idMuestra.direccionTomaMuestra;
          this.muestra.lugarTomaMuestra = res.data.informe.idMuestra.lugarTomaMuestra;
          this.muestra.muestraRecolectadaPor = res.data.informe.idMuestra.muestraRecolectadaPor;
          this.muestra.procedimientoMuestreo = res.data.informe.idMuestra.procedimientoMuestreo;
          this.muestra.tipoMuestra = res.data.informe.idMuestra.tipoMuestra.tipos;
          this.muestra.matrizMuestra = res.data.informe.idMuestra.matrizMuestra;
          this.muestra.fechaRecoleccion = res.data.informe.idMuestra.fechaRecoleccion;

          for (let i = 0; i < res.data.informe.itemsorden.length; i++) {
            const element = res.data.informe.itemsorden[i];
            console.log(element);
            this.ensayosMostrar.push(element.idensayo);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$swal({
            icon: "error",
            title: "Error al cargar la información",
          });
        });
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
    traerMuestras() {
      axios
        .get(`https://labficat.herokuapp.com/api/orden`)
        .then((res) => {

          for (let i = 0; i < res.data.orden.length; i++) {
            const element = res.data.orden[i];
            if (element.estado == 1) {
              console.log(element);
              this.orden.push(element);
            }

          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);

        });
    },
    traerCalidad() {
      axios
        .post("https://labficat.herokuapp.com/api/calidad/formato", {
          nombre: "Informe de Resultados",
        })
        .then((res) => {
          this.informe = res.data.calidad;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fecha(r) {
      /* let fecha = r.split('T')[0].replace(/-/g, "/")
      console.log(fecha); */
      let d = new Date(r);
      return d.toLocaleDateString() + '-' + d.toLocaleTimeString();
    },
    fechaMuestra(f) {
      let fecha = f.split('T')[0].replace(/-/g, "/")
      return fecha
    },
  },
  created() {
    this.traerClientes();
    this.traerMuestras();
    this.traerCalidad();
  },
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