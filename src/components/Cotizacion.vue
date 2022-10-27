<template>
  <v-container fluid style="height: 100%">
    <v-row>
      <v-col cols="2">
        <v-img
          width="164"
          height="162"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sena_Colombia_logo.svg/1200px-Sena_Colombia_logo.svg.png"
        >
        </v-img>
      </v-col>
      <v-col cols="6" class="texto">
        <h2 class="mt-0 text-decoration-underline">Oferta de servicios</h2>
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
      <v-col cols="2" class="text-center">
        <h3 class="mt-0 font-weight-black">cotización No.</h3>
        <h2 class="mt-2 red--text">{{ numeroCotizacion }}</h2>
        <h3 class="mt-2 font-weight-black">fecha de emisión:</h3>
        <h2 class="mt-2 red--text">{{ this.fechaEmision }}</h2>
      </v-col>
      <v-col cols="2" class="codigo font-weight-black">
        <p>
          Código <br />
          {{ formato[0].codigo }}
        </p>
        <p>
          Aprobación <br />
          {{ formato[0].aprobacion }}
        </p>
        <p>
          Versión <br />
          {{ formato[0].version }}
        </p>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        1. Datos del cliente
      </h5>
    </v-row>
    <v-row>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class="text-center px-0">
            <p for="Name" class="label mb-0">
              Clientes
              <v-dialog v-model="dialogo" persistent max-width="600px">
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
                          <v-text-field
                            label="Buscar por nombre o por rol"
                            v-model="busqueda"
                            single-line
                            hide-details
                          >
                          </v-text-field>
                          <v-divider class="mx-4" inset vertical></v-divider>
                          <v-spacer></v-spacer>
                          <v-dialog
                            v-model="dialogUser"
                            max-width="1000px"
                            persistent
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                class="primary"
                                v-bind="attrs"
                                v-on="on"
                                @click="traerDepartamentos"
                                >Agregar usuario</v-btn
                              >
                            </template>
                            <v-card outlined>
                              <v-card-title>
                                <v-hover v-slot="{ hover }">
                                  <v-btn
                                    icon
                                    @click="close"
                                    :style="{ color: hover ? 'red' : '' }"
                                  >
                                    <font-awesome-icon
                                      style="fontsize: 20px"
                                      icon="fa-solid fa-xmark"
                                    />
                                  </v-btn>
                                </v-hover>
                                Formulario registro de usuarios
                              </v-card-title>
                              <validation-observer
                                ref="observer"
                                v-slot="{ invalid }"
                              >
                                <form
                                  @submit.prevent="submit"
                                  class="py-7 px-7"
                                >
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="tipo de persona"
                                    rules="required"
                                  >
                                    <v-select
                                      v-model="select"
                                      :items="items"
                                      :error-messages="errors"
                                      outlined
                                      label="Tipo de persona"
                                      data-vv-name="tipo de persona"
                                      required
                                    ></v-select>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="nombre"
                                    rules="required"
                                  >
                                    <v-text-field
                                      v-model="nombre"
                                      :error-messages="errors"
                                      label="Nombre"
                                      outlined
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="documento"
                                    rules="required"
                                  >
                                    <v-text-field
                                      v-model="documento"
                                      :error-messages="errors"
                                      label="Documento"
                                      outlined
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="dirección"
                                    rules="required"
                                  >
                                    <v-text-field
                                      v-model="direccion"
                                      :error-messages="errors"
                                      label="Dirección"
                                      outlined
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="departamento"
                                    rules="required"
                                  >
                                    <v-select
                                      v-model="departamento"
                                      :items="departa"
                                      item-text="departamento"
                                      item-key="departa"
                                      item-value="_id"
                                      :error-messages="errors"
                                      outlined
                                      label="Departamento"
                                      data-vv-name="departamento"
                                      @change="traerCiudades(departa)"
                                      required
                                    ></v-select>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="ciudad"
                                    rules="required"
                                  >
                                    <v-select
                                      v-model="ciudad"
                                      :items="ciudades"
                                      item-text="Ciudad"
                                      item-key="ciudades"
                                      item-value="_id"
                                      :error-messages="errors"
                                      outlined
                                      label="Cuidad"
                                      data-vv-name="ciudad"
                                      required
                                    ></v-select>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="contacto"
                                    rules="required"
                                  >
                                    <v-text-field
                                      v-model="contacto"
                                      :error-messages="errors"
                                      label="Contacto"
                                      outlined
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="teléfono del contacto"
                                    rules="required"
                                  >
                                    <v-text-field
                                      v-model="celularContacto"
                                      :error-messages="errors"
                                      label="Telefono contacto"
                                      outlined
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="teléfono"
                                    rules="required"
                                  >
                                    <v-text-field
                                      v-model="telefono"
                                      :error-messages="errors"
                                      label="Teléfono"
                                      outlined
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="Email"
                                    rules="required|email"
                                  >
                                    <v-text-field
                                      v-model="email"
                                      :error-messages="errors"
                                      label="E-mail"
                                      prepend-icon="mdi-email"
                                      outlined
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="contraseña"
                                    vid="password"
                                    :rules="{ required: true, min: 8 }"
                                  >
                                    <v-text-field
                                      v-model="password"
                                      :error-messages="errors"
                                      label="Contraseña"
                                      type="password"
                                      outlined
                                      prepend-icon="mdi-lock"
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="confirmar contraseña"
                                    rules="required|confirmed:password"
                                  >
                                    <v-text-field
                                      v-model="confirmation"
                                      :error-messages="errors"
                                      label="confirmar contraseña"
                                      outlined
                                      type="password"
                                      required
                                    ></v-text-field>
                                  </validation-provider>
                                  <validation-provider
                                    v-slot="{ errors }"
                                    name="rol"
                                    rules="required"
                                  >
                                    <v-select
                                      v-model="roll"
                                      :items="roles"
                                      :error-messages="errors"
                                      outlined
                                      label="Roles"
                                      data-vv-name="roles"
                                      required
                                    ></v-select>
                                  </validation-provider>
                                  <v-btn
                                    color="primary"
                                    class="mr-4"
                                    type="submit"
                                    :disabled="invalid"
                                    rounded
                                    block
                                    @click="registrar"
                                  >
                                    Registrar
                                  </v-btn>
                                </form>
                              </validation-observer>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-hover v-slot="{ hover }">
                                  <v-btn
                                    class="ml-5"
                                    text
                                    @click="close"
                                    :style="{ background: hover ? 'red' : '' }"
                                  >
                                    Cerrar
                                  </v-btn>
                                </v-hover>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-card-title>
                        <v-data-table
                          :headers="headers"
                          :items="buscar"
                          :loading="myLoading"
                          loading-text="Cargando... Por favor espera"
                        >
                          <template v-slot:[`item.actions`]="{ item }">
                            <v-btn color="black" @click="llenarInfo(item)" icon>
                              <font-awesome-icon
                                style="font-size: 20px"
                                icon="fa-solid fa-user-plus"
                              />
                            </v-btn>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-hover v-slot="{ hover }">
                      <v-btn
                        class="ml-5"
                        text
                        @click="close"
                        :style="{ background: hover ? 'red' : '' }"
                      >
                        Cerrar
                      </v-btn>
                    </v-hover>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </p>
            <p for="Name" class="label mb-0">Dirección</p>
            <p for="Name" class="label mb-0">Departamento</p>
            <p for="Name" class="label mb-0">Contacto</p>
            <p for="Name" class="label mb-0">Celular</p>
            <p for="Name" class="label mb-0">Validez de la oferta</p>
            <p for="Name" class="label mb-0">Elaborado por</p>
          </v-col>

          <v-col cols="8" class="pl-0">
            <v-text-field
              v-model="person.nombre"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              v-model="person.direccion"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              v-model="person.departamento"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              v-model="person.contacto"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              v-model="person.celularContacto"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>

            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="validezOferta"
                  prepend-icon="mdi-calendar"
                  readonly
                  class="field px-0 py-0 my-0"
                  height="26"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="validezOferta"
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="person.elaborador"
              class="field pl-1 px-0 py-0 my-0"
              height="26"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="6" class="py-0 px-0">
        <v-row>
          <v-col cols="4" class="text-center pr-0">
            <p for="Name" class="label mb-0">NIT / C.C.</p>
            <p for="Name" class="label mb-0">Ciudad</p>
            <p for="Name" class="label mb-0">Teléfono</p>
            <p for="Name" class="label mb-0">Cargo</p>
            <p for="Name" class="label mb-0">Correo electrónico</p>
            <p for="Name" class="label mb-0">Entrega de resultados</p>
            <p for="Name" class="label mb-0">Cargo</p>
          </v-col>
          <v-col cols="8" class="pl-0">
            <v-text-field
              v-model="person.cc"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              v-model="person.ciudad"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              v-model="person.telefono"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              v-model="person.cargo"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-text-field
              v-model="person.correoContacto"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="entregaResultados"
                  prepend-icon="mdi-calendar"
                  readonly
                  class="field px-0 py-0 my-0"
                  height="26"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="entregaResultados"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="person.cargoElaborador"
              class="field pl-1 py-0 my-0"
              height="26"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center white--text" style="width: 100%">
        2. Propuesta técnica y económica
      </h5>
    </v-row>
    <v-row id="border">
      <h5 class="primary text-center white--text" style="width: 100%">
        Item 1
      </h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card>
          <v-card-title>
            Ensayos
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              label="buscador"
              v-model="search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="1000px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  ENSAYOS
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  >
                  </v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="encabezadoEnsayo"
                  :items="ensayos1"
                  :search="search"
                  item-key="ensayos"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="black" @click="ensayoCotizacion(item)" icon>
                      <font-awesome-icon
                        style="font-size: 20px"
                        icon="fa-solid fa-plus"
                      />
                    </v-btn>
                  </template>
                </v-data-table>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table :headers="encabezado" :items="primerItem">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="eliminarCotizacion1(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row id="border">
      <h5 class="primary text-center white--text" style="width: 100%">
        Item 2
      </h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card>
          <v-card-title>
            Ensayos
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              label="buscador"
              v-model="search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogItem2" max-width="1000px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  ENSAYOS
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  >
                  </v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="encabezadoEnsayo"
                  :items="ensayos2"
                  :search="search"
                  item-key="ensayos"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="black" @click="ensayoCotizacion2(item)" icon>
                      <font-awesome-icon
                        style="font-size: 20px"
                        icon="fa-solid fa-plus"
                      />
                    </v-btn>
                  </template>
                </v-data-table>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table :headers="encabezado" :items="segundoItem">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="eliminarCotizacion2(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row id="border">
      <h5 class="primary text-center white--text" style="width: 100%">
        Item 3
      </h5>
    </v-row>
    <v-row>
      <v-col class="px-0 py-0">
        <v-card>
          <v-card-title>
            Ensayos
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              label="buscador"
              v-model="search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialogItem3" max-width="1000px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  ENSAYOS
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  >
                  </v-text-field>
                </v-card-title>
                <v-data-table
                  :headers="encabezadoEnsayo"
                  :items="ensayos3"
                  :search="search"
                  item-key="ensayos"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-btn color="black" @click="ensayoCotizacion3(item)" icon>
                      <font-awesome-icon
                        style="font-size: 20px"
                        icon="fa-solid fa-plus"
                      />
                    </v-btn>
                  </template>
                </v-data-table>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cerrar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-data-table :headers="encabezado" :items="tercerItem">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon @click="eliminarCotizacion3(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
        class="ml-4 my-6 primary"
        @click="cotizacion"
        v-if="this.$store.state.cotizacionVer == false"
      >
        subir cotización
      </v-btn>
      <v-btn class="ml-4 my-6" @click="modificarCotizacion" v-else>
        editar cotización
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="observacion"
        class="pr-2 my-6 py-0"
        label="Observaciones"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="descuento"
        class="pr-2 my-6 py-0"
        type="number"
        label="Descuento Global"
      ></v-text-field>
    </v-row>
    <!-- <v-row>
      <v-col cols="8" class="py-0 px-0">
        <h5 class="primary text-center white--text px-0 py-0" style="width: 100%">
          Observaciones de la propuesta técnica y económica
        </h5>
      </v-col>
      <v-col cols="4" class="px-0 py-0 mb-6">
        <v-row>
          <v-col cols="6" class="pr-0">
            <p class="label mb-0">Subtotal</p>
            <p class="label mb-0">Iva</p>
            <p class="label mb-0">Total</p>
          </v-col>
          <v-col cols="6" class="pl-0">
            <v-text-field class="field py-0 my-0" height="26"></v-text-field>
            <v-text-field class="field py-0 my-0" height="26"></v-text-field>
            <v-text-field class="field py-0 my-0" height="26"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row> -->

    <!-- <v-row class="py-0 px-0">
      <h5 class="primary text-center" style="width: 100%">
        Observaciones del servicio
      </h5>
      <v-col id="border" class="py-0 px-0">
        <p id="border">
          1. Para el ingreso de las muestras al proceso analítico es necesario
          cumplir con el anexo de aceptación del servicio, enviar propuesta
          aceptada y copia de la consignación vía correo electrónico a
          labficat@sena.edu.co.
          <br />
          2. En caso de solicitar alguna modificación o inclusión al servicio se
          debe solicitar al correo electrónico institucional
          labficat@sena.edu.co. <br />
          3. Las muestras deben ser recolectadas por el cliente. Se entregará
          copia No controlada del Instructivo de toma de muestras
          CAT–ST–MU–F–001 vigente como apoyo para el proceso de muestreo. <br />
          4. Los ensayos que no cuenten con símbolo de referencia indica: Ensayo
          sin acreditación y sin habilitación.
          <br />
          5. Los ensayos referenciados con (°) se encuentran habilitados por
          estandares de calidad ante la Secretaria de Salud Departamental (SSD).
          <br />
          6. Los ensayos referenciados con (*) se encuentran acreditados ante el
          Organismo Nacional de Acreditación (ONAC). <br />
          7. El laboratorio se abstiene de emitir declaraciones de conformidad,
          opiniones e interpretaciones. <br />
        </p>
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center" style="width: 100%">
        Acepto las condiciones del servicio descritas en la presente oferta
        incluidos sus anexos
      </h5>
      <v-col class="py-0 px-0">
        <label for="Name" class="label">Nombre</label>
        <input type="text" id="Name" name="Name" /> <br />
        <label for="Name" class="label">Cargo</label>
        <input type="text" id="Name" name="Name" /> <br />
        <label for="Name" class="label">Firma de aceptación</label>
        <input type="text" id="Name" name="Name" /> <br />
        <label for="Name" class="label">C.C.</label>
        <input type="text" id="Name" name="Name" /> <br />
      </v-col>
    </v-row>
    <v-row>
      <h5 class="primary text-center" style="width: 100%">
        3. Anexo de cotizaciones
      </h5>
      <h5 class="primary text-center" style="width: 100%">
        Aceptación del servicio
      </h5>
      <v-col class="py-0 px-0">
        <p>
          - El cliente es responsable de suministrar la información de los
          parámetros a analizar de acuerdo a sus requerimientos normativos.
          <br />
          - Si el cliente acepta la presente oferta deberá enviar la propuesta
          técnica y económica diligenciada y firmada, orden de servicio,
          contrato o carta de aceptación al correo electrónico institucional
          labficat@sena.edu.co en el cual se referencie el código y versión de
          oferta aceptada. <br />
          - Si el cliente presenta alguna inconformidad con los términos de la
          cotización deberá manifestarlo antes de iniciar los análisis, con el
          fin de realizar las modificaciones necesarias y actualizar la versión
          de la cotización, para proceder a la aceptación de la misma. <br />
          - La aceptación de la propuesta implica que el cliente esta de acuerdo
          con todas las condiciones aquí descritas, incluyendo que las muestras
          se analicen por las técnicas, métodos y limites de cuantificación
          indicados para cada uno de los ensayos. <br />
          - El cliente se compromete a no ejercer presiones indebidas sobre el
          laboratorio y su personal con la intención de acelerar el proceso de
          análisis o modificar los resultados del servicio. <br />
        </p>
      </v-col>
      <h5 class="primary text-center" style="width: 100%">
        Condiciones comerciales
      </h5>
      <v-col class="py-0 px-0">
        <p>
          - Forma de Pago: se debe realizar la totalidad del pago de la presente
          oferta antes de iniciar los análisis de las muestras recepcionadas en
          el laboratorio. <br />
          - El pago podrá efectuarse en efectivo en las oficinas del Centro
          Agroturístico o mediante consignación a la siguiente cuenta bancaria a
          nombre de SENA: BANCO No. XXXXXXXXX. <br />
          - Únicamente se dará por cancelado el servicio una vez se envíe la
          copia de consignación al correo electrónico institucional
          labficat@sena.edu.co <br />
          - La recepción y procesamiento de las muestras se realizara dentro de
          los días hábiles Lunes a Viernes de 08:00 am - 12:00 pm y 02:00 pm -
          05:00 pm. <br />
          - La fecha de entrega de resultados mencionada en la presente oferta
          está contemplada desde la fecha de recepción de las muestras al
          laboratorio, teniendo en cuenta que solo cuentan días hábiles. <br />
          - El informe de resultados se entregara de acuerdo a las condiciones
          pactadas en la cotización, una vez sean analizadas las muestras.
          <br />
        </p>
      </v-col>
      <h5 class="primary text-center" style="width: 100%">
        Condiciones tecnicas
      </h5>
      <v-col class="py-0 px-0">
        <p>
          - LABFICAT no es responsable de la recolección ni del transporte de
          las muestras ya que el servicio de muestreo es realizado por el
          cliente. <br />
          - Solo se guardaran remanentes de las muestras cuando el cliente lo
          solicite por escrito y deberá quedar constancia en la orden de
          servicio, contrato o aceptación del servicio. <br />
        </p>
      </v-col>
      <h5 class="primary text-center" style="width: 100%">
        Garantía del servicio
      </h5>
      <v-col class="py-0 px-0">
        <p>
          - Se entregará copia No controlada del Instructivo de toma de muestras
          CAT–ST–MU–F–001 vigente como apoyo para el proceso de muestreo que es
          responsabilidad del cliente, donde se especifican las condiciones y
          recomendaciones a tener en cuenta cuando se efectué el muestreo,
          LABFICAT solo se hace responsable del ítem de ensayo desde el momento
          de la recepción de la muestra y no garantiza los criterios de calidad
          considerados durante la recolección. <br />
          - Aquellos resultados cuestionados por el cliente serán tratatos de
          acuerdo al procedimiento de Quejas CAT-ST-QJ-P-001. De requerir
          re-análisis se realizará de la muestra que el cliente haya traído
          inicialmente y que se encuentra bajo la custodia del laboratorio si
          los resultados del re-análisis confirman los datos originales, el
          cliente asumirá los costos asociados al re-análisis. <br />
          - LABFICAT garantiza la protección de la confidencialidad de la
          información y de los derechos de propiedad que los clientes tienen
          sobre sus resultados, asimismo, garantiza la imparcialidad e
          integridad operativa en las actividades de la Organización. <br />
          - LABFICAT reconoce que la información del cliente es confidencial y
          solo será revelada si la ley o el mismo lo disponen. Cuando la
          información sea solicitada por la ley, se notifica mediante correo
          electrónico institucional al cliente que la información será divulgada
          siempre y cuando la ley no lo prohíba. <br />
        </p>
      </v-col>
      <h5 class="primary text-center" style="width: 100%">
        Calidad del servicio
      </h5>
      <v-col class="py-0 px-0">
        <p>
          - LABFICAT se encuentra en proceso de acreditación ante el Organismo
          Nacional de Acreditación (ONAC) bajo la norma NTC ISO/IEC 17025:2017
          en la matriz de Alimentos. <br />
          - LABFICAT se encuentra en proceso de habilitación de estandares de
          calidad ante la Secretaría de Salud Departamental (SSD). <br />
          - LABFICAT participa en Pruebas de Desempeño anualmente conforme a lo
          establecido en el inciso a) del numeral 7.7.2. Aseguramiento de la
          validez de los resultados de la norma NTC ISO/IEC 17025:2017. <br />
        </p>
      </v-col>
    </v-row> -->
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
  name: "PageCotizacion",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      formato: "",
      search: "",
      myLoading: true,
      dialogo: false,
      encabezado: [
        {
          text: "Código de referencia",
          align: "start",
          sortable: false,
          value: "",
        },
        {
          text: "Descripción del ensayo",
          value: "descripcion",
          sortable: false,
        },
        { text: "unidades", value: "unidades", sortable: false },
        { text: "Técnica analítica", value: "tecnica", sortable: false },
        { text: "Método analítico", value: "metodo", sortable: false },
        {
          text: "Límite de cuantificación",
          value: "limiteCuantificacion",
          sortable: false,
        },
        { text: "Costo del ensayo", value: "costo", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      primerItem: [],
      usuarios: [],
      person: {
        nombre: "",
        cc: "",
        direccion: "",
        ciudad: "",
        departamento: "",
        telefono: "",
        contacto: "",
        cargo: "",
        celularContacto: "",
        correoContacto: "",
        validezOferta: "",
        entregaResultados: "",
        elaborador: this.$store.state.elaborador.nombre,
        cargoElaborador: this.$store.state.elaborador.rol,
      },
      rol: ["administrador", "cliente", "director"],
      busqueda: "",
      Roles: "",
      dialog: false,
      headers: [
        {
          text: "Nombre",
          align: "start",
          sortable: false,
          value: "nombre",
        },
        { text: "Rol", value: "rol", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      ensayos1: [],
      ensayos2: [],
      ensayos3: [],
      encabezadoEnsayo: [
        {
          text: "Fecha de Analisis",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "ensayo", value: "ensayo", sortable: false },
        { text: "metodo", value: "metodo", sortable: false },
        { text: "tecnica", value: "tecnica", sortable: false },
        { text: "resultado", value: "resultado", sortable: false },
        {
          text: "insertidumbre expandida",
          value: "insertidumbre expandida",
          sortable: false,
        },
        {
          text: "insertidumbre expandida",
          value: "insertidumbre expandida",
          sortable: false,
        },
        { text: "valor maximo", value: "valorMaximo", sortable: false },
        { text: "valor minimo", value: "valorMinimo", sortable: false },
        { text: "unidades", value: "unidades", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      id: "",
      ensa: "",
      descuento: null,
      observacion: "",
      limiteCuantificacion: null,
      item1: {
        itemsEnsayo: [],
      },
      fechaEmision: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      validezOferta: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      entregaResultados: new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10),
      menu2: false,
      menu1: false,
      dialogItem2: false,
      segundoItem: [],
      item2: {
        itemsEnsayo: [],
      },
      dialogItem3: false,
      tercerItem: [],
      item3: {
        itemsEnsayo: [],
      },
      encabezadoCotizacion: [
        {
          text: "Numero de cotización",
          align: "start",
          sortable: false,
          value: "numCotizacion",
        },
        { text: "Fecha de emision", value: "fechaEmision", sortable: false },
        { text: "Cliente", value: "idCliente", sortable: false },
        {
          text: "Validez de la oferta",
          value: "validezOferta",
          sortable: false,
        },
        {
          text: "Entrega de resultados",
          value: "entregaResultados",
          sortable: false,
        },
        { text: "Elaborador", value: "idElaboradoPor", sortable: false },
        { text: "Items", value: "items", sortable: false },
        { text: "Observaciones", value: "observaciones", sortable: false },
        { text: "Sub Total", value: "subTotal", sortable: false },
        { text: "Descuento", value: "descuento", sortable: false },
        { text: "Iva", value: "iva", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      numeroCotizacion: "XXXX-XXXXVX",
      cotizaciones: [],
      idCotizacionEditar: "",
      dialogCotizacion: false,

      /* variables del registro de usuario */
      dialogUser: false,
      select: null,
      nombre: "",
      documento: "",
      direccion: "",
      departamento: "",
      ciudad: "",
      contacto: "",
      celularContacto: "",
      telefono: "",
      email: "",
      password: "",
      confirmation: "",
      roll: "",
      items: ["Natural", "Jurídica"],
      roles: [
        "cliente",
        "secretario",
        "administrador",
        "director",
        "especialista",
        "supervisor",
      ],
      departa: [],
      ciudades: [],
    };
  },
  computed: {
    buscar() {
      return this.usuarios.filter((user) => {
        const nombre = user.nombre.toLowerCase();
        const rol = user.rol.toLowerCase();
        const busqueda = this.busqueda.toLowerCase();

        return nombre.includes(busqueda) || rol.includes(busqueda);
      });
    },
  },
  methods: {
    traerClientes() {
      axios
        .get("https://labficat.herokuapp.com/api/usuario")
        .then((res) => {
          this.myLoading = false;
          for (let i = 0; i < res.data.usuario.length; i++) {
            const element = res.data.usuario[i];
            if (element.estado == 1) {
              this.usuarios.push(element);
            }
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
    traerCotizaciones() {
      axios
        .get("https://labficat.herokuapp.com/api/cotizacion")
        .then((res) => {
          this.cotizaciones = res.data.cotizacion;
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
    llenarInfo(user) {
      this.id = user._id;
      this.person.nombre = user.nombre;
      this.person.cc = user.documento;
      this.person.direccion = user.direccion;
      this.person.ciudad = user.ciudad.Ciudad;
      this.person.departamento = user.ciudad.departamento;
      this.person.telefono = user.telefono;
      this.person.contacto = user.contacto;
      this.person.celularContacto = user.celularContacto;
      this.person.cargo = user.rol;
      this.person.correoContacto = user.correo;
    },
    modificarCotizacion() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .put(
          `https://labficat.herokuapp.com/api/cotizacion/modificar/${this.idCotizacionEditar}`,
          {
            fechaEmision: this.fechaEmision,
            idCliente: this.id,
            validezOferta: this.validezOferta,
            entregaResultados: this.entregaResultados,
            idElaboradoPor: this.$store.state.elaborador.id,
            items: {
              item1: this.item1,
              item2: this.item2,
              item3: this.item3,
            },
            observaciones: this.observacion,
            descuento: this.descuento,
          },
          header
        )
        .then((res) => {
          console.log(res.data.cotizacion);
          this.$swal({
            icon: "success",
            title: "Actualización de la cotización exitoso",
          });
          this.idCotizacionEditar = "";
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
              title: "Error en la actualizacion de la cotización",
            });
          }
        });
    },
    ensayoCotizacion(ensayo) {
      let isEnsayo1 = null;
      isEnsayo1 = this.primerItem.find((e) => e._id == ensayo._id);
      if (isEnsayo1 == undefined) {
        this.primerItem.push(ensayo);
        this.item1.itemsEnsayo.push({
          ensayo: ensayo._id,
          limiteCuantificacion: ensayo.limiteCuantificacion,
          costoEnsayo: ensayo.costo,
        });
      } else {
        this.$swal({
          icon: "error",
          title: "No se puede agregar un ensayo que ya has seleccionado",
        });
      }
    },
    ensayoCotizacion2(ensayo) {
      let isEnsayo2 = null;
      isEnsayo2 = this.segundoItem.find((e) => e._id == ensayo._id);

      if (isEnsayo2 == undefined) {
        this.segundoItem.push(ensayo);
        this.item2.itemsEnsayo.push({
          ensayo: ensayo._id,
          limiteCuantificacion: ensayo.limiteCuantificacion,
          costoEnsayo: ensayo.costo,
        });
      } else {
        this.$swal({
          icon: "error",
          title: "No se puede agregar un ensayo que ya has seleccionado",
        });
      }
    },
    ensayoCotizacion3(ensayo) {
      let isEnsayo3 = null;
      isEnsayo3 = this.tercerItem.find((e) => e._id == ensayo._id);
      if (isEnsayo3 == undefined) {
        this.tercerItem.push(ensayo);
        this.item3.itemsEnsayo.push({
          ensayo: ensayo._id,
          limiteCuantificacion: ensayo.limiteCuantificacion,
          costoEnsayo: ensayo.costo,
        });
      } else {
        this.$swal({
          icon: "error",
          title: "No se puede agregar un ensayo que ya has seleccionado",
        });
      }
    },
    cotizacion() {
      let header = { headers: { "x-token": this.$store.state.token } };
      axios
        .post(
          "https://labficat.herokuapp.com/api/cotizacion",
          {
            fechaEmision: this.fechaEmision,
            idCliente: this.id,
            validezOferta: this.validezOferta,
            entregaResultados: this.entregaResultados,
            idElaboradoPor: this.$store.state.elaborador.id,
            items: {
              item1: this.item1,
              item2: this.item2,
              item3: this.item3,
            },
            observaciones: this.observacion,
            descuento: this.descuento,
          },
          header
        )
        .then((res) => {
          this.$swal({
            icon: "success",
            title: "Registro de la cotización exitoso",
          });
          console.log(res.data);
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
              title: "Error al registrar la cotización",
            });
          }
        });
    },
    infoCotizacionEditar() {
      if (this.$store.state.cotizacionVer != false) {
        this.item1.itemsEnsayo =
          this.$store.state.cotizacionEditar.items.item1.itemsEnsayo;
        this.item2.itemsEnsayo =
          this.$store.state.cotizacionEditar.items.item2.itemsEnsayo;
        this.item3.itemsEnsayo =
          this.$store.state.cotizacionEditar.items.item3.itemsEnsayo;

        this.idCotizacionEditar = this.$store.state.cotizacionEditar._id;
        this.id = this.$store.state.cotizacionEditar.idCliente._id;
        this.person.nombre =
          this.$store.state.cotizacionEditar.idCliente.nombre;
        this.person.cc = this.$store.state.cotizacionEditar.idCliente.documento;
        this.person.direccion =
          this.$store.state.cotizacionEditar.idCliente.direccion;
        this.person.ciudad =
          this.$store.state.cotizacionEditar.idCliente.ciudad.Ciudad;
        this.person.departamento =
          this.$store.state.cotizacionEditar.idCliente.ciudad.departamento;
        this.person.telefono =
          this.$store.state.cotizacionEditar.idCliente.telefono;
        this.person.contacto =
          this.$store.state.cotizacionEditar.idCliente.contacto;
        this.person.cargo = this.$store.state.cotizacionEditar.idCliente.rol;
        this.person.celularContacto =
          this.$store.state.cotizacionEditar.idCliente.celularContacto;
        this.person.correoContacto =
          this.$store.state.cotizacionEditar.idCliente.correo;
        this.descuento = this.$store.state.cotizacionEditar.descuento;
        this.observacion = this.$store.state.cotizacionEditar.observaciones;
        this.numeroCotizacion =
          this.$store.state.cotizacionEditar.numCotizacion;

        for (
          let i = 0;
          i < this.$store.state.cotizacionEditar.items.item1.itemsEnsayo.length;
          i++
        ) {
          const element =
            this.$store.state.cotizacionEditar.items.item1.itemsEnsayo[i];
          this.primerItem.push(element.ensayo);
        }

        for (
          let i = 0;
          i < this.$store.state.cotizacionEditar.items.item2.itemsEnsayo.length;
          i++
        ) {
          const element =
            this.$store.state.cotizacionEditar.items.item2.itemsEnsayo[i];
          this.segundoItem.push(element.ensayo);
        }

        for (
          let i = 0;
          i < this.$store.state.cotizacionEditar.items.item3.itemsEnsayo.length;
          i++
        ) {
          const element =
            this.$store.state.cotizacionEditar.items.item3.itemsEnsayo[i];
          this.tercerItem.push(element.ensayo);
        }
      }
    },
    eliminarCotizacion1(cotizacion) {
      this.primerItem.splice(cotizacion, 1);
      this.item1.itemsEnsayo.splice(cotizacion, 1);

      console.log(this.item1);
    },
    eliminarCotizacion2(cotizacion) {
      this.segundoItem.splice(cotizacion, 1);
      this.item2.itemsEnsayo.splice(cotizacion, 1);

      console.log(this.item2);
    },
    eliminarCotizacion3(cotizacion) {
      this.tercerItem.splice(cotizacion, 1);
      this.item3.itemsEnsayo.splice(cotizacion, 1);

      console.log(this.item3);
    },
    traerEnsayos() {
      axios
        .get("https://labficat.herokuapp.com/api/ensayo")
        .then((res) => {
          this.ensayos1 = res.data.ensayos;
          this.ensayos2 = res.data.ensayos;
          this.ensayos3 = res.data.ensayos;
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
    vaciarInformacion() {
      this.primerItem.splice(0, this.primerItem.length);
      this.segundoItem.splice(0, this.segundoItem.length);
      this.tercerItem.splice(0, this.tercerItem.length);
      this.id = "";
      this.validezOferta = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.entregaResultados = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .substr(0, 10);
      this.descuento = null;
      (this.observacion = ""),
        this.item1.itemsEnsayo.splice(0, this.item1.itemsEnsayo.length);
      this.item2.itemsEnsayo.splice(0, this.item2.itemsEnsayo.length);
      this.item3.itemsEnsayo.splice(0, this.item3.itemsEnsayo.length);

      this.person.nombre = "";
      this.person.cc = "";
      this.person.direccion = "";
      this.person.ciudad = "";
      this.person.departamento = "";
      this.person.telefono = "";
      this.person.contacto = "";
      this.person.celularContacto = "";
      this.person.cargo = "";
      this.person.correoContacto = "";
    },
    close() {
      this.dialog = false;
      this.dialogo = false;
      this.dialogItem2 = false;
      this.dialogItem3 = false;
      this.dialogCotizacion = false;
      this.dialogUser = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    /* metodos para el registro de una persona */

    traerDepartamentos() {
      axios
        .get("https://labficat.herokuapp.com/api/ciudad/departamentos")
        .then((response) => {
          console.log(response.data.departamentos);
          this.departa = response.data.departamentos;
          console.log(this.departa);
          console.log("hola");
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
    traerCiudades(ciudad) {
      console.log(ciudad);
      axios
        .post("https://labficat.herokuapp.com/api/ciudad/nombreDepartamento", {
          departamento: this.departamento,
        })
        .then((response) => {
          console.log(response.data.ciudades);
          this.ciudades = response.data.ciudades;
          console.log(this.ciudades);
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
    registrar() {
      axios
        .post("https://labficat.herokuapp.com/api/usuario", {
          tipoPersona: this.select,
          nombre: this.nombre,
          documento: this.documento,
          direccion: this.direccion,
          ciudad: this.ciudad,
          contacto: this.contacto,
          celularContacto: this.celularContacto,
          telefono: this.telefono,
          correo: this.email,
          password: this.password,
          rol: this.roll,
        })
        .then((res) => {
          console.log(res.data);
          this.$swal({
            icon: "success",
            title: "Registro exitoso",
            text: `${res.data.usuario.nombre} registrado exitosamente`,
          });
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
              title: "Error al registrar el usuario",
            });
          }
        });
    },
    traerCalidad() {
      axios
        .post("https://labficat.herokuapp.com/api/calidad/formato", {
          nombre: "Oferta de Servicios",
        })
        .then((res) => {
          console.log(res.data.calidad);
          this.formato = res.data.calidad;
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
  },
  created() {
    this.traerClientes();
    this.traerEnsayos();
    this.traerCotizaciones();
    this.infoCotizacionEditar();
    this.traerCalidad();
  },
  destroyed() {
    this.vaciarInformacion();
    console.log("hola");
  },
};
</script>
<style scoped>
#border {
  border: 1px solid black;
}

.texto {
  text-align: center;
}

.parrafo {
  font-size: 12px;
  font-style: italic;
}

.codigo {
  text-align: center;
  font-size: 14px;
}

.cuadros {
  border: solid 3px rgb(247, 113, 4);
}

.label {
  background-color: #ed7d31;
  color: white;
  border: solid 1px black;
}

.field {
  max-height: 26px;
}

#bordo {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}
</style>
