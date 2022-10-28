<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2" class="py-1" align="center">
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
              {{ formato[0].codigo }}
            </p>
          </v-col>
          <v-col cols="5 px-0 py-0">
            <p class="justificar font-weight-black mb-0" style="border: 1px solid black">
              APROBACIÓN <br />
              {{ formato[0].aprobacion }}
            </p>
          </v-col>
          <v-col cols="2 px-0 py-0">
            <p class="justificar font-weight-black mb-0" style="border: 1px solid black">
              VERSIÓN: <br />
              {{ formato[0].version }}
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
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">
              Solicitante
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn class="field" v-bind="attrs" v-on="on" icon>
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
                          <v-text-field label="buscar por nombre o por rol" v-model="busqueda" single-line hide-details>
                          </v-text-field>
                        </v-card-title>
                        <v-data-table :headers="headerUsuarios" :items="buscar" :loading="myLoading"
                          loading-text="Cargando... Por favor espera">
                          <template v-slot:[`item.actions`]="{ item }">
                            <v-btn @click="llenarInfo(item)" icon>
                              <font-awesome-icon style="font-size: 20px" icon="fa-solid fa-plus" />
                            </v-btn>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-col>
                  </v-row>
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
            </p>
            <p for="Name" class="label mb-0">NIT/C.C.</p>
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
            <p for="Name" class="label mb-0">Correo Electrónico</p>
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
        Datos de la Muestra
      </h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card>
          <v-card-title>
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details>
            </v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogEnsayo" max-width="1000px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="comprobarCotizaciones">
                  Nueva Muestra
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <v-hover v-slot="{ hover }">
                    <v-btn icon @click="close" :style="{ color: hover ? 'red' : '' }">
                      <font-awesome-icon style="fontsize: 20px" icon="fa-solid fa-xmark" />
                    </v-btn>
                  </v-hover>
                  Formulario de muestras
                </v-card-title>

                <validationObserver ref="observer" v-slot="{ invalid }">
                  <form @submit.prevent="submit" class="py-7 px-7">
                    <validation-provider v-slot="{ errors }" name="departamento" rules="required">
                      <v-select v-model="departamento" :items="departa" item-text="departamento" item-key="departa"
                        item-value="_id" :error-messages="errors" outlined label="Departamento"
                        data-vv-name="departamento" @change="traerCiudades(departa)" required></v-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="ciudad" rules="required">
                      <v-select v-model="muestra.ciudad" :items="ciudades" item-text="Ciudad" item-key="ciudades"
                        item-value="_id" :error-messages="errors" outlined label="Ciudad" data-vv-name="ciudad"
                        required></v-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="direccion toma de la muestra" rules="required">
                      <v-text-field v-model="muestra.direccionTomaMuestra" :error-messages="errors"
                        label="Direccion toma de la muestra" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="lugar toma de la muestra" rules="required">
                      <v-text-field v-model="muestra.lugarTomaMuestra" :error-messages="errors"
                        label="lugar toma de la muestra" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="recolectador" rules="required">
                      <v-text-field v-model="muestra.muestraRecolectadaPor" :error-messages="errors"
                        label="recolectador" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="procedimiento de muestreo" rules="required">
                      <v-text-field v-model="muestra.procedimientoMuestreo" :error-messages="errors"
                        label="procedimiento de muestreo" outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="tipo de muestra" rules="required">
                      <v-select v-model="muestra.tipoMuestra" :items="tipoMuestras" item-text="tipos"
                        item-key="tipoMuestras" item-value="_id" :error-messages="errors" outlined
                        label="tipo de muestra" data-vv-name="departamento" required>
                      </v-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="matriz de la muestra" rules="required">
                      <v-text-field v-model="muestra.matrizMuestra" :error-messages="errors" label="matriz muestra"
                        outlined required>
                      </v-text-field>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="fecha recoleccion" rules="required">
                      <v-menu v-model="menu1" :close-on-content-click="false" :nudge-right="40"
                        transition="scale-transition" offset-y min-width="auto" :error-messages="errors">
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="muestra.fechaRecoleccion" prepend-icon="mdi-calendar" readonly
                            class="field px-0 py-0 my-0" height="26" v-bind="attrs" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="muestra.fechaRecoleccion" @input="menu1 = false"></v-date-picker>
                      </v-menu>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="cotizacion" rules="required">
                      <v-select v-model="muestra.cotizacion" :items="cotizacion" item-text="numCotizacion"
                        item-key="cotizacion" item-value="_id" :error-messages="errors" outlined label="cotizacion"
                        data-vv-name="numCotizacion" @change="itemCotizacion(muestra.cotizacion)" required></v-select>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" name="item" rules="required">
                      <v-select v-model="muestra.item" :items="item" :error-messages="errors" outlined label="Item"
                        data-vv-name="item" required></v-select>
                    </validation-provider>
                    <v-btn color="primary" class="mr-4" type="submit" @click="tablaMuestra" :disabled="invalid" rounded>
                      Agregar
                    </v-btn>
                    <!-- <v-dialog v-model="dialogEnsayoModificar" max-width="2000px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid" rounded v-bind="attrs"
                          v-on="on">
                          Modificar muestra
                        </v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <h1>Muestras</h1>
                        </v-card-title>
                        <v-data-table :headers="headers" :items="muestrasDelCliente" :search="search">
                          <template v-slot:[`item.actions`]="{ item }">
                            <v-icon @click="modificarMuestra(item)"> mdi-plus </v-icon>
                          </template>
                        </v-data-table>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">
                            Cerrar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog> -->
                  </form>
                </validationObserver>
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
          <v-data-table :headers="headers" :items="mostrarMuestras" :search="search">
            <template v-slot:footer>
              <v-card class="d-flex justify-end"> </v-card>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn @click="ingresarMuestra" color="primary my-6" class="mr-4" type="submit" rounded
        v-if="this.$store.state.muestraVer == false">
        Registrar muestra
      </v-btn>
      <v-btn @click="modificarMuestra" color="primary my-6" class="mr-4" type="submit" rounded v-else>
        Modificar muestra
      </v-btn>
    </v-row>
    <v-col cols="12" class="py-0 px-0">
      <v-row>
        <v-col cols="12" class="text-center px-0">
          <p for="Name" class="label mb-0">Observaciones</p>
        </v-col>
        <v-col cols="12" class="pl-0 px-0">
          <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
        </v-col>
      </v-row>
    </v-col>
    <v-row>
      <v-col cols="8" class="py-0 px-0">
        <h5 class="primary text-center white--text px-0 py-0" style="width: 100%">
          *Observaciones preestablecidas
        </h5>
      </v-col>
      <v-col cols="4" class="py-0 px-0">
        <h5 class="primary text-center white--text px-0 py-0" style="width: 100%">
          Condiciones del servicio
        </h5>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="1" class="px-0 py-0">
        <p class="texto font-weight-black">1</p>
        <p class="texto font-weight-black">2</p>
        <p class="texto font-weight-black">3</p>
        <p class="texto font-weight-black">4</p>
        <p class="texto font-weight-black">5</p>
        <p class="texto font-weight-black">6</p>
        <p class="texto font-weight-black">7</p>
      </v-col>
      <v-col cols="6" class="px-0 py-0">
        <p class="texto">Recipientes de recolección inadecuados.</p>
        <p class="texto">Envase roto, abierto o agujereado.</p>
        <p class="texto">Evidencias visibles de microrganismos.</p>
        <p class="texto">Evidencias de fermentación.</p>
        <p class="texto">Cantidad de muestra sea insuficiente.</p>
        <p class="texto">
          Falta de información o incongruencias en la identificación de los
          recipientes.
        </p>
        <p class="texto">Otro (explique la situación presentada):</p>
      </v-col>
      <v-col cols="5" class="texto py-0 px-0">
        <p class="servicio mb-0">
          El solicitante al firmar la presente acta de recepción de muestras
          acepta lo siguiente: <br />
          1. Que a las muestras se le realicen todos los ensayos de acuerdo al
          ítem de la <br />
          cotización indicado en el presente formato y los mismos sean
          reportados en el <br />
          respectivo informe de resultados. <br />
          2. Que la totalidad de la información registrada a las muestras sea
          reportada en el <br />
          respectivo informe de resultados. <br />
          3. Todas las observaciones y anexos descritos en el formato Oferta de
          servicios CAT– <br />
          ST–OC–F–002 correspondiente a la versión de la cotización aceptada.
        </p>
      </v-col>
    </v-row>
    <v-row class="my-0">
      <v-col cols="2" class="text-center px-0">
        <p for="Name" class="label mb-0">Quien entrega las muestras</p>
        <p for="Name" class="label mb-0">C.C.</p>
        <p for="Name" class="label mb-0">Firma</p>
      </v-col>
      <v-col cols="5" class="px-0">
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
        <v-text-field class="field px-0 py-0 my-0" height="26"></v-text-field>
      </v-col>

      <v-col cols="3" class="text-center px-0">
        <p for="Name" class="label mb-0">
          Fecha y hora de recepción de muestras
        </p>
        <p for="Name" class="label mb-0">Quien recibe las muestras</p>
        <p for="Name" class="label mb-0">Firma</p>
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
import axios from "axios";
import { required, email, min, confirmed } from "vee-validate/dist/rules";
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
extend("confirmed", {
  ...confirmed,
  message: "El campo {_field_} debe coincidir con contraseña",
});
export default {
  name: "PageRecepcion",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    myLoading: true,
    dialog: false,
    dialogEnsayo: false,
    dialogEnsayoModificar: false,
    loading: false,
    headerUsuarios: [
      {
        text: "Nombre",
        align: "start",
        sortable: true,
        value: "nombre",
      },
      { text: "Rol", value: "rol", sortable: true },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    formato: "",
    usuarios: [],
    departa: [],
    ciudades: [],
    departamento: "",
    tipoMuestras: [],
    cotizacion: [],
    mostrarMuestras: [],
    muestrasDelCliente: [],
    busqueda: "",
    person: {
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

    muestra: {
      ciudad: "",
      direccionTomaMuestra: "",
      lugarTomaMuestra: "",
      muestraRecolectadaPor: "",
      procedimientoMuestreo: "",
      tipoMuestra: "",
      matrizMuestra: "",
      fechaRecoleccion: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      cotizacion: "",
      item: "",
    },
    item: ["Item1"],
    menu1: false,
    headers: [
      /* {
        text: "Código de Muestra",
        align: "start",
        sortable: false,
        value: "codMuestra",
      }, */
      { text: "Municipio de recolección", value: "munRecoleccion" },
      { text: "Dirección de toma de muestra", value: "direccionTomaMuestra" },
      { text: "Lugar de toma de muestra", value: "lugarTomaMuestra" },
      { text: "Muestra recolectada por", value: "muestraRecolectadaPor" },
      { text: "Procedimiento de muestreo", value: "procedimientoMuestreo" },
      /* { text: "Tipo de muestra", value: 'tipoMuestra' }, */
      { text: "Matriz de la muestra", value: "matrizMuestra" },
      { text: "Fecha y hora de recolección", value: "fechaRecoleccion" },
      { text: "Ítem de la cotización", value: "item" },
    ],
  }),

  computed: {
    buscar() {
      return this.usuarios.filter((user) => {
        const nombre = user.nombre.toLowerCase();
        const documento = user.documento.toLowerCase();
        const busqueda = this.busqueda.toLowerCase();
        const rol = user.rol.toLowerCase();

        return (
          nombre.includes(busqueda) ||
          documento.includes(busqueda) ||
          rol.includes(busqueda)
        );
      });
    },
  },
  methods: {
    traerDepartamentos() {
      axios
        .get("https://labficat.herokuapp.com/api/ciudad/departamentos")
        .then((response) => {
          this.departa = response.data.departamentos;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    traerCiudades() {
      axios
        .post("https://labficat.herokuapp.com/api/ciudad/nombreDepartamento", {
          departamento: this.departamento,
        })
        .then((response) => {
          this.ciudades = response.data.ciudades;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    traerTipoMuestras() {
      axios
        .get("https://labficat.herokuapp.com/api/tipoMuestra")
        .then((res) => {
          this.tipoMuestras = res.data.timuestra;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    traerClientes() {
      axios
        .get("https://labficat.herokuapp.com/api/usuario")
        .then((res) => {
          for (let i = 0; i < res.data.usuario.length; i++) {
            const element = res.data.usuario[i];
            if (element.estado == 1) {
              this.usuarios.push(element);
            }
          }
          this.myLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ingresarMuestra() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .post(
          "https://labficat.herokuapp.com/api/muestra",
          {
            solicitante: this.person.id,
            munRecoleccion: this.muestra.ciudad,
            direccionTomaMuestra: this.muestra.direccionTomaMuestra,
            lugarTomaMuestra: this.muestra.lugarTomaMuestra,
            muestraRecolectadaPor: this.muestra.muestraRecolectadaPor,
            procedimientoMuestreo: this.muestra.procedimientoMuestreo,
            tipoMuestra: this.muestra.tipoMuestra,
            matrizMuestra: this.muestra.matrizMuestra,
            fechaRecoleccion: this.muestra.fechaRecoleccion,
            cotizacion: this.muestra.cotizacion,
            item: this.muestra.item,
          },
          header
        )
        .then((res) => {
          console.log(res.data);
          this.$swal({
            icon: "success",
            title: "Registro exitoso de la muestra",
          });
          this.vaciarInformacion();
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
              title: "Error al registrar la muestra",
            });
          }
        });
    },
    modificarMuestra() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://labficat.herokuapp.com/api/muestra/${this.$store.state.muestraEditar._id}`,
          {
            solicitante: this.person.id,
            munRecoleccion: this.muestra.ciudad,
            direccionTomaMuestra: this.muestra.direccionTomaMuestra,
            lugarTomaMuestra: this.muestra.lugarTomaMuestra,
            muestraRecolectadaPor: this.muestra.muestraRecolectadaPor,
            procedimientoMuestreo: this.muestra.procedimientoMuestreo,
            tipoMuestra: this.muestra.tipoMuestra,
            matrizMuestra: this.muestra.matrizMuestra,
            fechaRecoleccion: this.muestra.fechaRecoleccion,
          },
          header
        )
        .then((res) => {
          console.log(res.data.modificar);
          this.$swal({
            icon: "success",
            title: "Actualización de la muestra exitoso",
          });
          this.$store.state.muestraEditar = "";
          this.$store.state.muestraVer = false;
          this.vaciarInformacion();
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
              title: "Error al actualizar la muestra",
            });
          }
        });
    },
    vaciarInformacion() {
      this.mostrarMuestras.splice(0, this.mostrarMuestras.length);
      this.person.id = "";
      this.muestra.ciudad = "";
      this.muestra.direccionTomaMuestra = "";
      this.muestra.lugarTomaMuestra = "";
      this.muestra.muestraRecolectadaPor = "";
      this.muestra.procedimientoMuestreo = "";
      this.muestra.tipoMuestra = "";
      this.muestra.matrizMuestra = "";
      this.muestra.fechaRecoleccion = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.muestra.cotizacion = "";
      this.muestra.item = "";

      this.person.id = "";
      this.person.nombre = "";
      this.person.cc = "";
      this.person.direccion = "";
      this.person.ciudad = "";
      this.person.departamento = "";
      this.person.telefono = "";
      this.person.contacto = "";
      this.person.correo = "";
    },
    infoMuestraEditar() {
      if (this.$store.state.muestraVer == true) {
        this.mostrarMuestras.push(this.$store.state.muestraEditar);

        this.person.id = this.$store.state.muestraEditar.solicitante._id;
        this.person.nombre = this.$store.state.muestraEditar.solicitante.nombre;
        this.person.cc = this.$store.state.muestraEditar.solicitante.documento;
        this.person.direccion = this.$store.state.muestraEditar.solicitante.direccion;
        this.person.ciudad = this.$store.state.muestraEditar.solicitante.ciudad.Ciudad;
        this.person.departamento = this.$store.state.muestraEditar.solicitante.ciudad.departamento;
        this.person.telefono = this.$store.state.muestraEditar.solicitante.telefono;
        this.person.contacto = this.$store.state.muestraEditar.solicitante.contacto;
        this.person.correo = this.$store.state.muestraEditar.solicitante.correo;

        axios
          .post("https://labficat.herokuapp.com/api/cotizacion/cliente", {
            idCliente: this.person.id,
          })
          .then((res) => {
            console.log(res.data.cotizacion);
            this.cotizacion = res.data.cotizacion;
            console.log(this.cotizacion);
          })
          .catch((err) => {
            console.log(err);
          });
        axios
          .post("https://labficat.herokuapp.com/api/muestra/cliente", {
            solicitante: this.person.id,
          })
          .then((res) => {
            this.muestrasDelCliente = res.data.muestra;
            console.log(this.muestrasDelCliente);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    tablaMuestra() {
      this.$swal({
        icon: "success",
        title: `La información de la muestra fue cargada con éxito`,
      });
      this.mostrarMuestras.push({
        solicitante: this.person.id,
        munRecoleccion: this.departamento,
        direccionTomaMuestra: this.muestra.direccionTomaMuestra,
        lugarTomaMuestra: this.muestra.lugarTomaMuestra,
        muestraRecolectadaPor: this.muestra.muestraRecolectadaPor,
        procedimientoMuestreo: this.muestra.procedimientoMuestreo,
        tipoMuestra: this.muestra.tipoMuestra,
        matrizMuestra: this.muestra.matrizMuestra,
        fechaRecoleccion: this.muestra.fechaRecoleccion,
        item: this.muestra.item,
      });
      if (this.$store.state.muestraVer == true) {
        this.mostrarMuestras.splice(this.$store.state.muestraEditar, 1);
      }
    },
    llenarInfo(user) {
      this.person.id = user._id;
      this.person.nombre = user.nombre;
      this.person.cc = user.documento;
      this.person.direccion = user.direccion;
      this.person.ciudad = user.ciudad.Ciudad;
      this.person.departamento = user.ciudad.departamento;
      this.person.telefono = user.telefono;
      this.person.contacto = user.contacto;
      this.person.correo = user.correo;
      axios
        .post("https://labficat.herokuapp.com/api/cotizacion/cliente", {
          idCliente: this.person.id,
        })
        .then((res) => {
          console.log(res.data.cotizacion);
          this.cotizacion = res.data.cotizacion;
          console.log(this.cotizacion);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .post("https://labficat.herokuapp.com/api/muestra/cliente", {
          solicitante: this.person.id,
        })
        .then((res) => {
          this.muestrasDelCliente = res.data.muestra;
          console.log(this.muestrasDelCliente);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    itemCotizacion(cotizacion) {
      axios
        .get(
          `https://labficat.herokuapp.com/api/cotizacion/idCotizacion/${cotizacion}`
        )
        .then((res) => {
          console.log(res.data.cotizacion);

          if (res.data.cotizacion.items.item2.itemsEnsayo.length > 0) {
            this.item.push("item2");
          }
          if (res.data.cotizacion.items.item2.itemsEnsayo.length > 0) {
            this.item.push("item3");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    comprobarCotizaciones() {
      axios
        .post("https://labficat.herokuapp.com/api/cotizacion/cliente", {
          idCliente: this.person.id,
        })
        .then((res) => {
          console.log(res.data.cotizacion);
          if (res.data.cotizacion.length > 0) {
            this.$swal({
              icon: "success",
              title: `El usuario ${this.person.nombre} tiene cotizaciones a su nombre`,
            });
          } else {
            this.$swal({
              icon: "error",
              title: `El usuario ${this.person.nombre} no tiene cotizaciones, proceda a crear una cotización`,
            });
          }
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
    close() {
      this.dialog = false;
      this.dialogEnsayo = false;
      this.dialogEnsayoModificar = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    traerCalidad() {
      axios
        .post("https://labficat.herokuapp.com/api/calidad/formato", {
          nombre: "Recepción de Muestras",
        })
        .then((res) => {
          console.log(res.data.calidad);
          this.formato = res.data.calidad;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.traerClientes();
    this.traerDepartamentos();
    this.traerTipoMuestras();
    this.infoMuestraEditar();
    this.traerCalidad();
  },
  mounted() { },
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
