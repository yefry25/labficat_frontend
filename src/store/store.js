import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        token:'',
        elaborador:{}
    },
    mutations:{
        setToken(state,value) {
            state.token=value
        },
        setElaborador(state,value) {
            state.elaborador=value
        }

    },
    actions:{
        setToken(context,value) {
            context.commit("setToken",value)
        },
        setElaborador(context,value){
            context.commit('setElaborador',value)
        }
    }
});

