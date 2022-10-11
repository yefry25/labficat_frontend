import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        token:'',
        elaborador:{},
        cotizacionEditar:{},
        cotizacionVer:false
    },
    mutations:{
        setToken(state,value) {
            state.token=value
        },
        setElaborador(state,value) {
            state.elaborador=value
        },
        setCotizacionEditar(state,value){
            state.cotizacionEditar=value
            state.cotizacionVer=true
        }

    },
    actions:{
        setToken(context,value) {
            context.commit("setToken",value)
        },
        setElaborador(context,value){
            context.commit('setElaborador',value)
        },
        setCotizacionEditar(context,value){
            context.commit('setCotizacionEditar',value)
        }
    }
});

