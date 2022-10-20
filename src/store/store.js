import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: localStorage.token,
    elaborador: {},
    cotizacionEditar: {},
    cotizacionVer: false,
    muestraEditar: {},
    muestraVer: false,
  },
  mutations: {
    setToken(state, value) {
      localStorage.token = value;
      if (localStorage.token) {
        state.token = localStorage.token;
      }else{
        state.token = value
      }
    },
    setElaborador(state, value) {
      state.elaborador = value;
    },
    setCotizacionEditar(state, value) {
      state.cotizacionEditar = value;
      state.cotizacionVer = true;
    },
    setMuestraEditar(state, value) {
      state.muestraEditar = value;
      state.muestraVer = true;
    },
  },
  actions: {
    setToken(context, value) {
      context.commit("setToken", value);
    },
    setElaborador(context, value) {
      context.commit("setElaborador", value);
    },
    setCotizacionEditar(context, value) {
      context.commit("setCotizacionEditar", value);
    },
    setMuestraEditar(context, value) {
      context.commit("setMuestraEditar", value);
    },
  },
});
