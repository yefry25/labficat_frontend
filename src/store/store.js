import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: localStorage.token,
    elaborador: JSON.parse(localStorage.getItem("elaborador")),
    emailConfirmed: localStorage.email,
    cotizacionEditar: {},
    cotizacionVer: false,
    muestraEditar: {},
    muestraVer: false,
    color: localStorage.color,
    informeResultado: {},
    facturaMuestra:{},
    facturaCotizacion:{}
  },
  mutations: {
    setToken(state, value) {
      localStorage.token = value;
      if (localStorage.token) {
        state.token = localStorage.token;
      } else {
        state.token = value;
      }
    },
    setEmail(state, value) {
      localStorage.email = value;
      if (localStorage.email) {
        state.emailConfirmed = localStorage.email;
      } else {
        state.emailConfirmed = value
      }

    },
    setElaborador(state, value) {
      localStorage.setItem("elaborador", JSON.stringify(value));
      let l = JSON.parse(localStorage.getItem("elaborador"));
      if (l) {
        state.elaborador = l;
      }
    },
    setColor(state, value) {
      localStorage.color = value;
      if (localStorage.color) {
        state.color = localStorage.color;
      } else {
        state.color = value;
      }
    },
    setCotizacionEditar(state, value) {
      state.cotizacionEditar = value;
      state.cotizacionVer = true;
    },
    setMuestraEditar(state, value) {
      state.muestraEditar = value;
      state.muestraVer = true;
    },
    setInformeResultado(state, value) {
      state.informeResultado = value;
    },
    setFacturaMuestra(state, value) {
      state.facturaMuestra = value;
    },
    setFacturaCotizacion(state, value) {
      state.facturaCotizacion = value;
    },
  },
  actions: {
    setToken(context, value) {
      context.commit("setToken", value);
    },
    setElaborador(context, value) {
      context.commit("setElaborador", value);
    },
    setColor(context, value) {
      context.commit("setColor", value)
    },
    setCotizacionEditar(context, value) {
      context.commit("setCotizacionEditar", value);
    },
    setMuestraEditar(context, value) {
      context.commit("setMuestraEditar", value);
    },
    setEmail(context, value) {
      context.commit("setEmail", value)
    },
    setInformeResultado (context, value) {
      context.commit("setInformeResultado", value)
    },
    setFacturaMuestra (context, value){
      context.commit("setFacturaMuestra", value)
    },
    setFacturaCotizacion (context, value){
      context.commit("setFacturaCotizacion", value)
    }
  },
});
