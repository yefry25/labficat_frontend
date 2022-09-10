import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import { routes } from "./routes/routes.js";
import { store } from "./store/store.js";
import VueSweetalert2 from "vue-sweetalert2";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "sweetalert2/dist/sweetalert2.min.css";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas);
library.add(far);

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueSweetalert2);
Vue.use(VueRouter);
Vue.config.productionTip = false;

const router = new VueRouter({
  //aqui se ponen las rutas
  routes,
  mode: "history",
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
