import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);


let color = localStorage.getItem('color')
if (color == undefined) {
  color = '#E65100'
}
console.log("color: " + color);

export default new Vuetify({

  theme: {
    themes: {
      light: {
        primary: color,
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
