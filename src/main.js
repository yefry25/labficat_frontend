import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router';
import {routes} from "./routes/routes.js";
import {store} from "./store/store.js"

Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  //aqui se ponen las rutas
  routes,
  mode:"history"
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
