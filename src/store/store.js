import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: localStorage.token,
    elaborador: JSON.parse(localStorage.getItem("elaborador")),
    emailConfirmed:localStorage.email,
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
      } else {
        state.token = value;
      }
    },
    setEmail(state,value){
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
    setEmail(context, value){
      context.commit("setEmail", value)
    },
  },
});
